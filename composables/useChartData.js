// composables/useChartData.js
export function useChartData() {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl || "http://localhost:4558";

  // Chart data for different types
  const waterLevel = ref({
    values: [],
    labels: [],
    loading: false,
    error: null,
  });
  const rainfall = ref({ values: [], labels: [], loading: false, error: null });
  const flowRate = ref({ values: [], labels: [], loading: false, error: null });
  const soilMoisture = ref({
    values: [],
    labels: [],
    loading: false,
    error: null,
  });

  // Generic function to fetch sensor data
  const fetchSensorData = async (deviceId, sensorType, limit = 50) => {
    // Reference to the correct chart data object
    let dataRef;

    switch (sensorType) {
      case "water_level":
        dataRef = waterLevel;
        break;
      case "rainfall":
        dataRef = rainfall;
        break;
      case "flow_rate":
        dataRef = flowRate;
        break;
      case "soil_moisture":
        dataRef = soilMoisture;
        break;
      default:
        dataRef = ref({ values: [], labels: [], loading: false, error: null });
    }

    dataRef.value.loading = true;
    dataRef.value.error = null;

    try {
      // Build the API URL based on sensor type
      const url = `${baseURL}/api/devices/${deviceId}/readings?sensorType=${sensorType}&limit=${limit}`;

      console.log(`Fetching ${sensorType} data from: ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${sensorType} data (${response.status}: ${response.statusText})`
        );
      }

      const data = await response.json();
      console.log(`Raw ${sensorType} data:`, data);

      // Check if we have valid data
      if (!data || !Array.isArray(data) || data.length === 0) {
        dataRef.value.values = [];
        dataRef.value.labels = [];
        dataRef.value.loading = false;
        return;
      }

      // Format data for the chart - sort by timestamp
      const formattedData = data
        .map((reading) => ({
          value: parseFloat(reading.value),
          timestamp: new Date(reading.timestamp),
        }))
        .sort((a, b) => a.timestamp - b.timestamp);

      // Extract values and create labels
      const values = formattedData.map((d) => d.value);
      const labels = formattedData.map((d) => {
        return new Date(d.timestamp).toLocaleTimeString("lo-LA", {
          hour: "2-digit",
          minute: "2-digit",
        });
      });

      dataRef.value.values = values;
      dataRef.value.labels = labels;
      dataRef.value.loading = false;

      console.log(`Formatted ${sensorType} data:`, dataRef.value);
    } catch (error) {
      console.error(`Error fetching ${sensorType} data:`, error);
      dataRef.value.error = error.message;
      dataRef.value.loading = false;
    }
  };

  // Specific chart data fetch functions
  const fetchWaterLevelData = (deviceId, limit) =>
    fetchSensorData(deviceId, "water_level", limit);

  const fetchRainfallData = (deviceId, limit) =>
    fetchSensorData(deviceId, "rainfall", limit);

  const fetchFlowRateData = (deviceId, limit) =>
    fetchSensorData(deviceId, "flow_rate", limit);

  const fetchSoilMoistureData = (deviceId, limit) =>
    fetchSensorData(deviceId, "soil_moisture", limit);

  return {
    waterLevel,
    rainfall,
    flowRate,
    soilMoisture,
    fetchWaterLevelData,
    fetchRainfallData,
    fetchFlowRateData,
    fetchSoilMoistureData,
  };
}
