<!-- components/cards/AlertCard.vue -->
<template>
    <div 
      class="mb-2 p-3 rounded-lg shadow bg-white relative flex hover:bg-gray-50 transition-colors duration-150" 
      @click="$emit('click', alert)"
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
            <span class="ml-2 font-semibold capitalize">{{ alert.type }}</span>
          </div>
          <span class="text-sm text-gray-500">{{ alert.time }}</span>
        </div>
        <p class="mt-1 text-sm md:text-base">
          {{ alert.message }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import {
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
  } from "@heroicons/vue/24/outline";
  
  // Define props
  const props = defineProps({
    alert: {
      type: Object,
      required: true,
      default: () => ({
        type: 'info',
        time: '',
        message: '',
        id: null
      })
    }
  });
  
  // Define emits
  defineEmits(['click']);
  </script>