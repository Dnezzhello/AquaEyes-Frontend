<!-- components/ChartWrapper.vue -->
<template>
  <div class="relative">
    <!-- Loading state -->
    <div
      v-if="loading"
      class="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>

    <!-- Error state -->
    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      {{ error }}
    </div>

    <!-- No data state -->
    <div
      v-if="!loading && !error && (isEmpty || !hasData)"
      class="flex justify-center items-center h-64 text-gray-500"
    >
      ບໍ່ມີຂໍ້ມູນ
    </div>

    <!-- Actual chart -->
    <div v-show="!loading && !error && hasData">
      <slot></slot>
    </div>
  </div>
</template>
  
  <script setup>
import { computed } from "vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
  chartData: {
    type: Array,
    default: () => [],
  },
});

const hasData = computed(() => {
  return Array.isArray(props.chartData) && props.chartData.length > 0;
});
</script>