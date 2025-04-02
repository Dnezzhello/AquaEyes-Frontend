<!-- layouts/default.vue -->
<template>
    <div class="flex min-h-screen bg-gray-50">
        <!-- Sidebar -->
        <div
            :class="[
                'bg-white shadow-md z-30 hidden md:block',
                'fixed md:relative min-h-screen',
                'w-[180px] lg:w-[220px] xl:w-[240px] 2xl:w-[260px]',
                mediumScreenCollapsed && 'w-16 lg:w-20',
                'transform transition-all duration-200 ease-in-out',
            ]"
        >
            <!-- <button
                @click="toggleSidebar"
                class="absolute right-0 top-16 -mr-3 bg-white rounded-full p-1 shadow-md border border-gray-200 hidden md:flex items-center justify-center"
            >
                <ChevronLeftIcon
                    v-if="!mediumScreenCollapsed"
                    class="w-4 h-4 text-gray-500"
                />
                <ChevronRightIcon v-else class="w-4 h-4 text-gray-500" />
            </button> -->
            <!-- Logo -->
            <div class="p-3 lg:p-4 border-b flex items-center justify-center">
                <div v-if="!mediumScreenCollapsed" class="flex items-center">
                    <img
                        src="~/assets/images/aquaeyes-logo.png"
                        alt="AquaEyes"
                        class="h-8 w-auto lg:h-10 lg:w-auto"
                    />
                </div>
                <img
                    v-else
                    src="~/assets/images/aquaeyes-logo.png"
                    alt="AquaEyes"
                    class="h-6 w-auto lg:h-8 lg:w-auto"
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
                        <div
                            v-if="mediumScreenCollapsed"
                            class="absolute left-full ml-2 bg-gray-800 text-white text-xs rounded py-1 px-2 invisible group-hover:visible whitespace-nowrap z-50"
                        >
                            Dashboard
                        </div>
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
                            >ຂໍ້ມູນທີ່ຜ່ານມາ</span
                        >
                        <div
                            v-if="mediumScreenCollapsed"
                            class="absolute left-full ml-2 bg-gray-800 text-white text-xs rounded py-1 px-2 invisible group-hover:visible whitespace-nowrap z-50"
                        >
                            Dashboard
                        </div>
                    </NuxtLink>

                    <!-- Alerts -->
                    <NuxtLink
                        to="/alerts"
                        active-class="bg-blue-500 text-white"
                        class="flex items-center p-3 mb-2 rounded-lg transition-colors hover:bg-blue-100 text-gray-700"
                        :class="{
                            'justify-center': mediumScreenCollapsed,
                            'justify-start': !mediumScreenCollapsed,
                        }"
                    >
                        <BellAlertIcon class="w-6 h-6" />
                        <span v-if="!mediumScreenCollapsed" class="ml-3"
                            >ປະຫວັດການແຈ້ງເຕືອນ</span
                        >
                        <div
                            v-if="mediumScreenCollapsed"
                            class="absolute left-full ml-2 bg-gray-800 text-white text-xs rounded py-1 px-2 invisible group-hover:visible whitespace-nowrap z-50"
                        >
                            Dashboard
                        </div>
                    </NuxtLink>
                </nav>
            </div>
        </div>

        <!-- Mobile and Main Content container -->
        <div class="flex-1 flex flex-col">
            <!-- Mobile Navigation -->

            <TheNavigation
                class="md:hidden sticky top-0 z-40 bg-white shadow-sm"
            />

            <!-- Main Content -->

            <main
                class="flex-1 flex flex-col max-w-screen-2xl mx-auto"
            >
                <slot class="" />
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
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/vue/24/outline";

// For medium screen collapse (expanded by default on desktop)
const mediumScreenCollapsed = ref(false);

// Optionally add toggle button for sidebar collapse
const toggleSidebar = () => {
    mediumScreenCollapsed.value = !mediumScreenCollapsed.value;
};

const handleResize = () => {
    if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        mediumScreenCollapsed.value = true;
    } else if (window.innerWidth >= 1024) {
        mediumScreenCollapsed.value = false;
    }
};

onMounted(() => {
    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
    // Clean up
    window.removeEventListener("resize", handleResize);
});
</script>
