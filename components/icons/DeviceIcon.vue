<!-- components/icons/DeviceIcon.vue -->
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    :class="classes"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  </svg>
</template>
  
  <script setup>
defineProps({
  classes: {
    type: String,
    default: "",
  },
});
</script>