// plugins/socket.js
import { io } from "socket.io-client";
import { useAlertState } from "~/composables/useAlertState";

// plugins/socket.js
export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client-side
  if (process.server) return;

  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl || "http://localhost:4558";

  console.log("Connecting to socket at:", baseURL);

  // Create socket connection
  const socket = io(baseURL, {
    transports: ["websocket", "polling"],
    autoConnect: true,
  });

  // Get alert state for notifications
  const alertState = useAlertState();

  // Setup connection event handlers
  socket.on("connect", () => {
    console.log("Socket connected with ID:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  // Listen for new readings
  socket.on("new-reading", (data) => {
    console.log("New reading received:", JSON.stringify(data, null, 2));
  });

  // Listen for new alerts
  socket.on("new-alert", (alert) => {
    console.log("New alert received:", alert);

    // Filter out sensor_failure alerts from popup notifications
    // (they still get saved to database on backend)
    if (alert.type === "sensor_failure") {
      console.log("Sensor failure alert received - saved to database but not showing popup");
      return;
    }

    // Show alert notification based on severity for other alert types
    if (alert.severity === "critical") {
      alertState.showCriticalAlert(formatAlertType(alert.type), alert.message);
    } else if (alert.severity === "danger") {
      alertState.showDangerAlert(formatAlertType(alert.type), alert.message);
    } else if (alert.severity === "warning") {
      alertState.showWarningAlert(formatAlertType(alert.type), alert.message);
    } else {
      alertState.showInfoAlert(formatAlertType(alert.type), alert.message);
    }
  });

  // Helper function to format alert types
  function formatAlertType(type) {
    switch (type) {
      case "flood_warning":
        return "ເຕືອນໄພນ້ຳຖ້ວມ";
      case "rainfall_warning":
        return "ເຕືອນຝົນຕົກໜັກ";
      case "soil_saturation_warning":
        return "ເຕືອນດິນອີ່ມນ້ຳ";
      case "sensor_failure":
        return "ເຊັນເຊີເສຍຫາຍ";
      case "battery_low":
        return "ແບັດເຕີຣີຕ່ຳ";
      case "connection_loss":
        return "ການເຊື່ອມຕໍ່ຂາດ";
      default:
        return type;
    }
  }

  // Make socket available in the app
  nuxtApp.provide("socket", socket);
});
