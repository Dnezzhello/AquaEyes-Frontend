<!-- pages/alerts/[alertId]/index.vue -->
<template>
    <div class="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
      <!-- Back button and page header -->
      <div class="flex justify-between items-center mb-3 md:mb-4 bg-white p-2 md:p-3 rounded-lg shadow">
        <div class="flex items-center space-x-3">
          <button 
            @click="router.back()" 
            class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-150"
          >
            <ArrowLeftIcon class="w-5 h-5 text-gray-600" />
          </button>
          <h1 class="text-xl md:text-2xl font-bold">ລາຍລະອຽດການແຈ້ງເຕືອນ</h1>
        </div>
        <div class="flex items-center space-x-2">
          <StatusBadge :status="alert.status" />
        </div>
      </div>
  
      <!-- Main content wrapper -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Alert information section -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Alert card -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div 
              class="p-4 border-l-4"
              :class="{
                'border-blue-500 bg-blue-50': alert.severity === 'info',
                'border-yellow-500 bg-yellow-50': alert.severity === 'warning',
                'border-orange-500 bg-orange-50': alert.severity === 'danger',
                'border-red-500 bg-red-50': alert.severity === 'critical'
              }"
            >
              <div class="flex items-start space-x-3">
                <div 
                  class="p-2 rounded-full"
                  :class="{
                    'text-blue-600 bg-blue-100': alert.severity === 'info',
                    'text-yellow-600 bg-yellow-100': alert.severity === 'warning',
                    'text-orange-600 bg-orange-100': alert.severity === 'danger',
                    'text-red-600 bg-red-100': alert.severity === 'critical'
                  }"
                >
                  <InformationCircleIcon v-if="alert.severity === 'info'" class="w-6 h-6" />
                  <ExclamationTriangleIcon v-if="alert.severity === 'warning'" class="w-6 h-6" />
                  <ExclamationTriangleIcon v-if="alert.severity === 'danger'" class="w-6 h-6" />
                  <ExclamationCircleIcon v-if="alert.severity === 'critical'" class="w-6 h-6" />
                </div>
                
                <div class="flex-1">
                  <h2 class="text-lg font-bold mb-1">{{ formatAlertType(alert.type) }}</h2>
                  <p class="text-base">{{ alert.message }}</p>
                </div>
              </div>
            </div>
  
            <!-- Alert details -->
            <div class="p-4">
              <h3 class="font-medium text-gray-700 text-base mb-4">ຂໍ້ມູນລາຍລະອຽດ</h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">ID ການແຈ້ງເຕືອນ</p>
                  <p class="font-medium">{{ alert.alert_id }}</p>
                </div>
                
                <div>
                  <p class="text-sm text-gray-500">ຄວາມຮຸນແຮງ</p>
                  <SeverityBadge :severity="alert.severity" class="mt-1" />
                </div>
  
                <div>
                  <p class="text-sm text-gray-500">ສ້າງເມື່ອ</p>
                  <p class="font-medium">{{ formatDate(alert.created_at) }}</p>
                </div>
  
                <div>
                  <p class="text-sm text-gray-500">ສະຖານະ</p>
                  <StatusBadge :status="alert.status" class="mt-1" />
                </div>
  
                <div v-if="alert.location && alert.location.name">
                  <p class="text-sm text-gray-500">ສະຖານທີ່</p>
                  <p class="font-medium">{{ alert.location.name }}</p>
                </div>
  
                <div v-if="alert.recipients && alert.recipients.length">
                  <p class="text-sm text-gray-500">ຈຳນວນຜູ້ຮັບ</p>
                  <p class="font-medium">{{ alert.recipients.length }} ຄົນ</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Trigger information -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="border-b border-gray-200 p-4">
              <h3 class="font-medium text-gray-800">ຂໍ້ມູນທີ່ກະຕຸ້ນການແຈ້ງເຕືອນ</h3>
            </div>
            <div class="p-4">
              <div v-if="alert.triggered_by && alert.triggered_by.condition" class="space-y-4">
                <!-- Sensor trigger data -->
                <div v-if="alert.type === 'flood_warning' || alert.type === 'sensor_failure'">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-500">ເງື່ອນໄຂ</p>
                      <p class="font-medium">{{ alert.triggered_by.condition }}</p>
                    </div>
                    
                    <div v-if="alert.triggered_by.threshold !== undefined">
                      <p class="text-sm text-gray-500">ຄ່າ Threshold</p>
                      <p class="font-medium">{{ alert.triggered_by.threshold }}</p>
                    </div>
                  </div>
  
                  <!-- Readings visualization if available -->
                  <div v-if="alert.triggered_by.readings" class="mt-4">
                    <p class="text-sm text-gray-500 mb-2">ຄ່າທີ່ອ່ານໄດ້</p>
                    <div class="h-48 bg-gray-50 border border-gray-200 rounded-lg p-2">
                      <!-- Placeholder for chart or visualization -->
                      <div class="flex items-center justify-center h-full text-center text-gray-400">
                        <p>ກຣາຟສະແດງຄ່າທີ່ອ່ານໄດ້ຈະປາກົດຢູ່ບ່ອນນີ້</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                <!-- Prediction trigger data -->
                <div v-if="alert.type === 'flood_warning' && alert.triggered_by.prediction_id">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-500">ID ການທຳນາຍ</p>
                      <p class="font-medium">{{ alert.triggered_by.prediction_id }}</p>
                    </div>
                    
                    <div v-if="alert.triggered_by.confidence !== undefined">
                      <p class="text-sm text-gray-500">ຄວາມໜ້າເຊື່ອຖື</p>
                      <p class="font-medium">{{ (alert.triggered_by.confidence * 100).toFixed(1) }}%</p>
                    </div>
                  </div>
                </div>
  
                <!-- Battery or connection data -->
                <div v-if="alert.type === 'battery_low' || alert.type === 'connection_loss'">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div v-if="alert.type === 'battery_low' && alert.triggered_by.level !== undefined">
                      <p class="text-sm text-gray-500">ລະດັບແບັດເຕີຣີ</p>
                      <div class="mt-1 flex items-center">
                        <div class="relative w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            class="absolute top-0 left-0 h-full bg-red-500 rounded-full" 
                            :style="`width: ${alert.triggered_by.level}%`"
                          ></div>
                        </div>
                        <span class="ml-2 text-sm font-medium">{{ alert.triggered_by.level }}%</span>
                      </div>
                    </div>
                    
                    <div v-if="alert.type === 'connection_loss' && alert.triggered_by.last_seen">
                      <p class="text-sm text-gray-500">ເຫັນລ່າສຸດ</p>
                      <p class="font-medium">{{ formatDate(alert.triggered_by.last_seen) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- No trigger data available -->
              <p v-else class="text-gray-500">ບໍ່ມີຂໍ້ມູນກ່ຽວກັບສິ່ງທີ່ກະຕຸ້ນການແຈ້ງເຕືອນນີ້</p>
            </div>
          </div>
        </div>
  
        <!-- Sidebar with action items and related info -->
        <div class="space-y-6">
          <!-- Action buttons -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="border-b border-gray-200 p-4">
              <h3 class="font-medium text-gray-800">ການດຳເນີນການ</h3>
            </div>
            <div class="p-4 space-y-3">
              <button 
                v-if="alert.status === 'pending'"
                class="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ສົ່ງການແຈ້ງເຕືອນ
              </button>
              
              <button 
                class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ສົ່ງຕໍ່ການແຈ້ງເຕືອນ
              </button>
  
              <button 
                class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                ຕັ້ງຄ່າເປັນອ່ານແລ້ວ
              </button>
  
              <button 
                class="w-full flex justify-center items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon class="h-4 w-4 mr-2" />
                ລຶບການແຈ້ງເຕືອນນີ້
              </button>
            </div>
          </div>
          
          <!-- Affected devices -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="border-b border-gray-200 p-4">
              <h3 class="font-medium text-gray-800">ອຸປະກອນທີ່ໄດ້ຮັບຜົນກະທົບ</h3>
            </div>
            <div class="p-4">
              <div v-if="alert.devices && alert.devices.length > 0" class="space-y-3">
                <div 
                  v-for="(device, index) in alert.devices" 
                  :key="index"
                  class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                >
                  <div class="flex items-center space-x-3">
                    <DeviceIcon class="h-5 w-5 text-gray-500" />
                    <span>{{ device }}</span>
                  </div>
                  <button class="text-blue-600 hover:text-blue-800 text-sm">
                    ເບິ່ງ
                  </button>
                </div>
              </div>
              <p v-else class="text-gray-500">ບໍ່ມີອຸປະກອນທີ່ໄດ້ຮັບຜົນກະທົບກັບການແຈ້ງເຕືອນນີ້</p>
            </div>
          </div>
          
          <!-- Location map -->
          <div v-if="alert.location && alert.location.coordinates" class="bg-white rounded-lg shadow overflow-hidden">
            <div class="border-b border-gray-200 p-4">
              <h3 class="font-medium text-gray-800">ແຜນທີ່</h3>
            </div>
            <div class="p-4 h-64 bg-gray-100 flex items-center justify-center text-gray-400">
              <!-- Placeholder for map -->
              <p>ແຜນທີ່ສະຖານທີ່ຈະປາກົດຢູ່ບ່ອນນີ້</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import {
    ArrowLeftIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    TrashIcon
  } from '@heroicons/vue/24/outline';
  import SeverityBadge from '~/components/badges/SeverityBadge.vue';
  import StatusBadge from '~/components/badges/StatusBadge.vue';
  import DeviceIcon from '~/components/icons/DeviceIcon.vue';
  
  const route = useRoute();
  const router = useRouter();
  const alert = ref({
    alert_id: '',
    type: '',
    severity: '',
    message: '',
    devices: [],
    location: {},
    triggered_by: {},
    recipients: [],
    status: '',
    created_at: '',
    updated_at: ''
  });
  
  // Format functions
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('lo-LA', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatAlertType = (type) => {
    switch (type) {
      case 'flood_warning':
        return 'ເຕືອນໄພນ້ຳຖ້ວມ';
      case 'sensor_failure':
        return 'ເຊັນເຊີເສຍຫາຍ';
      case 'battery_low':
        return 'ແບັດເຕີຣີຕ່ຳ';
      case 'connection_loss':
        return 'ການເຊື່ອມຕໍ່ຂາດ';
      case 'other':
        return 'ອື່ນໆ';
      default:
        return type;
    }
  };
  
  // Fetch alert data based on route params
  onMounted(async () => {
    const alertId = route.params.alertId;
  
    try {
      // In a real app, you would fetch from API
      // const { data } = await useFetch(`/api/alerts/${alertId}`);
      // alert.value = data.value;
      
      // For demo, we're using mock data
      alert.value = {
        alert_id: 'ALT-' + alertId,
        type: 'flood_warning',
        severity: 'critical',
        message: 'ສະຖານີ 1 | ລະດັບນ້ຳຂີດຕລະບຸ: 14ມ (Warn: 13ມ) | ເວລາເຂົ້າເຖິງອີກ: 1 ຊົ່ວໂມງ',
        devices: ['DEV-001', 'DEV-002'],
        location: {
          name: 'ບ້ານ ນາຫລວງ, ເມືອງປາກຊັນ',
          coordinates: [102.6123, 18.3893]
        },
        triggered_by: {
          condition: 'ລະດັບນ້ຳເກີນຄ່າທີ່ກໍານົດໄວ້',
          readings: [12.5, 13.2, 13.8, 14.2],
          threshold: 13
        },
        recipients: ['village-head@example.com', 'district-admin@example.com'],
        status: 'sent',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching alert:', error);
    }
  });
  </script>