<!-- pages/alert-list.vue -->
<template>
    <div>
        <div class="min-h-screen bg-gray-50">
            <!-- Page Header -->
            <div
                class="flex justify-between items-center mb-4 bg-white p-2 md:p-3 rounded-lg shadow"
            >
                <h1 class="text-xl md:text-2xl font-bold">
                    Notifications history
                </h1>
                <div class="flex items-center">
                    <button class="p-1 text-gray-700">
                        <BellIcon class="w-6 h-6" />
                    </button>
                </div>
            </div>

            <!-- Alerts List -->
            <div class="mb-4">
                <!-- Critical Alert -->
                <div
                    v-for="(alert, index) in alerts"
                    :key="index"
                    class="mb-2 p-3 rounded-lg shadow bg-white relative flex"
                >
                    <div
                        :class="[
                            'absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg',
                            alert.type === 'critical'
                                ? 'bg-red-500'
                                : alert.type === 'warning'
                                  ? 'bg-yellow-400'
                                  : 'bg-blue-500',
                        ]"
                    ></div>
                    <div class="pl-4 flex-1">
                        <div class="flex items-start justify-between">
                            <div class="flex items-center">
                                <div
                                    :class="[
                                        'flex-shrink-0 p-1 rounded-full',
                                        alert.type === 'critical'
                                            ? 'text-red-500'
                                            : alert.type === 'warning'
                                              ? 'text-yellow-500'
                                              : 'text-blue-500',
                                    ]"
                                >
                                    <ExclamationCircleIcon
                                        v-if="alert.type === 'critical'"
                                        class="w-5 h-5"
                                    />
                                    <ExclamationTriangleIcon
                                        v-if="alert.type === 'warning'"
                                        class="w-5 h-5"
                                    />
                                    <InformationCircleIcon
                                        v-if="alert.type === 'info'"
                                        class="w-5 h-5"
                                    />
                                </div>
                                <span class="ml-2 font-semibold capitalize">{{
                                    alert.type
                                }}</span>
                            </div>
                            <span class="text-sm text-gray-500">{{
                                alert.time
                            }}</span>
                        </div>
                        <p class="mt-1 text-sm md:text-base">
                            {{ alert.message }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-center space-x-1 mt-6">
                <button class="p-1 rounded-md hover:bg-gray-200">
                    <ChevronDoubleLeftIcon class="w-5 h-5" />
                </button>
                <button class="p-1 rounded-md hover:bg-gray-200">
                    <ChevronLeftIcon class="w-5 h-5" />
                </button>
                <button
                    class="w-8 h-8 bg-blue-500 text-white rounded-md flex items-center justify-center"
                >
                    1
                </button>
                <button
                    class="w-8 h-8 hover:bg-gray-200 rounded-md flex items-center justify-center"
                >
                    2
                </button>
                <button
                    class="w-8 h-8 hover:bg-gray-200 rounded-md flex items-center justify-center"
                >
                    3
                </button>
                <span class="px-2">...</span>
                <button
                    class="w-8 h-8 hover:bg-gray-200 rounded-md flex items-center justify-center"
                >
                    10
                </button>
                <button class="p-1 rounded-md hover:bg-gray-200">
                    <ChevronRightIcon class="w-5 h-5" />
                </button>
                <button class="p-1 rounded-md hover:bg-gray-200">
                    <ChevronDoubleRightIcon class="w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Alert Modals -->
        <AlertModal
            v-if="showModal"
            :type="activeModal.type"
            :title="activeModal.title"
            :message="activeModal.message"
            @close="showModal = false"
            @dismiss="handleDismiss"
            @confirm="handleConfirm"
        />
    </div>
</template>

<script setup>
import { ref } from "vue";
import {
    BellIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/vue/24/outline";
import AlertModal from "~/components/modals/AlertModal.vue";

// Alert data
const alerts = ref([
    {
        type: "critical",
        time: "1 hour ago",
        message:
            "ສະຖານີ 1 | ລະດັບນ້ຳຂີດຕລະບຸ: 14ມ (Warn: 13ມ) | ເວລາເຂົ້າເຖິງອີກ: 1 ຊົ່ວໂມງ",
        id: 1,
    },
    {
        type: "warning",
        time: "1 hour ago",
        message: "ສະຖານີ 1 | 10ມ (Warn: 13ມ) ↑ 30ຊມ/ຊົ່ວໂມງ",
        id: 2,
    },
    {
        type: "critical",
        time: "1 hour ago",
        message:
            "ສະຖານີ 1 | ລະດັບນ້ຳຂີດຕລະບຸ: 14ມ (Warn: 13ມ) | ເວລາເຂົ້າເຖິງອີກ: 1 ຊົ່ວໂມງ",
        id: 3,
    },
    {
        type: "info",
        time: "1 hour ago",
        message: "Sensor | ສະຖານີ 1 | Battery: 100% | ຄວາມແຮງຂອງສັນຍານ: X",
        id: 4,
    },
    {
        type: "warning",
        time: "1 hour ago",
        message: "ສະຖານີ 1 | 10ມ (Warn: 13ມ) ↑ 30ຊມ/ຊົ່ວໂມງ",
        id: 5,
    },
]);

// Modal state
const showModal = ref(false);
const activeModal = ref({
    type: "critical",
    title: "Critical",
    message:
        "ສະຖານີ 1 | ລະດັບນ້ຳຂີດຕລະບຸ: 14ມ (ຄວາມຮຸນແຮງອາກາດ: 13ມ) | ເວລາເຂົ້າເຖິງອີກ: 1 ຊົ່ວໂມງ",
});

// Function to open modal
const openModal = (alert) => {
    activeModal.value = {
        type: alert.type,
        title: alert.type.charAt(0).toUpperCase() + alert.type.slice(1),
        message: alert.message,
    };
    showModal.value = true;
};

// Handler functions for modal buttons
const handleDismiss = () => {
    showModal.value = false;
    // Add logic to dismiss alert
    console.log("Alert dismissed");
};

const handleConfirm = () => {
    showModal.value = false;
    // Add logic to confirm alert
    console.log("Alert confirmed");
};

// Optional: Add function to show alert details or trigger modal
const showAlertDetails = (alert) => {
    openModal(alert);
};
</script>
