// dashboard page
<template>
    <div class="px-1 py-2 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
        <!-- header - responsive modifications -->
        <div
            class="flex justify-between items-center mb-2 md:mb-4 bg-white p-2 md:p-3 rounded-lg shadow"
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
                    </select>
                </div>
            </div>
        </div>

        <!-- first section - responsive grid -->
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4"
        >
            <!-- stations -->
            <div class="bg-white rounded-lg shadow p-2 md:p-3 flex flex-col">
                <p class="font-bold text-xl md:text-2xl mb-1 md:mb-2">ສະຖານີ</p>
                <div class="w-full mt-1 md:mt-3">
                    <div class="relative">
                        <select
                            v-model="selectedDevice"
                            @change="loadData"
                            :disabled="isOfflineMode"
                            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border border-slate-200 rounded-lg pl-2 md:pl-3 pr-8 py-2 md:py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                        >
                            <option
                                value=""
                                disabled
                                selected
                                v-if="isOfflineMode || devices.length === 0"
                            >
                                {{
                                    isOfflineMode
                                        ? "ຂາດການເຊື່ອມຕໍ່"
                                        : "ບໍ່ມີສະຖານີ"
                                }}
                            </option>
                            <option
                                v-for="device in devices"
                                :key="device.device_id"
                                :value="device.device_id"
                            >
                                {{ device.name }}
                            </option>
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
            </div>

            <!-- current status -->
            <div class="bg-white rounded-lg shadow p-2 md:p-3">
                <p class="font-bold text-xl md:text-2xl">
                    ສະຖານະຄວາມສ່ຽງປັດຈຸບັນ:
                </p>
                <div class="h-full flex flex-col text-center pb-2">
                    <p
                        :class="`font-bold text-3xl md:text-4xl ${
                            riskLevel === 'normal'
                                ? 'text-aqua-success'
                                : riskLevel === 'warning'
                                  ? 'text-amber-500'
                                  : 'text-aqua-critical'
                        }`"
                    >
                        {{ getRiskLevelText }}
                    </p>
                    <p class="text-sm text-gray-600 mt-1">
                        {{ getRiskLevelActionText }}
                    </p>
                </div>
            </div>

            <!-- signal strength & battery -->
            <div class="flex flex-row sm:flex-col gap-x-2 gap-y-2">
                <div
                    class="bg-white w-1/2 sm:w-full h-16 sm:h-1/2 rounded-lg flex items-center justify-center shadow p-1 md:p-2"
                >
                    <div class="text-sm md:text-lg text-center">
                        ສະຖານະການເຊື່ອມຕໍ່:
                        <span
                            :class="{
                                'text-aqua-critical': isOfflineMode,
                                'text-aqua-success': !isOfflineMode,
                            }"
                            class="font-medium block"
                            >{{
                                isOfflineMode
                                    ? "ຂາດການເຊື່ອມຕໍ່"
                                    : "ເຊື່ອມຕໍ່ແລ້ວ"
                            }}</span
                        >
                        <span
                            class="text-[10px] rounded-full text-center mt-1"
                            :class="{ 'text-aqua-critical': isOfflineMode }"
                        >
                            {{
                                isOfflineMode
                                    ? "ຂາດການເຊື່ອມຕໍ່"
                                    : `ອັບເດດ: ${getLastUpdateTime()}`
                            }}
                        </span>
                    </div>
                </div>
                <div
                    class="bg-white w-1/2 sm:w-full h-16 sm:h-1/2 rounded-lg flex items-center justify-center shadow p-1 md:p-2"
                >
                    <div class="text-sm md:text-lg text-center">
                        ສະຖານະແບັດເຕີລີ:
                        <span class="font-bold">
                            {{
                                selectedDeviceObj && selectedDeviceObj.status
                                    ? `${selectedDeviceObj.status?.battery || 0}%`
                                    : "N/A"
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add this after your first grid section and before the soil moisture & water flow rate metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4">
            <!-- Water Level Reading -->
            <div
                class="bg-white rounded-lg shadow p-2 md:p-4 flex flex-col items-center"
            >
                <div class="font-bold text-lg md:text-2xl text-center">
                    ລະດັບນ້ຳ:
                </div>
                <div class="flex items-center">
                    <span class="text-2xl md:text-4xl font-bold mt-2">
                        <span class="text-2xl md:text-4xl font-bold mt-2">
                            {{
                                latestReadings?.waterLevel?.latest !== null
                                    ? `${latestReadings.waterLevel?.latest} cm`
                                    : "N/A"
                            }}
                        </span>
                    </span>
                    <!-- <span class="text-sm ml-2 text-gray-600">{{
                        getWaterLevelStatus()
                    }}</span> -->
                    <svg
                        v-if="getWaterLevelDirection() === 'up'"
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
                    <svg
                        v-else-if="getWaterLevelDirection() === 'down'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 ml-1 text-aqua-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>

            <!-- Rainfall Reading -->
            <div
                class="bg-white rounded-lg shadow p-2 md:p-4 flex flex-col items-center"
            >
                <div class="font-bold text-lg md:text-2xl text-center">
                    ປະລິມານນ້ຳຝົນ:
                </div>
                <div class="flex items-center">
                    <span class="text-2xl md:text-4xl font-bold mt-2">
                        {{
                            latestReadings?.rainfall?.latest !== null
                                ? `${latestReadings.rainfall?.latest} mm`
                                : "N/A"
                        }}
                    </span>
                    <!-- <span class="text-sm ml-2 text-gray-600">{{
                        getRainfallStatus()
                    }}</span> -->
                    <svg
                        v-if="getRainfallDirection() === 'up'"
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
                    <svg
                        v-else-if="getRainfallDirection() === 'down'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 ml-1 text-aqua-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </div>

        <!-- soil moisture & water flow rate metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4">
            <!-- soil moisture -->
            <div
                class="bg-white rounded-lg shadow p-2 md:p-4 flex flex-col items-center"
            >
                <div class="font-bold text-lg md:text-2xl text-center">
                    ຄວາມຊຸ່ມຂອງດິນ:
                </div>
                <div class="flex items-center">
                    <span class="text-2xl md:text-4xl font-bold mt-2">
                        {{
                            latestReadings?.soilMoisture?.latest !== null
                                ? `${latestReadings.soilMoisture?.latest}%`
                                : "N/A"
                        }}
                    </span>
                    <!-- <span class="text-sm ml-2 text-gray-600">{{
                        getSoilMoistureStatus()
                    }}</span> -->
                    <svg
                        v-if="getSoilMoistureDirection() === 'up'"
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
                    <svg
                        v-else-if="getSoilMoistureDirection() === 'down'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 ml-1 text-aqua-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>

            <!-- Flow rate -->
            <div
                class="bg-white rounded-lg shadow p-2 md:p-4 flex flex-col items-center"
            >
                <div class="font-bold text-lg md:text-2xl text-center">
                    ຄວາມໄວການໄຫຼຂອງນ້ຳ:
                </div>
                <div class="flex items-center">
                    <span class="text-2xl md:text-4xl font-bold mt-1">
                        {{
                            latestReadings?.flowRate?.latest !== null
                                ? `${latestReadings.flowRate?.latest} m`
                                : "N/A"
                        }}<sup>3</sup>/s
                    </span>
                    <span class="text-sm ml-2 text-gray-600">{{
                        getFlowRateStatus()
                    }}</span>
                    <svg
                        v-if="getFlowRateDirection() === 'up'"
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
                    <svg
                        v-else-if="getFlowRateDirection() === 'down'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 ml-1 text-aqua-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Water level chart -->
        <div class="bg-white rounded-lg shadow-sm p-2 md:p-4 mb-3 md:mb-4">
            <h2 class="text-base md:text-xl font-semibold mb-1.5">
                ລະດັບປັດຈຸບັນ
            </h2>
            <span
                class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
            >
                ອັບເດດ: {{ new Date().toLocaleTimeString("lo-LA") }}
                {{ new Date().toLocaleDateString("lo-LA") }}
            </span>
            <ClientOnly>
                <div
                    v-if="!isLoading && waterLevelData.currentLevels"
                    class="h-52 md:h-96"
                >
                    <WaterLevelChart
                        :key="`water-level-${componentKey}`"
                        :current-levels="waterLevelData.currentLevels"
                        :predicted-levels="waterLevelData.predictedLevels"
                        :bank-height="waterLevelData.bankHeight"
                        :labels="waterLevelData.labels || daysOfWeek"
                    />
                </div>
                <div
                    v-else
                    class="h-52 md:h-96 flex items-center justify-center"
                >
                    <div
                        v-if="isLoading"
                        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
                    ></div>
                    <p v-else class="text-gray-500">
                        No water level data available
                    </p>
                </div>
            </ClientOnly>
            <p class="text-sm text-gray-500 mt-2">
                * ການຄາດຄະເນໃນ 24 ຊົ່ວໂມງຕໍ່ໜ້າ
            </p>
        </div>

        <!-- Additional metrics -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 mb-3 md:mb-4">
            <!-- Rainfall rate -->
            <div class="bg-white rounded-lg shadow p-2 md:p-4">
                <h2 class="text-base md:text-xl font-semibold mb-2 md:mb-4">
                    ຄວາມຮຸນແຮງຂອງຝົນຕົກ
                </h2>
                <ClientOnly>
                    <div
                        v-if="!isLoading && rainfallData.intensity"
                        class="h-52 md:h-96"
                    >
                        <BarChart
                            :key="`rainfall-intensity-${componentKey}`"
                            :chart-data="rainfallData.intensity"
                            :categories="rainfallData.timeLabels"
                            :series-name="'ຄວາມຮຸນແຮງຂອງຝົນຕົກ'"
                            :y-axis-title="'mm/hr'"
                            :y-axis-unit="'mm/hr'"
                            :column-width="'40%'"
                            :color="'#0095FF'"
                            :height="230"
                        />
                    </div>
                    <div
                        v-else
                        class="h-52 md:h-96 flex items-center justify-center"
                    >
                        <div
                            v-if="isLoading"
                            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
                        ></div>
                        <p v-else class="text-gray-500">
                            No rainfall data available
                        </p>
                    </div>
                </ClientOnly>
            </div>

            <!-- Accumulated rainfall -->
            <div class="bg-white rounded-lg shadow p-2 md:p-4">
                <h2 class="text-base md:text-xl font-semibold mb-2 md:mb-4">
                    ການສະສົມຂອງນ້ຳຝົນ
                </h2>
                <ClientOnly>
                    <BarChart
                        v-if="safeRainfallData.accumulated"
                        :key="`rainfall-accumulated-${componentKey}`"
                        :chart-data="safeRainfallData.accumulated"
                        :categories="daysOfWeek"
                        :series-name="'ການສະສົມຂອງນ້ຳຝົນຕໍ່ມື້'"
                        :y-axis-title="'mm'"
                        :y-axis-unit="'mm'"
                        :column-width="'50%'"
                        :height="250"
                    />
                    <!-- <hr
                        class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"
                    />
                    <p
                        class="text-aqua-info text-xs md:text-base font-semibold"
                    >
                        <span class="underline">ສະຫຼຸບ</span>::
                        ການສະສົມຂອງນ້ຳຝົນໃນອາທິດນີ້ຢູ່ໃນລະດັບປົກກະຕິ.
                    </p> -->
                    <template #fallback>
                        <div
                            class="h-40 md:h-48 bg-gray-50 rounded flex items-center justify-center"
                        >
                            <p class="text-gray-500">
                                Loading accumulated rainfall data...
                            </p>
                        </div>
                    </template>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useApi } from "~/composables/useApi";
import { useChartData } from "~/composables/useChartData";
import { processReadings } from "~/utils/processReadings";
// Import chart components
import WaterLevelChart from "~/components/charts/LineChart.client.vue";
import BarChart from "~/components/charts/BarChart.client.vue";

// Near the top of your script setup section
const daysOfWeek = ref([
    "ຈັນ",
    "ອັງຄານ",
    "ພຸດ",
    "ພະຫັດ",
    "ສຸກ",
    "ເສົາ",
    "ອາທິດ",
]);

// Reactive state
const isLoading = ref(true);
const error = ref(null);
const devices = ref([]);
const selectedDevice = ref(""); // Use selectedDevice instead of selectedDeviceId
const latestReadings = ref({});
const componentKey = ref(0); // For forcing component re-renders

// Computed properties
const selectedDeviceId = computed(() => selectedDevice.value);
// console.log("selectedDeviceId >>", selectedDeviceId);

// Find the selected device object
const selectedDeviceObj = computed(() => {
    return (
        devices.value.find((d) => d.device_id === selectedDeviceId.value) || {}
    );
});

// console.log("selectedDeviceObj >>", selectedDeviceObj);

// Computed property to determine connection status
const isOfflineMode = computed(() => {
    if (
        !selectedDeviceObj.value ||
        !selectedDeviceObj.value.status ||
        !selectedDeviceObj.value.status.last_check_in
    ) {
        return true;
    }

    // Consider the device offline if last check-in was more than 5 minutes ago
    const lastCheckIn = new Date(selectedDeviceObj.value.status.last_check_in);
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

    return lastCheckIn < fiveMinutesAgo;
});

// Format the last update time
const getLastUpdateTime = () => {
    if (
        selectedDeviceObj.value &&
        selectedDeviceObj.value.status &&
        selectedDeviceObj.value.status.last_check_in
    ) {
        const lastUpdate = new Date(
            selectedDeviceObj.value.status.last_check_in,
        );
        return lastUpdate.toLocaleString("lo-LA", {
            timeZone: "Asia/Vientiane",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

        // console.log(
        //     "last check in >>",
        //     lastUpdate.toLocaleString("lo-LA", {
        //         timeZone: "Asia/Vientiane",
        //         year: "numeric",
        //         month: "numeric",
        //         day: "numeric",
        //         hour: "2-digit",
        //         minute: "2-digit",
        //     }),
        // );
    }
    return "N/A";
};

// Calculate the overall risk level based on all sensor readings
const riskLevel = computed(() => {
    if (!latestReadings.value) return "normal";

    // Define thresholds - these should come from your device configuration in a real app
    const waterLevelCritical = 12; // meters
    const waterLevelWarning = 10; // meters
    const flowRateCritical = 100; // m3/s
    const flowRateWarning = 80; // m3/s
    const soilMoistureCritical = 90; // percentage
    const soilMoistureWarning = 80; // percentage

    // Check water level
    if (
        latestReadings.value.waterLevel &&
        latestReadings.value.waterLevel.latest !== null
    ) {
        if (latestReadings.value.waterLevel.latest >= waterLevelCritical)
            return "critical";
        if (latestReadings.value.waterLevel.latest >= waterLevelWarning)
            return "warning";
    }

    // Check flow rate
    if (
        latestReadings.value.flowRate &&
        latestReadings.value.flowRate.latest !== null
    ) {
        if (latestReadings.value.flowRate.latest >= flowRateCritical)
            return "critical";
        if (latestReadings.value.flowRate.latest >= flowRateWarning)
            return "warning";
    }

    // Check soil moisture
    if (
        latestReadings.value.soilMoisture &&
        latestReadings.value.soilMoisture.latest !== null
    ) {
        if (latestReadings.value.soilMoisture.latest >= soilMoistureCritical)
            return "critical";
        if (latestReadings.value.soilMoisture.latest >= soilMoistureWarning)
            return "warning";
    }

    return "normal";
});

// Get risk level text
const getRiskLevelText = computed(() => {
    switch (riskLevel.value) {
        case "critical":
            return "ວິກິດ";
        case "warning":
            return "ເຕືອນໄພ";
        default:
            return "ປົກກະຕິ";
    }
});

// Get risk level action text
const getRiskLevelActionText = computed(() => {
    switch (riskLevel.value) {
        case "critical":
            return "(ກະລຸນາອົບພະຍົບທັນທີ)";
        case "warning":
            return "(ກະລຸນາກຽມພ້ອມອົບພະຍົບ)";
        default:
            return "(ບໍ່ຈໍາເປັນຕ້ອງດໍາເນີນການໃດໆ)";
    }
});

// Determine soil moisture status text
const getSoilMoistureStatus = () => {
    if (
        !latestReadings.value ||
        !latestReadings.value.soilMoisture ||
        latestReadings.value.soilMoisture.latest === null
    ) {
        return "";
    }

    const value = latestReadings.value.soilMoisture.latest;
    if (value > 80) return "(ສູງກວ່າປົກກະຕິ)";
    if (value < 30) return "(ຕ່ຳກວ່າປົກກະຕິ)";
    return "(ປົກກະຕິ)";
};

// Determine soil moisture direction
const getSoilMoistureDirection = () => {
    if (
        !latestReadings.value ||
        !latestReadings.value.soilMoisture ||
        !latestReadings.value.soilMoisture.values
    ) {
        return null;
    }

    const values = latestReadings.value.soilMoisture.values.filter(
        (v) => v !== null,
    );
    if (values.length < 2) return null;

    const current = values[values.length - 1];
    const previous = values[values.length - 2];

    if (current > previous) return "up";
    if (current < previous) return "down";
    return null;
};

// Determine flow rate status text
const getFlowRateStatus = () => {
    if (
        !latestReadings.value ||
        !latestReadings.value.flowRate ||
        latestReadings.value.flowRate.latest === null
    ) {
        return "";
    }

    const value = latestReadings.value.flowRate.latest;
    if (value > 100) return "(ສູງກວ່າປົກກະຕິ)";
    if (value < 20) return "(ຕ່ຳກວ່າປົກກະຕິ)";
    return "(ປົກກະຕິ)";
};

// Determine flow rate direction
const getFlowRateDirection = () => {
    if (
        !latestReadings.value ||
        !latestReadings.value.flowRate ||
        !latestReadings.value.flowRate.values
    ) {
        return null;
    }

    const values = latestReadings.value.flowRate.values.filter(
        (v) => v !== null,
    );
    if (values.length < 2) return null;

    const current = values[values.length - 1];
    const previous = values[values.length - 2];

    if (current > previous) return "up";
    if (current < previous) return "down";
    return null;
};

// Determine water level status text
const getWaterLevelStatus = () => {
    if (
        !latestReadings.value ||
        !latestReadings.value.waterLevel ||
        latestReadings.value.waterLevel.latest === null
    ) {
        return "";
    }

    const value = latestReadings.value.waterLevel.latest;
    if (value > 10) return "(ສູງກວ່າປົກກະຕິ)";
    if (value < 2) return "(ຕ່ຳກວ່າປົກກະຕິ)";
    return "(ປົກກະຕິ)";
};

// Determine water level direction
const getWaterLevelDirection = () => {
    if (
        !latestReadings.value ||
        !latestReadings.value.waterLevel ||
        !latestReadings.value.waterLevel.current
    ) {
        return null;
    }

    const values = latestReadings.value.waterLevel.current.filter(
        (v) => v !== null,
    );
    if (values.length < 2) return null;

    const current = values[values.length - 1];
    const previous = values[values.length - 2];

    if (current > previous) return "up";
    if (current < previous) return "down";
    return null;
};

// Determine rainfall status text
const getRainfallStatus = () => {
    if (
        !latestReadings.value ||
        !latestReadings.value.rainfall ||
        latestReadings.value.rainfall.latest === null
    ) {
        return "";
    }

    const value = latestReadings.value.rainfall.latest;
    if (value > 20) return "(ຝົນຕົກໜັກ)";
    if (value > 5) return "(ຝົນຕົກປານກາງ)";
    if (value > 0) return "(ຝົນຕົກເບົາ)";
    return "(ບໍ່ມີຝົນຕົກ)";
};

// Determine rainfall direction
const getRainfallDirection = () => {
    if (
        !latestReadings.value ||
        !latestReadings.value.rainfall ||
        !latestReadings.value.rainfall.intensity
    ) {
        return null;
    }

    const values = latestReadings.value.rainfall.intensity.filter(
        (v) => v !== null,
    );
    if (values.length < 2) return null;

    const current = values[values.length - 1];
    const previous = values[values.length - 2];

    if (current > previous) return "up";
    if (current < previous) return "down";
    return null;
};

// Function to load data based on selected device
const loadData = () => {
    if (selectedDevice.value) {
        fetchReadings();
    }
};

// Get API and chart data composables
const api = useApi();
const chartData = useChartData();

// In fetchDevices function
const fetchDevices = async () => {
    try {
        console.log("Starting to fetch devices...");
        isLoading.value = true;
        error.value = null;

        const deviceData = await api.fetchDevices();
        console.log("Devices fetched:", deviceData);
        devices.value = deviceData;

        // If no device is selected and we have devices, select the first one
        if (!selectedDevice.value && deviceData.length > 0) {
            console.log("Selecting first device:", deviceData[0].device_id);
            selectedDevice.value = deviceData[0].device_id;
        }

        isLoading.value = false;
    } catch (err) {
        error.value = "Failed to load devices. Please try again.";
        isLoading.value = false;
        console.error("Error fetching devices:", err);
    }
};

// In fetchReadings function
const fetchReadings = async () => {
    if (!selectedDeviceId.value) {
        console.log("No device selected, skipping readings fetch");
        return;
    }

    try {
        console.log(
            "Starting to fetch readings for device:",
            selectedDeviceId.value,
        );
        isLoading.value = true;

        // Fetch water level data
        await chartData.fetchWaterLevelData(selectedDeviceId.value);
        console.log("Water level data fetched:", chartData.waterLevel.value);

        // Fetch flow rate data
        await chartData.fetchFlowRateData(selectedDeviceId.value);
        console.log("Flow rate data fetched:", chartData.flowRate.value);

        // Fetch rainfall data
        await chartData.fetchRainfallData(selectedDeviceId.value);
        console.log("Rainfall data fetched:", chartData.rainfall.value);

        // Fetch soil moisture data
        await chartData.fetchSoilMoistureData(selectedDeviceId.value);
        console.log(
            "Soil moisture data fetched:",
            chartData.soilMoisture.value,
        );

        // Get all readings for the latest status
        const allReadings = await api.fetchDeviceReadings(
            selectedDeviceId.value,
        );
        console.log("All readings fetched:", allReadings);

        latestReadings.value = processReadings(allReadings);
        console.log("Processed readings:", latestReadings.value);

        // Force component re-render by updating the key
        componentKey.value++;

        isLoading.value = false;
    } catch (err) {
        error.value = "Failed to load sensor data. Please try again.";
        isLoading.value = false;
        console.error("Error fetching readings:", err);
    }
};

const safeRainfallData = computed(() => {
    if (!latestReadings.value || !latestReadings.value.rainfall) {
        return {
            intensity: [],
            accumulated: [],
            latest: null,
        };
    }
    return latestReadings.value.rainfall;
});

const rainfallData = computed(() => {
    if (!latestReadings.value || !latestReadings.value.rainfall) {
        return {
            intensity: [],
            accumulated: [],
            timeLabels: [],
        };
    }
    return {
        intensity: latestReadings.value.rainfall.intensity || [],
        accumulated: latestReadings.value.rainfall.accumulated || [],
        timeLabels: latestReadings.value.labels || [],
    };
});

const waterLevelData = computed(() => {
    if (!latestReadings.value || !latestReadings.value.waterLevel) {
        return {
            currentLevels: [],
            predictedLevels: [],
            bankHeight: 14,
            labels: [],
        };
    }
    return {
        currentLevels: latestReadings.value.waterLevel.current || [],
        predictedLevels: latestReadings.value.waterLevel.predicted || [],
        bankHeight: 14, // This should come from your device configuration
        labels: latestReadings.value.labels || [],
    };
});

// Set up Socket.IO for real-time updates
// Set up Socket.IO for real-time updates
const setupRealtimeUpdates = () => {
    const nuxtApp = useNuxtApp();
    const socket = nuxtApp.$socket;

    if (!socket) {
        console.warn("Socket.IO not available");
        return;
    }

    socket.on("connect", () => {
        console.log("Socket connected to server with ID:", socket.id);
    });

    // Listen for new readings
    socket.on("new-reading", (data) => {
        console.log("Real-time reading received:", data);

        // Only update if this is for our selected device
        if (data.deviceId === selectedDeviceId.value) {
            // Create a new reading object to process
            const newReading = data.reading;

            // Directly update the latestReadings object based on sensor type
            if (!latestReadings.value) {
                latestReadings.value = {};
            }

            // Update the appropriate sensor data
            switch (data.sensorType) {
                case "water_level":
                    if (!latestReadings.value.waterLevel) {
                        latestReadings.value.waterLevel = {
                            current: [],
                            predicted: [],
                            latest: null,
                        };
                    }

                    // Update the latest value
                    latestReadings.value.waterLevel.latest = parseFloat(
                        newReading.value,
                    );

                    // Update the current values array
                    if (
                        Array.isArray(latestReadings.value.waterLevel.current)
                    ) {
                        // Clone the array to ensure reactivity
                        const updatedCurrent = [
                            ...latestReadings.value.waterLevel.current,
                        ];

                        // Add new reading and maintain array size
                        updatedCurrent.push(parseFloat(newReading.value));
                        if (updatedCurrent.length > 7) {
                            updatedCurrent.shift();
                        }

                        latestReadings.value.waterLevel.current =
                            updatedCurrent;

                        // Update prediction if needed
                        if (
                            updatedCurrent[updatedCurrent.length - 1] !== null
                        ) {
                            latestReadings.value.waterLevel.predicted = [
                                null,
                                null,
                                null,
                                null,
                                null,
                                updatedCurrent[updatedCurrent.length - 1] *
                                    1.05,
                                updatedCurrent[updatedCurrent.length - 1] * 1.1,
                            ];
                        }
                    }
                    break;

                case "rainfall":
                    if (!latestReadings.value.rainfall) {
                        latestReadings.value.rainfall = {
                            intensity: [],
                            accumulated: [],
                            latest: null,
                        };
                    }

                    // Update the latest value
                    latestReadings.value.rainfall.latest = parseFloat(
                        newReading.value,
                    );

                    // Update the intensity array
                    if (
                        Array.isArray(latestReadings.value.rainfall.intensity)
                    ) {
                        const updatedIntensity = [
                            ...latestReadings.value.rainfall.intensity,
                        ];
                        updatedIntensity.push(parseFloat(newReading.value));
                        if (updatedIntensity.length > 7) {
                            updatedIntensity.shift();
                        }
                        latestReadings.value.rainfall.intensity =
                            updatedIntensity;
                    }
                    break;

                case "flow_rate":
                    if (!latestReadings.value.flowRate) {
                        latestReadings.value.flowRate = {
                            values: [],
                            latest: null,
                        };
                    }

                    // Update the latest value
                    latestReadings.value.flowRate.latest = parseFloat(
                        newReading.value,
                    );

                    // Update the values array
                    if (Array.isArray(latestReadings.value.flowRate.values)) {
                        const updatedValues = [
                            ...latestReadings.value.flowRate.values,
                        ];
                        updatedValues.push(parseFloat(newReading.value));
                        if (updatedValues.length > 7) {
                            updatedValues.shift();
                        }
                        latestReadings.value.flowRate.values = updatedValues;
                    }
                    break;

                case "soil_moisture":
                    if (!latestReadings.value.soilMoisture) {
                        latestReadings.value.soilMoisture = {
                            values: [],
                            latest: null,
                        };
                    }

                    // Update the latest value
                    latestReadings.value.soilMoisture.latest = parseFloat(
                        newReading.value,
                    );

                    // Update the values array
                    if (
                        Array.isArray(latestReadings.value.soilMoisture.values)
                    ) {
                        const updatedValues = [
                            ...latestReadings.value.soilMoisture.values,
                        ];
                        updatedValues.push(parseFloat(newReading.value));
                        if (updatedValues.length > 7) {
                            updatedValues.shift();
                        }
                        latestReadings.value.soilMoisture.values =
                            updatedValues;
                    }
                    break;
            }

            // Force component re-render by updating the key
            componentKey.value++;

            console.log(
                `Updated ${data.sensorType} with new value:`,
                newReading.value,
            );
        }
    });
};

// On component mount, fetch data and set up real-time updates
onMounted(() => {
    fetchDevices()
        .then(() => fetchReadings())
        .then(() => setupRealtimeUpdates());
});

// Clean up listeners when component unmounts
onBeforeUnmount(() => {
    const nuxtApp = useNuxtApp();
    const socket = nuxtApp.$socket;
    if (socket) {
        socket.off("new-reading");
    }
});
</script>

<style scoped>
select:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>
