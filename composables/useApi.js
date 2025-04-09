// composables/useApi.js
export function useApi() {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl || "http://localhost:4558";

  const fetchDevices = async () => {
    try {
      console.log("Fetching devices from:", `${baseURL}/api/devices`);
      const response = await fetch(`${baseURL}/api/devices`);

      if (!response.ok) {
        throw new Error("Failed to fetch devices");
      }

      const data = await response.json();
      console.log("Devices fetched:", data);
      return data;
    } catch (error) {
      console.error("Error fetching devices:", error);
      throw error;
    }
  };

  const fetchDeviceReadings = async (deviceId, sensorType = null) => {
    try {
      const url = sensorType
        ? `${baseURL}/api/devices/${deviceId}/readings?sensorType=${sensorType}`
        : `${baseURL}/api/devices/${deviceId}/readings`;

      console.log("Fetching readings from:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch readings");
      }

      const data = await response.json();
      console.log("Readings fetched:", data);
      return data;
    } catch (error) {
      console.error("Error fetching readings:", error);
      // Return empty array instead of throwing
      return [];
    }
  };

  return {
    fetchDevices,
    fetchDeviceReadings,
  };
}
