// composables/useAlertState.js
import { reactive, readonly } from "vue";

// Create a reactive state object
const state = reactive({
  showAlert: false,
  type: "info",
  title: "",
  message: "",
});

// Create actions to modify the state
const actions = {
  showInfoAlert(title, message) {
    state.type = "info";
    state.title = title;
    state.message = message;
    state.showAlert = true;
  },

  showWarningAlert(title, message) {
    state.type = "warning";
    state.title = title;
    state.message = message;
    state.showAlert = true;
  },

  showDangerAlert(title, message) {
    state.type = "danger";
    state.title = title;
    state.message = message;
    state.showAlert = true;
  },

  showCriticalAlert(title, message) {
    state.type = "critical";
    state.title = title;
    state.message = message;
    state.showAlert = true;
  },

  hideAlert() {
    state.showAlert = false;
  },
};

// Composable to use in components
export function useAlertState() {
  return {
    // Readonly state prevents components from directly modifying it
    state: readonly(state),
    // Spread actions for easy access
    ...actions,
  };
}
