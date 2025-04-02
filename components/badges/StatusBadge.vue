<!-- components/badges/StatusBadge.vue -->
<template>
    <span 
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      :class="badgeClass"
    >
      {{ statusText }}
    </span>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    status: {
      type: String,
      required: true,
      validator: (value) => ['pending', 'sent', 'delivered', 'failed'].includes(value)
    }
  });
  
  const badgeClass = computed(() => {
    switch (props.status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  });
  
  const statusText = computed(() => {
    switch (props.status) {
      case 'pending':
        return 'ລໍຖ້າ';
      case 'sent':
        return 'ສົ່ງແລ້ວ';
      case 'delivered':
        return 'ສົ່ງສຳເລັດ';
      case 'failed':
        return 'ລົ້ມເຫລວ';
      default:
        return props.status;
    }
  });
  </script>