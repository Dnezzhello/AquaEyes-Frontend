// dashboard page
<template>
  <div class="p-2 md:p-4">
    <!-- header - responsive modifications -->
    <div
      class="flex justify-between items-center mb-3 md:mb-4 bg-white p-2 md:p-3 rounded-lg shadow"
    >
      <h1 class="text-xl md:text-2xl font-bold">Dashboard</h1>

      <div class="flex p-2 items-center">
        <img
          src="~/assets/images/lao-flag.png"
          alt=""
          class="w-auto h-6 md:w-auto md:h-7 mr-1"
        />
        <div class="">
          <select
            id="devices"
            class="bg-white text-gray-900 text-xs md:text-sm rounded-xl block w-full px-2 md:px-3 py-1 md:py-2 text-center focus:outline-none"
          >
            <option selected>ພາສາລາວ</option>
            <option value="US">ອັງກິດ</option>
            <option value="CA">ຈີນ</option>
          </select>
        </div>
      </div>
    </div>
    <div class="mb-2 flex justify-start mt-2">
      <div class="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          class="py-1 px-3 text-sm font-medium text-white bg-aqua-primary rounded-l-lg"
        >
          ແບບງ່າຍ
        </button>
        <button
          type="button"
          class="py-1 px-3 text-sm font-medium text-gray-700 bg-white rounded-r-lg"
        >
          ລາຍລະອຽດ
        </button>
      </div>
    </div>

    <!-- first section - responsive grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mb-4"
    >
      <!-- stations -->
      <div class="bg-white rounded-lg shadow p-3 flex flex-col">
        <p class="font-bold text-xl md:text-2xl mb-1 md:mb-2">ສະຖານີ</p>
        <div class="w-full mt-1 md:mt-3">
          <div class="relative">
            <select
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg md:text-xl border border-slate-200 rounded-lg pl-2 md:pl-3 pr-8 py-2 md:py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
              <option value="">ສະຖານີ 1 - ບ້ານນາທັນ</option>
              <option value="">ສະຖານີ 2 - ບ້ານທ່ານ້ຳ</option>
              <option value="">ສະຖານີ 3 - ບ້ານດົງໂພນ</option>
              <option value="">ສະຖານີ 4 - ບ້ານສະໜາມ</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="currentColor"
              class="h-5 w-5 md:h-6 md:w-6 ml-1 absolute top-3 md:top-3.5 right-2 md:right-2.5 text-slate-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </div>
        </div>
        <span
          class="text-xs text-blue-800 px-2 py-1 rounded-full text-center mt-1"
        >
          ອັບເດດ: 12:45 ນ. 12/05/2024
          <span
            v-if="isOfflineMode"
            class="ml-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full"
          >
            ອອບລາຍ
          </span>
        </span>
      </div>

      <!-- current status -->
      <div class="bg-white rounded-lg shadow p-3">
        <p class="font-bold text-xl md:text-2xl">ສະຖານະຄວາມສ່ຽງປັດຈຸບັນ:</p>
        <div class="h-full flex flex-col items-center justify-center pb-2">
          <p
            :class="`font-bold text-3xl md:text-4xl ${
              riskLevel === 'normal'
                ? 'text-aqua-success'
                : riskLevel === 'warning'
                ? 'text-amber-500'
                : 'text-aqua-critical'
            }`"
          >
            ປົກກະຕິ
          </p>
          <p class="text-sm text-gray-600 mt-1">
            (ບໍ່ຈໍາເປັນຕ້ອງດໍາເນີນການໃດໆ)
          </p>
          <div class="flex justify-center mt-2 w-full">
            <div class="w-full max-w-xs bg-gray-200 rounded-full h-2.5">
              <div
                :class="`h-2.5 rounded-full ${
                  riskLevel === 'normal'
                    ? 'bg-aqua-success'
                    : riskLevel === 'warning'
                    ? 'bg-amber-500'
                    : 'bg-aqua-critical'
                }`"
                :style="`width: ${
                  riskLevel === 'normal'
                    ? '15%'
                    : riskLevel === 'warning'
                    ? '50%'
                    : '85%'
                }`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- signal strength & battery -->
      <div class="flex flex-row sm:flex-col gap-x-2 gap-y-2">
        <div
          class="bg-white w-1/2 sm:w-full h-16 sm:h-1/2 rounded-lg flex items-center justify-center shadow p-1 md:p-2"
        >
          <div class="text-sm md:text-lg text-center">
            ສະຖານະການເຊື່ອມຕໍ່:
            <span class="text-aqua-green font-medium">ເຊື່ອມຕໍ່ແລ້ວ</span>
          </div>
        </div>
        <div
          class="bg-white w-1/2 sm:w-full h-16 sm:h-1/2 rounded-lg flex items-center justify-center shadow p-1 md:p-2"
        >
          <div class="text-sm md:text-lg text-center">
            ສະຖານະແບັດເຕີລີ:
            <span class="font-bold">75%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- soil moisture & water flow rate metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-4">
      <!-- soil moisture -->
      <div
        class="bg-white rounded-lg shadow p-3 md:p-4 flex flex-col items-center"
      >
        <div class="font-bold text-lg md:text-2xl text-center">
          ຄວາມຊຸ່ມຂອງດິນ:
        </div>
        <div class="flex items-center">
          <span class="text-2xl md:text-4xl font-bold mt-2">75%</span>
          <span class="text-sm ml-2 text-gray-600">(ສູງກວ່າປົກກະຕິ)</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-1 text-aqua-critical"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>

      <div
        class="bg-white rounded-lg shadow p-3 md:p-4 flex flex-col items-center"
      >
        <div class="font-bold text-lg md:text-2xl text-center">
          ຄວາມໄວການໄຫຼຂອງນ້ຳ:
        </div>
        <div class="flex items-center">
          <span class="text-2xl md:text-4xl font-bold mt-1"
            >120 m<sup>3</sup>/s</span
          >
          <span class="text-sm ml-2 text-gray-600">(ສູງກວ່າປົກກະຕິ)</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-1 text-aqua-warning"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Water level chart -->
    <div class="bg-white rounded-lg shadow-sm p-3 md:p-4 mb-4">
      <h2 class="text-base md:text-xl font-semibold mb-1.5">
        ລະດັບນ້ຳ - ປັດຈຸບັນ ແລະ ການຄາດຄະເນ
      </h2>
      <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
        ອັບເດດ: 12:45 ນ. 12/05/2024
      </span>
      <ClientOnly>
        <div v-if="waterLevelData.currentLevels" class="h-52 md:h-96">
          <WaterLevelChart
            :key="`water-level-${componentKey}`"
            :current-levels="waterLevelData.currentLevels"
            :predicted-levels="waterLevelData.predictedLevels"
            :bank-height="waterLevelData.bankHeight"
            :labels="daysOfWeek"
          />
        </div>
        <template #fallback>
          <div
            class="h-40 md:h-64 bg-gray-50 rounded flex items-center justify-center"
          >
            <p class="text-gray-500">Loading Chart Data...</p>
          </div>
        </template>
      </ClientOnly>
      <p class="text-sm text-gray-500 mt-2">* ການຄາດຄະເນໃນ 24 ຊົ່ວໂມງຕໍ່ໜ້າ</p>
      <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
      <p class="text-aqua-info text-xs md:text-base font-semibold">
        <span class="underline">ສະຫຼຸບ</span>:
        ລະດັບນໍ້າຍັງຕໍ່າກວ່າລະດັບເຝົ້າລະວັງ 3 ແມັດ.
        ການຄາດຄະເນສະແດງໃຫ້ເຫັນວ່າລະດັບນໍ້າຍັງຄົງທີ່ ແລະ ຍັງປອດໄພ.
      </p>
    </div>

    <!-- Additional metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-4">
      <!-- Rainfall rate -->
      <div class="bg-white rounded-lg shadow p-3 md:p-4">
        <h2 class="text-base md:text-xl font-semibold mb-2 md:mb-4">
          ຄວາມຮຸນແຮງຂອງຝົນຕົກ
        </h2>
        <ClientOnly>
          <BarChart
            :key="`rainfall-intensity-${componentKey}`"
            v-if="rainfallData.intensity"
            :chart-data="rainfallData.intensity"
            :categories="rainfallData.timeLabels"
            :series-name="'ຄວາມຮຸນແຮງຂອງຝົນຕົກ'"
            :y-axis-title="'mm/hr'"
            :y-axis-unit="'mm/hr'"
            :column-width="'40%'"
            :color="'#0095FF'"
            :height="250"
          />
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <p class="text-aqua-info text-xs md:text-base font-semibold">
            <span class="underline">ສະຫຼຸບ</span>::
            ຄວາມຮຸນແຮງຂອງຝົນກໍາລັງຫຼຸດລົງ, ຊຶ່ງເປັນສັນຍານທີ່ດີ.
          </p>
          <template #fallback>
            <div
              class="h-40 md:h-48 bg-gray-50 rounded flex items-center justify-center"
            >
              <p class="text-gray-500">Loading rainfall data...</p>
            </div>
          </template>
        </ClientOnly>
      </div>

      <!-- Accumulated rainfall -->
      <div class="bg-white rounded-lg shadow p-3 md:p-4">
        <h2 class="text-base md:text-xl font-semibold mb-2 md:mb-4">
          ການສະສົມຂອງນ້ຳຝົນ
        </h2>
        <ClientOnly>
          <BarChart
            v-if="rainfallData.accumulated"
            :key="`rainfall-accumulated-${componentKey}`"
            :chart-data="rainfallData.accumulated"
            :categories="daysOfWeek"
            :series-name="'ການສະສົມຂອງນ້ຳຝົນຕໍ່ມື້'"
            :y-axis-title="'mm'"
            :y-axis-unit="'mm'"
            :column-width="'50%'"
            :height="250"
          />
          <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <p class="text-aqua-info text-xs md:text-base font-semibold">
            <span class="underline">ສະຫຼຸບ</span>::
            ການສະສົມຂອງນ້ຳຝົນໃນອາທິດນີ້ຢູ່ໃນລະດັບປົກກະຕິ.
          </p>
          <template #fallback>
            <div
              class="h-40 md:h-48 bg-gray-50 rounded flex items-center justify-center"
            >
              <p class="text-gray-500">Loading accumulated rainfall data...</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import WaterLevelChart from "~/components/charts/LineChart.client.vue";
import BarChart from "~/components/charts/BarChart.client.vue";

// Add a component key to force re-render
const componentKey = ref(0);

const isOfflineMode = ref(false);
const riskLevel = ref("normal");
const viewMode = ref("simple");

// Sample data - in a real app, this would come from your API
const daysOfWeek = ref([
  "ຈັນ",
  "ອັງຄານ",
  "ພຸດ",
  "ພະຫັດ",
  "ສຸກ",
  "ເສົາ",
  "ອາທິດ",
]);

// Initialize with null or empty arrays for v-if check
const waterLevelData = ref({
  currentLevels: null,
  predictedLevels: null,
  bankHeight: 14, // Default or fetch
});

// Initialize rainfall data
const rainfallData = ref({
  intensity: null,
  accumulated: null,
  timeLabels: ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
});

const loadData = async () => {
  try {
    // Increment the component key to force re-render
    componentKey.value++;

    // Simulate fetching data
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Set water level data
    waterLevelData.value = {
      currentLevels: [7.5, 9.8, 10.4, 10.8, 11, 11.2, 10.9],
      predictedLevels: [null, null, null, null, null, 11.5, 11.8],
      bankHeight: 14,
    };

    // Set the rainfall data
    rainfallData.value = {
      intensity: [92, 75, 60, 45, 35, 20, 10],
      accumulated: [210, 230, 190, 160, 175, 135, 160],
      timeLabels: [
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
      ],
    };
  } catch (error) {
    console.error("Failed to fetch or set data:", error);
    // Handle error state
  }
};

// Run on page load and whenever the component is activated
onMounted(() => {
  loadData();
});

// Make sure we clean up properly
onBeforeUnmount(() => {
  // Reset data when component is unmounted
  waterLevelData.value = {
    currentLevels: null,
    predictedLevels: null,
    bankHeight: 14,
  };

  rainfallData.value = {
    intensity: null,
    accumulated: null,
    timeLabels: ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
  };
});

// Keep-alive hook
if (typeof onActivated !== "undefined") {
  onActivated(() => {
    loadData();
  });
}
</script>
