<!-- pages/alerts.vue -->
<template>
    <div class="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
        <!-- Page Header -->
        <div
            class="flex justify-between items-center mb-3 md:mb-4 bg-white p-2 md:p-3 rounded-lg shadow"
        >
            <h1 class="text-xl md:text-2xl font-bold">ປະຫວັດການແຈ້ງເຕືອນ</h1>
            <div class="flex items-center">
                <button class="p-1 text-gray-700">
                    <BellIcon class="w-6 h-6" />
                </button>
            </div>
        </div>

        <!-- Filters Section -->
        <div class="bg-white rounded-lg shadow p-3 mb-4">
            <h2 class="font-bold text-lg md:text-xl mb-2 md:mb-3">ຕົວເລືອກ</h2>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
            >
                <div>
                    <label
                        for="deviceFilter"
                        class="block text-sm font-medium text-gray-600 mb-1"
                        >ອຸປະກອນ</label
                    >
                    <select
                        id="deviceFilter"
                        v-model="filters.deviceId"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">ທັງໝົດ</option>
                        <option
                            v-for="device in devices"
                            :key="device.device_id"
                            :value="device.device_id"
                        >
                            {{ device.name || device.device_id }}
                        </option>
                    </select>
                </div>
                <!-- Alert Type Filter -->
                <div>
                    <label
                        for="alertType"
                        class="block text-sm font-medium text-gray-600 mb-1"
                        >ປະເພດການເຕືອນ</label
                    >
                    <select
                        id="alertType"
                        v-model="filters.type"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">ທັງໝົດ</option>
                        <option value="critical">Critical</option>
                        <option value="warning">Warning</option>
                        <option value="info">Info</option>
                    </select>
                </div>

                <!-- Date Filter -->
                <div>
                    <label
                        for="dateFilter"
                        class="block text-sm font-medium text-gray-600 mb-1"
                        >ເວລາ</label
                    >
                    <select
                        id="dateFilter"
                        v-model="filters.dateRange"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="all">ທັງໝົດ</option>
                        <option value="today">ມື້ນີ້</option>
                        <option value="yesterday">ມື້ວານນີ້</option>
                        <option value="week">ອາທິດນີ້</option>
                        <option value="month">ເດືອນນີ້</option>
                    </select>
                </div>

                <!-- Filter Button -->
                <div class="sm:col-span-2 lg:col-span-4 pt-2">
                    <button
                        @click="applyFilters"
                        :disabled="loading"
                        class="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg
                            v-if="loading"
                            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        {{ loading ? "ກຳລັງໂຫຼດ..." : "ດຶງຂໍ້ມູນ" }}
                    </button>
                    <button
                        @click="resetFilters"
                        class="ml-2 w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        ລ້າງຕົວກອງ
                    </button>
                </div>
            </div>
        </div>

        <!-- View Mode Toggle -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <!-- Toggle for different display modes -->
            <div
                class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-end"
            >
                <div class="flex space-x-2">
                    <button
                        @click="viewMode = 'list'"
                        :class="[
                            'px-3 py-1 text-sm font-medium rounded',
                            viewMode === 'list'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                        ]"
                    >
                        ຮູບແບບລາຍການ
                    </button>
                    <button
                        @click="viewMode = 'card'"
                        :class="[
                            'px-3 py-1 text-sm font-medium rounded',
                            viewMode === 'card'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                        ]"
                    >
                        ຮູບແບບບັດ
                    </button>
                </div>
            </div>

            <!-- List View -->
            <div v-if="viewMode === 'list'" class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                        <tr>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ປະເພດ
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ເວລາ
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ຂໍ້ຄວາມ
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ການດໍາເນີນການ
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-if="loading && paginatedAlerts.length === 0">
                            <td
                                colspan="4"
                                class="px-4 py-4 text-center text-gray-500"
                            >
                                <div class="flex justify-center items-center">
                                    <svg
                                        class="animate-spin h-8 w-8 text-blue-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                        <tr
                            v-else-if="!loading && paginatedAlerts.length === 0"
                        >
                            <td
                                colspan="4"
                                class="px-4 py-4 text-center text-gray-500"
                            >
                                ບໍ່ມີຂໍ້ມູນສຳລັບຕົວກອງທີ່ເລືອກ.
                            </td>
                        </tr>
                        <tr
                            v-else
                            v-for="alert in paginatedAlerts"
                            :key="alert.alert_id"
                            class="hover:bg-gray-50 transition-colors duration-150"
                            @click="showAlertDetails(alert)"
                        >
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        :class="[
                                            'flex-shrink-0 p-1 rounded-full',
                                            alert.severity === 'critical'
                                                ? 'text-red-500'
                                                : alert.severity === 'danger'
                                                  ? 'text-orange-500'
                                                  : alert.severity === 'warning'
                                                    ? 'text-yellow-500'
                                                    : 'text-blue-500',
                                        ]"
                                    >
                                        <ExclamationCircleIcon
                                            v-if="
                                                alert.severity === 'critical' ||
                                                alert.severity === 'danger'
                                            "
                                            class="w-5 h-5"
                                        />
                                        <ExclamationTriangleIcon
                                            v-if="alert.severity === 'warning'"
                                            class="w-5 h-5"
                                        />
                                        <InformationCircleIcon
                                            v-if="alert.severity === 'info'"
                                            class="w-5 h-5"
                                        />
                                    </div>
                                    <span class="ml-2 font-semibold capitalize">
                                        {{ formatAlertType(alert.type) }}
                                    </span>
                                </div>
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                {{ formatTimeAgo(alert.created_at) }}
                            </td>
                            <td class="px-4 py-4 text-sm text-gray-700">
                                {{ alert.message }}
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                <button
                                    class="text-blue-600 hover:text-blue-800"
                                    @click.stop="showAlertDetails(alert)"
                                >
                                    ລາຍລະອຽດ
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Card View -->
            <div
                v-else-if="viewMode === 'card'"
                class="divide-y divide-gray-200"
            >
                <div
                    v-if="loading && paginatedAlerts.length === 0"
                    class="p-8 text-center"
                >
                    <svg
                        class="animate-spin h-8 w-8 text-blue-600 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
                <div
                    v-else-if="!loading && paginatedAlerts.length === 0"
                    class="p-8 text-center text-gray-500"
                >
                    ບໍ່ມີຂໍ້ມູນສຳລັບຕົວກອງທີ່ເລືອກ.
                </div>
                <AlertCard
                    v-else
                    v-for="alert in paginatedAlerts"
                    :key="alert.alert_id"
                    :alert="alert"
                    @click="showAlertDetails(alert)"
                />
            </div>

            <!-- Improved Pagination Controls -->
            <div
                v-if="!loading && totalPages > 1"
                class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            >
                <!-- Mobile Pagination -->
                <div class="flex-1 flex justify-between sm:hidden">
                    <button
                        @click="prevPage"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ກັບຄືນ
                    </button>
                    <span class="text-sm text-gray-700">
                        {{ currentPage }} / {{ totalPages }}
                    </span>
                    <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ຕໍ່ໄປ
                    </button>
                </div>

                <!-- Desktop Pagination -->
                <div
                    class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                >
                    <div>
                        <p class="text-sm text-gray-700">
                            ສະແດງ
                            <span class="font-medium">{{
                                (currentPage - 1) * itemsPerPage + 1
                            }}</span>
                            ຫາ
                            <span class="font-medium">{{
                                Math.min(currentPage * itemsPerPage, totalItems)
                            }}</span>
                            ຈາກທັງໝົດ
                            <span class="font-medium">{{ totalItems }}</span>
                            ລາຍການ
                        </p>
                    </div>
                    <div>
                        <nav
                            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                        >
                            <button
                                @click="prevPage"
                                :disabled="currentPage === 1"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span class="sr-only">Previous</span>
                                <ChevronLeftIcon class="h-5 w-5" />
                            </button>

                            <template
                                v-for="page in paginationRange"
                                :key="page"
                            >
                                <button
                                    v-if="typeof page === 'number'"
                                    @click="goToPage(page)"
                                    :class="[
                                        'relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium',
                                        currentPage === page
                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50',
                                    ]"
                                >
                                    {{ page }}
                                </button>
                                <span
                                    v-else
                                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                >
                                    ...
                                </span>
                            </template>

                            <button
                                @click="nextPage"
                                :disabled="currentPage === totalPages"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span class="sr-only">Next</span>
                                <ChevronRightIcon class="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div
            v-if="error"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
        >
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">{{ error }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import {
    BellIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import AlertCard from "~/components/cards/AlertCard.vue";
import AlertModal from "~/components/modals/AlertModal.vue";
import { useApi } from "~/composables/useApi"; // Import the API composable

// Reactive State
const loading = ref(false);
const error = ref(null);
const showModal = ref(false);
const viewMode = ref("list");
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalApiItems = ref(0); // Store total items count from API

const route = useRoute();
const router = useRouter();
const { fetchAlerts, fetchDevices, fetchDeviceAlerts } = useApi();

const devices = ref([]);

// Update filters to include deviceId
const filters = reactive({
    type: "",
    dateRange: "all",
    deviceId: "", // New filter for device
});

// Raw alert data from API
const rawAlerts = ref([]);

// Fetch available devices for the filter
const fetchAvailableDevices = async () => {
    try {
        const deviceList = await fetchDevices();
        devices.value = deviceList;
    } catch (err) {
        console.error("Failed to load devices for filter:", err);
    }
};

// Fetch data from API
const fetchAlertsData = async () => {
    loading.value = true;
    error.value = null;

    try {
        // If a device ID is specified, use the device-specific alerts API
        if (filters.deviceId) {
            const deviceAlerts = await fetchDeviceAlerts(filters.deviceId);

            // Filter by type if needed
            let filteredAlerts = deviceAlerts;
            if (filters.type) {
                filteredAlerts = deviceAlerts.filter(
                    (alert) =>
                        alert.severity === filters.type ||
                        alert.type === filters.type,
                );
            }

            // Filter by date range
            if (filters.dateRange !== "all") {
                filteredAlerts = filterAlertsByDate(
                    filteredAlerts,
                    filters.dateRange,
                );
            }

            // Apply pagination manually for device-specific alerts
            const startIndex = (currentPage.value - 1) * itemsPerPage.value;
            const endIndex = startIndex + itemsPerPage.value;

            rawAlerts.value = filteredAlerts.slice(startIndex, endIndex);
            totalApiItems.value = filteredAlerts.length;
        } else {
            // Use the general alerts API when no device is selected
            const apiFilters = {
                type: filters.type,
                dateRange:
                    filters.dateRange !== "all" ? filters.dateRange : undefined,
                page: currentPage.value,
                limit: itemsPerPage.value,
            };

            const response = await fetchAlerts(apiFilters);
            rawAlerts.value = response.alerts || [];
            totalApiItems.value = response.total || rawAlerts.value.length;
        }
    } catch (err) {
        error.value = err.message || "Failed to load alerts";
        rawAlerts.value = [];
    } finally {
        loading.value = false;
    }
};

const filterAlertsByDate = (alerts, dateRange) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return alerts.filter((alert) => {
        const alertDate = new Date(alert.created_at);

        switch (dateRange) {
            case "today":
                return alertDate >= today;
            case "yesterday":
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                return alertDate >= yesterday && alertDate < today;
            case "week":
                const lastWeek = new Date(today);
                lastWeek.setDate(lastWeek.getDate() - 7);
                return alertDate >= lastWeek;
            case "month":
                const lastMonth = new Date(today);
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                return alertDate >= lastMonth;
            default:
                return true;
        }
    });
};

const resetFilters = () => {
    filters.type = "";
    filters.dateRange = "all";
    filters.deviceId = "";
    currentPage.value = 1;
    fetchAlertsData();
};

// Format helpers
const formatTimeAgo = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;

    // Convert to seconds
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec} seconds ago`;

    // Convert to minutes
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;

    // Convert to hours
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;

    // Convert to days
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

    // Convert to months
    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12)
        return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;

    // Convert to years
    const diffYear = Math.floor(diffMonth / 12);
    return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
};

const formatAlertType = (type) => {
    switch (type) {
        case "flood_warning":
            return "ເຕືອນໄພນ້ຳຖ້ວມ";
        case "sensor_failure":
            return "ເຊັນເຊີເສຍຫາຍ";
        case "battery_low":
            return "ແບັດເຕີຣີຕ່ຳ";
        case "connection_loss":
            return "ການເຊື່ອມຕໍ່ຂາດ";
        default:
            return type;
    }
};

// Computed Properties
const totalItems = computed(() => totalApiItems.value);

const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value)),
);

// We're using the raw data directly now since the API already gives us paginated data
const paginatedAlerts = computed(() => rawAlerts.value);

// Enhanced pagination display logic
const paginationRange = computed(() => {
    // Your existing pagination logic
    const current = currentPage.value;
    const last = totalPages.value;
    const delta = 1;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l = null;

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (const i of range) {
        if (l !== null) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l > 2) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
});

// Pagination Methods - updated to fetch new data when page changes
const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        fetchAlertsData(); // Fetch new data for the selected page
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchAlertsData(); // Fetch data for next page
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchAlertsData(); // Fetch data for previous page
    }
};

// Filter application
const applyFilters = () => {
    currentPage.value = 1; // Reset to first page when applying filters
    fetchAlertsData(); // Fetch filtered data
};

// Show alert details
const showAlertDetails = (alert) => {
    router.push(`/alerts/${alert.alert_id}`);
};

const handleDismiss = () => {
    showModal.value = false;
    console.log("Alert dismissed");
};

const handleConfirm = () => {
    showModal.value = false;
    console.log("Alert confirmed");
};

// Set initial view mode based on screen size
const setInitialViewMode = () => {
    if (window.innerWidth < 640) {
        viewMode.value = "card";
    }
};

// Update onMounted to fetch devices
onMounted(() => {
    setInitialViewMode();

    window.addEventListener("resize", () => {
        if (window.innerWidth < 640 && viewMode.value === "list") {
            viewMode.value = "card";
        }
    });

    // Fetch devices for the filter dropdown
    fetchAvailableDevices();

    // Fetch initial alerts data
    fetchAlertsData();
});
</script>

<style scoped>
/* Base styles */
input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
}
input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
}

/* Improve tap target sizes on mobile */
@media (max-width: 640px) {
    button {
        min-height: 44px;
    }

    input,
    select {
        min-height: 44px;
    }

    .pagination-button {
        min-width: 44px;
    }
}

/* Add smooth transitions for view mode changes */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Optional loading animation styles */
@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.loading-pulse {
    animation: pulse 1.5s ease-in-out infinite;
}
</style>
