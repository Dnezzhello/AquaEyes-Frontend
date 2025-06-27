<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Alert Modal Testing</h1>

        <div class="space-y-4">
            <div class="p-4 border rounded-lg">
                <h2 class="text-lg font-semibold mb-2">Critical Alert</h2>
                <button
                    @click="showCriticalAlert"
                    class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Show Critical Alert
                </button>
            </div>

            <div class="p-4 border rounded-lg">
                <h2 class="text-lg font-semibold mb-2">Warning Alert</h2>
                <button
                    @click="showWarningAlert"
                    class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                    Show Warning Alert
                </button>
            </div>

            <div class="p-4 border rounded-lg">
                <h2 class="text-lg font-semibold mb-2">Info Alert</h2>
                <button
                    @click="showInfoAlert"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Show Info Alert
                </button>
            </div>
        </div>

        <!-- Status display -->
        <div class="mt-8 p-4 bg-gray-100 rounded-lg" v-if="lastAction">
            <p class="font-medium">Last action: {{ lastAction }}</p>
        </div>

        <!-- Alert Modal -->
        <AlertModal
            v-if="showModal"
            :type="modalType"
            :title="modalTitle"
            :message="modalMessage"
            @dismiss="onDismiss"
            @confirm="onConfirm"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import AlertModal from "~/components/modals/AlertModal.vue";

// State for modal visibility and content
const showModal = ref(false);
const modalType = ref("info");
const modalTitle = ref("");
const modalMessage = ref("");
const lastAction = ref("");

// Show different types of alerts
const showCriticalAlert = () => {
    modalType.value = "critical";
    modalTitle.value = "Critical Error";
    modalMessage.value =
        "This action cannot be completed due to a critical error. Please contact support.";
    showModal.value = true;
};

const showWarningAlert = () => {
    modalType.value = "warning";
    modalTitle.value = "Warning";
    modalMessage.value =
        "This action may have unintended consequences. Are you sure you want to proceed?";
    showModal.value = true;
};

const showInfoAlert = () => {
    modalType.value = "info";
    modalTitle.value = "Information";
    modalMessage.value =
        "This is an informational message. Please acknowledge to continue.";
    showModal.value = true;
};

// Handle modal events
const onDismiss = () => {
    lastAction.value = `Dismissed ${modalType.value} alert`;
    showModal.value = false;
};

const onConfirm = () => {
    lastAction.value = `Confirmed ${modalType.value} alert`;
    showModal.value = false;
};
</script>
