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

  const fetchAlerts = async () => {
    // Since this endpoint doesn't exist, let's throw an informative error
    throw new Error(
      "The general alerts endpoint is not available. Please use fetchDeviceAlerts instead.",
    );
  };

  const fetchDeviceAlerts = async (deviceId) => {
    try {
      const url = `${baseURL}/api/devices/${deviceId}/alerts`;

      console.log("Fetching device alerts from:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch alerts for device ${deviceId}: ${response.status}`,
        );
      }

      const data = await response.json();
      console.log(`Alerts fetched for device ${deviceId}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching alerts for device ${deviceId}:`, error);
      throw error;
    }
  };

  // Updated to match the alert_id format in the actual data
  const fetchAlertById = async (alertId) => {
    try {
      // Check if alertId needs the ALT- prefix
      const formattedAlertId = alertId.startsWith("ALT-")
        ? alertId
        : `ALT-${alertId}`;
      const url = `${baseURL}/api/alerts/${formattedAlertId}`;

      console.log("Fetching alert details from:", url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch alert: ${response.status}`);
      }

      const data = await response.json();
      console.log("Alert fetched:", data);
      return data;
    } catch (error) {
      console.error(`Error fetching alert ${alertId}:`, error);
      throw error;
    }
  };

  return {
    fetchDevices,
    fetchDeviceReadings,
    fetchAlerts,
    fetchAlertById,
    fetchDeviceAlerts,
  };
}
