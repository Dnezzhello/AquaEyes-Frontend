// stores/alerts.js
export const useAlertsStore = defineStore("alerts", {
  state: () => ({
    showAlert: false,
    alertType: "info",
    alertTitle: "",
    alertMessage: "",
  }),
  actions: {
    showInfoAlert(title, message) {
      this.alertType = "info";
      this.alertTitle = title;
      this.alertMessage = message;
      this.showAlert = true;
    },
    showWarningAlert(title, message) {
      this.alertType = "warning";
      this.alertTitle = title;
      this.alertMessage = message;
      this.showAlert = true;
    },
    showCriticalAlert(title, message) {
      this.alertType = "critical";
      this.alertTitle = title;
      this.alertMessage = message;
      this.showAlert = true;
    },
    hideAlert() {
      this.showAlert = false;
    },
  },
});
