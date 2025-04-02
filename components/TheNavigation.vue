<!-- components/TheNavigation.vue -->
<template>
  <nav class="bg-white shadow-md">
    <div class="px-4 sm:px-6">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img
              class="h-8 w-auto"
              src="~/assets/images/aquaeyes-logo.png"
              alt="AquaEyes Logo"
            />
          </div>
        </div>
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg
              v-if="!isOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open -->
            <svg
              v-else
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div v-if="isOpen" class="transition-all duration-300 transform origin-top">
      <div class="pt-2 pb-3 space-y-1">
        <!-- Mobile navigation links -->
        <NuxtLink
          to="/"
          class="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-500"
          active-class="bg-blue-500 text-white"
        >
          <ChartBarIcon class="w-5 h-5 mr-3" />
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/history"
          class="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-500"
          active-class="bg-blue-500 text-white"
        >
          <ClockIcon class="w-5 h-5 mr-3" />
          History
        </NuxtLink>
        <NuxtLink
          to="/alert-list"
          class="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-500"
          active-class="bg-blue-500 text-white"
        >
          <BellAlertIcon class="w-5 h-5 mr-3" />
          Alerts
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  ChartBarIcon,
  ClockIcon,
  BellAlertIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const isOpen = ref(false);

// Close mobile menu when route changes
watch(
  () => route.path,
  (newPath) => {
    isOpen.value = false;
  },
  { immediate: true }
);
</script>
