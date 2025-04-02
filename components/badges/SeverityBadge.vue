<!-- components/badges/SeverityBadge.vue -->
<template>
    <span 
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      :class="badgeClass"
    >
      {{ severityText }}
    </span>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    severity: {
      type: String,
      required: true,
      validator: (value) => ['info', 'warning', 'danger', 'critical'].includes(value)
    }
  });
  
  const badgeClass = computed(() => {
    switch (props.severity) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  });
  
  const severityText = computed(() => {
    switch (props.severity) {
      case 'info':
        return 'ຂໍ້ມູນ';
      case 'warning':
        return 'ເຕືອນ';
      case 'danger':
        return 'ອັນຕະລາຍ';
      case 'critical':
        return 'ວິກິດ';
      default:
        return props.severity;
    }
  });
  </script>