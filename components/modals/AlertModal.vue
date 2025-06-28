<!-- components/AlertModal.vue -->
<template>
    <div
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
        <div
            class="bg-white rounded-lg shadow-lg max-w-md w-full mx-auto overflow-hidden"
        >
            <div class="p-6">
                <!-- Modal Icon and Title -->
                <div class="flex justify-center mb-4">
                    <div v-if="type === 'critical'" class="text-red-500">
                        <div
                            class="w-20 h-20 rounded-full border-4 border-red-500 flex items-center justify-center mx-auto"
                        >
                            <ExclamationCircleIcon class="w-12 h-12" />
                        </div>
                        <h3 class="mt-2 text-xl font-bold text-center">
                            {{ title }}
                        </h3>
                    </div>

                    <div v-if="type === 'warning'" class="text-yellow-500">
                        <div
                            class="w-20 h-20 rounded-full border-4 border-yellow-400 flex items-center justify-center mx-auto"
                        >
                            <ExclamationTriangleIcon class="w-12 h-12" />
                        </div>
                        <h3 class="mt-2 text-xl font-bold text-center">
                            {{ title }}
                        </h3>
                    </div>

                    <div v-if="type === 'danger'" class="text-orange-500">
                        <div
                            class="w-20 h-20 rounded-full border-4 border-orange-500 flex items-center justify-center mx-auto"
                        >
                            <ExclamationTriangleIcon class="w-12 h-12" />
                        </div>
                        <h3 class="mt-2 text-xl font-bold text-center">
                            {{ title }}
                        </h3>
                    </div>

                    <div v-if="type === 'info'" class="text-blue-500">
                        <div
                            class="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center mx-auto"
                        >
                            <InformationCircleIcon class="w-12 h-12" />
                        </div>
                        <h3 class="mt-2 text-xl font-bold text-center">
                            {{ title }}
                        </h3>
                    </div>
                </div>

                <!-- Modal Content -->
                <div class="text-center mb-6">
                    <p>{{ message }}</p>
                </div>

                <!-- Modal Actions -->
                <div class="flex justify-center">
                    <button
                        @click="$emit('dismiss')"
                        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from "@heroicons/vue/24/outline";

defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => ["critical", "danger", "warning", "info"].includes(value),
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

defineEmits(["close", "dismiss", "confirm"]);
</script>
