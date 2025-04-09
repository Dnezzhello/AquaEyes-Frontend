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

    // Show alert notification based on severity
    if (alert.severity === "critical") {
      alertState.showCriticalAlert(formatAlertType(alert.type), alert.message);
    } else if (alert.severity === "warning" || alert.severity === "danger") {
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
