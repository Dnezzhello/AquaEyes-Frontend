<!-- layouts/default.vue -->
<template>
    <div class="flex min-h-screen bg-gray-50">
        <!-- Sidebar -->
        <div
            :class="[
                'bg-white shadow-md z-30 hidden md:block',
                'fixed md:relative h-screen',
                'w-[180px]',
                mediumScreenCollapsed && 'w-16',
                'transform transition-transform duration-300 ease-in-out',
            ]"
        >
            <!-- Logo -->
            <div class="p-4 border-b flex items-center justify-center">
                <div v-if="!mediumScreenCollapsed" class="flex items-center">
                    <img
                        src="~/assets/images/aquaeyes-logo.png"
                        alt="AquaEyes"
                        class="h-10 w-15"
                    />
                </div>
                <img
                    v-else
                    src="~/assets/images/aquaeyes-logo.png"
                    alt="AquaEyes"
                    class="h-8 w-8"
                />
            </div>

            <!-- Navigation -->
            <div class="flex-1 overflow-y-auto">
                <nav class="p-2">
                    <!-- Dashboard -->
                    <NuxtLink
                        to="/"
                        active-class="bg-blue-500 text-white"
                        class="flex items-center p-3 mb-2 rounded-lg transition-colors hover:bg-blue-100 text-gray-700"
                        :class="{
                            'justify-center': mediumScreenCollapsed,
                            'justify-start': !mediumScreenCollapsed,
                        }"
                    >
                        <ChartBarIcon class="w-6 h-6" />
                        <span v-if="!mediumScreenCollapsed" class="ml-3"
                            >Dashboard</span
                        >
                    </NuxtLink>

                    <!-- History -->
                    <NuxtLink
                        to="/history"
                        active-class="bg-blue-500 text-white"
                        class="flex items-center p-3 mb-2 rounded-lg transition-colors hover:bg-blue-100 text-gray-700"
                        :class="{
                            'justify-center': mediumScreenCollapsed,
                            'justify-start': !mediumScreenCollapsed,
                        }"
                    >
                        <ClockIcon class="w-6 h-6" />
                        <span v-if="!mediumScreenCollapsed" class="ml-3"
                            >History</span
                        >
                    </NuxtLink>

                    <!-- Alerts -->
                    <NuxtLink
                        to="/alert-list"
                        active-class="bg-blue-500 text-white"
                        class="flex items-center p-3 mb-2 rounded-lg transition-colors hover:bg-blue-100 text-gray-700"
                        :class="{
                            'justify-center': mediumScreenCollapsed,
                            'justify-start': !mediumScreenCollapsed,
                        }"
                    >
                        <BellAlertIcon class="w-6 h-6" />
                        <span v-if="!mediumScreenCollapsed" class="ml-3"
                            >Alerts</span
                        >
                    </NuxtLink>
                </nav>
            </div>
        </div>

        <!-- Mobile and Main Content container -->
        <div class="flex-1 flex flex-col">
            <!-- Mobile Navigation -->
            <TheNavigation class="md:hidden" />

            <!-- Main Content -->
            <main class="flex-1 p-4 md:p-6 md:ml-0">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import TheNavigation from "~/components/TheNavigation.vue";
import {
    ChartBarIcon,
    ClockIcon,
    BellAlertIcon,
} from "@heroicons/vue/24/outline";

// For medium screen collapse (expanded by default on desktop)
const mediumScreenCollapsed = ref(false);

// Optionally add toggle button for sidebar collapse
const toggleSidebar = () => {
    mediumScreenCollapsed.value = !mediumScreenCollapsed.value;
};

onMounted(() => {
    // Optional: Add any initialization logic here
});

onBeforeUnmount(() => {
    // Optional: Add any cleanup logic here
});
</script>
