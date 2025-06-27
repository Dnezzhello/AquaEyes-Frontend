<template>
    <div
        class="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
    >
        <div class="flex items-start">
            <!-- Alert icon based on severity -->
            <div :class="['flex-shrink-0 p-2 rounded-full', severityClass]">
                <ExclamationCircleIcon
                    v-if="
                        alert.severity === 'critical' ||
                        alert.severity === 'danger'
                    "
                    class="w-5 h-5"
                />
                <ExclamationTriangleIcon
                    v-else-if="alert.severity === 'warning'"
                    class="w-5 h-5"
                />
                <InformationCircleIcon v-else class="w-5 h-5" />
            </div>

            <!-- Alert content -->
            <div class="ml-3 flex-1">
                <div class="flex justify-between items-start">
                    <h3 class="text-sm font-medium">
                        {{ formatAlertType(alert.type) }}
                    </h3>
                    <span class="text-xs text-gray-500">{{
                        formatTimeAgo(alert.created_at)
                    }}</span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ alert.message }}</p>

                <!-- Device info if available -->
                <div
                    v-if="alert.devices && alert.devices.length"
                    class="mt-2 flex items-center text-xs text-gray-500"
                >
                    <DeviceIcon class="h-3 w-3 mr-1" />
                    <span>{{ alert.devices.join(", ") }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import {
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import DeviceIcon from "~/components/icons/DeviceIcon.vue";

const props = defineProps({
    alert: {
        type: Object,
        required: true,
    },
});

// Compute the appropriate CSS class based on severity
const severityClass = computed(() => {
    switch (props.alert.severity) {
        case "critical":
            return "bg-red-100 text-red-600";
        case "danger":
            return "bg-orange-100 text-orange-600";
        case "warning":
            return "bg-yellow-100 text-yellow-600";
        default:
            return "bg-blue-100 text-blue-600";
    }
});

// Format time ago from date
const formatTimeAgo = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;

    // Convert to seconds
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec}s ago`;

    // Convert to minutes
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;

    // Convert to hours
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;

    // Convert to days
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return `${diffDay}d ago`;

    // For older alerts just show the date
    return date.toLocaleDateString();
};

// Format alert type
const formatAlertType = (type) => {
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
};
</script>
