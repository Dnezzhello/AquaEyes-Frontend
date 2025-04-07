// services/api.js
const config = useRuntimeConfig();
const baseURL = config.public.apiBaseUrl;

export const fetchDevices = async () => {
  try {
    const response = await fetch(`${baseURL}/api/devices`);
    if (!response.ok) throw new Error("Failed to fetch devices");
    return await response.json();
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw error;
  }
};

export const fetchDeviceReadings = async (deviceId, sensorType = null) => {
  try {
    let url = `${baseURL}/api/devices/${deviceId}/readings`;
    if (sensorType) {
      url += `?sensorType=${sensorType}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch readings");
    return await response.json();
  } catch (error) {
    console.error("Error fetching readings:", error);
    throw error;
  }
};

export const fetchAlerts = async (deviceId = null) => {
  try {
    let url = deviceId
      ? `${baseURL}/api/devices/${deviceId}/alerts`
      : `${baseURL}/api/alerts`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch alerts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
};
