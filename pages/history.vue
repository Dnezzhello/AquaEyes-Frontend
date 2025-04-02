<template>
    <div class="p-4 md:p-6 lg:p-8 space-y-6 bg-gray-50 min-h-screen">
        <h1
            class="text-xl md:text-2xl font-semibold text-gray-800 bg-white p-3 rounded-lg shadow"
        >
            History Data
        </h1>

        <!-- Filters Section - Improved responsiveness -->
        <div class="bg-white p-4 rounded-lg shadow space-y-4">
            <h2 class="text-lg font-medium text-gray-700 mb-3">Filters</h2>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
            >
                <div>
                    <label
                        for="deviceId"
                        class="block text-sm font-medium text-gray-600 mb-1"
                        >Device ID</label
                    >
                    <select
                        id="deviceId"
                        v-model="filters.deviceId"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">All Devices</option>
                        <option value="dev-001">Device 001</option>
                        <option value="dev-002">Device 002</option>
                        <option value="dev-003">Device 003</option>
                    </select>
                </div>

                <div>
                    <label
                        for="sensorId"
                        class="block text-sm font-medium text-gray-600 mb-1"
                        >Sensor ID</label
                    >
                    <input
                        type="text"
                        id="sensorId"
                        v-model="filters.sensorId"
                        placeholder="Enter Sensor ID"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label
                        for="startDate"
                        class="block text-sm font-medium text-gray-600 mb-1"
                        >Start Date</label
                    >
                    <input
                        type="date"
                        id="startDate"
                        v-model="filters.startDate"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        for="endDate"
                        class="block text-sm font-medium text-gray-600 mb-1"
                        >End Date</label
                    >
                    <input
                        type="date"
                        id="endDate"
                        v-model="filters.endDate"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <!-- Filter button made more responsive -->
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
                        {{ loading ? "Loading..." : "ດຶງຂໍ້ມູນ" }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Table/Card View Section with Responsive Toggle -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <!-- Toggle for different display modes -->
            <div
                class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-end"
            >
                <div class="flex space-x-2">
                    <button
                        @click="viewMode = 'table'"
                        :class="[
                            'px-3 py-1 text-sm font-medium rounded',
                            viewMode === 'table'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                        ]"
                    >
                        Table
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
                        Cards
                    </button>
                </div>
            </div>

            <!-- Table View - Responsive with horizontal scroll -->
            <div v-if="viewMode === 'table'" class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                        <tr>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Reading ID
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Device ID
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Sensor ID
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Timestamp
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Value
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Unit
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Header 1
                            </th>
                            <th
                                scope="col"
                                class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Header 2
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-if="loading && paginatedData.length === 0">
                            <td
                                :colspan="8"
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
                        <tr v-else-if="!loading && paginatedData.length === 0">
                            <td
                                :colspan="8"
                                class="px-4 py-4 text-center text-gray-500"
                            >
                                No data available for the selected filters.
                            </td>
                        </tr>
                        <tr
                            v-else
                            v-for="item in paginatedData"
                            :key="item.readingId"
                            class="hover:bg-gray-50 transition-colors duration-150"
                        >
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-700"
                            >
                                {{ item.readingId }}
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-700"
                            >
                                {{ item.deviceId }}
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-700"
                            >
                                {{ item.sensorId }}
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                {{ formatTimestamp(item.timestamp) }}
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                                {{ item.value }}
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                {{ item.unit }}
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                {{ item.header1 }}
                            </td>
                            <td
                                class="px-4 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                                {{ item.header2 }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Card View for Mobile - Alternative to table -->
            <div
                v-else-if="viewMode === 'card'"
                class="divide-y divide-gray-200"
            >
                <div
                    v-if="loading && paginatedData.length === 0"
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
                    v-else-if="!loading && paginatedData.length === 0"
                    class="p-8 text-center text-gray-500"
                >
                    No data available for the selected filters.
                </div>
                <div
                    v-else
                    v-for="item in paginatedData"
                    :key="item.readingId"
                    class="p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p
                                class="text-xs font-medium text-gray-500 uppercase"
                            >
                                Reading ID
                            </p>
                            <p class="mt-1 text-sm text-gray-700">
                                {{ item.readingId }}
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-xs font-medium text-gray-500 uppercase"
                            >
                                Device ID
                            </p>
                            <p class="mt-1 text-sm text-gray-700">
                                {{ item.deviceId }}
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-xs font-medium text-gray-500 uppercase"
                            >
                                Sensor ID
                            </p>
                            <p class="mt-1 text-sm text-gray-700">
                                {{ item.sensorId }}
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-xs font-medium text-gray-500 uppercase"
                            >
                                Timestamp
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                                {{ formatTimestamp(item.timestamp) }}
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-xs font-medium text-gray-500 uppercase"
                            >
                                Value
                            </p>
                            <p class="mt-1 text-sm font-medium text-gray-900">
                                {{ item.value }}
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-xs font-medium text-gray-500 uppercase"
                            >
                                Unit
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                                {{ item.unit }}
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-xs font-medium text-gray-500 uppercase"
                            >
                                Header 1
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                                {{ item.header1 }}
                            </p>
                        </div>
                        <div>
                            <p
                                class="text-xs font-medium text-gray-500 uppercase"
                            >
                                Header 2
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                                {{ item.header2 }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination Controls - Improved for better mobile experience -->
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
                        Previous
                    </button>
                    <span class="text-sm text-gray-700">
                        {{ currentPage }} / {{ totalPages }}
                    </span>
                    <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>

                <!-- Desktop Pagination -->
                <div
                    class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                >
                    <div>
                        <p class="text-sm text-gray-700">
                            Showing
                            <span class="font-medium">{{
                                (currentPage - 1) * itemsPerPage + 1
                            }}</span>
                            to
                            <span class="font-medium">{{
                                Math.min(currentPage * itemsPerPage, totalItems)
                            }}</span>
                            of
                            <span class="font-medium">{{ totalItems }}</span>
                            results
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
                                <svg
                                    class="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
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
                                <svg
                                    class="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
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

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";

// --- Interfaces (Optional but recommended) ---
interface HistoryItem {
    readingId: string | number;
    deviceId: string;
    sensorId: string;
    timestamp: string | number | Date; // Adjust based on your actual data type
    value: number | string;
    unit: string;
    header1: string; // Example additional data
    header2: string; // Example additional data
}

interface Filters {
    deviceId: string;
    sensorId: string;
    startDate: string; // Format YYYY-MM-DD
    endDate: string; // Format YYYY-MM-DD
}

// --- Reactive State ---
const loading = ref(false);
const error = ref<string | null>(null);
const filters = reactive<Filters>({
    deviceId: "",
    sensorId: "",
    startDate: "",
    endDate: "",
});

const viewMode = ref("table"); // Added view mode toggle: 'table' or 'card'
const rawData = ref<HistoryItem[]>([]); // Holds all fetched data
const currentPage = ref(1);
const itemsPerPage = ref(10); // How many items to show per page

// --- Mock Data Fetching ---
// Replace this with your actual API call using useFetch or $fetch
const fetchData = async () => {
    loading.value = true;
    error.value = null;
    console.log("Fetching data with filters:", JSON.stringify(filters)); // Log filters being used
    // Reset to first page whenever fetching new data based on filters
    currentPage.value = 1; // Reset page number here

    try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // *** MOCK DATA GENERATION - REPLACE WITH ACTUAL API CALL ***
        const mockItems: HistoryItem[] = [];
        const numItems = Math.floor(Math.random() * 50) + 5; // Generate 5 to 54 items

        for (let i = 1; i <= numItems; i++) {
            const deviceSuffix = String(Math.ceil(Math.random() * 3)).padStart(
                3,
                "0",
            );
            const sensorSuffix = String(Math.ceil(Math.random() * 5)).padStart(
                3,
                "0",
            );
            const matchesDeviceId =
                !filters.deviceId || filters.deviceId === `dev-${deviceSuffix}`;
            const matchesSensorId =
                !filters.sensorId ||
                `sensor-${sensorSuffix}`.includes(filters.sensorId);
            // Basic date filtering (replace with proper date comparison)
            const matchesStartDate = !filters.startDate; // Add logic here
            const matchesEndDate = !filters.endDate; // Add logic here

            if (
                matchesDeviceId &&
                matchesSensorId &&
                matchesStartDate &&
                matchesEndDate
            ) {
                mockItems.push({
                    readingId: `rid-${Date.now()}-${i}`,
                    deviceId: `dev-${deviceSuffix}`,
                    sensorId: `sensor-${sensorSuffix}`,
                    timestamp: new Date(
                        Date.now() - Math.random() * 1000 * 3600 * 24 * 7,
                    ), // Random timestamp in last 7 days
                    value: (Math.random() * 100).toFixed(2),
                    unit: "Unit " + String.fromCharCode(65 + (i % 3)), // A, B, C
                    header1: `Header A-${i}`,
                    header2: `Header B-${i}`,
                });
            }
        }
        rawData.value = mockItems.sort(
            (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime(),
        ); // Sort by newest first
        // *** END MOCK DATA ***
    } catch (err) {
        console.error("Error fetching history data:", err);
        error.value = "Failed to load history data. Please try again.";
        rawData.value = []; // Clear data on error
    } finally {
        loading.value = false;
    }
};

// --- Computed Properties ---
const totalItems = computed(() => rawData.value.length);
const totalPages = computed(() =>
    Math.ceil(totalItems.value / itemsPerPage.value),
);

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return rawData.value.slice(start, end);
});

// --- Pagination Logic ---
const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// --- Enhanced Pagination Display Logic ---
const paginationRange = computed(() => {
    const current = currentPage.value;
    const last = totalPages.value;
    const delta = 1; // How many pages to show around the current page
    const left = current - delta;
    const right = current + delta + 1;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | null = null;

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l !== null) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l > 2) {
                rangeWithDots.push("..."); // Represents skipped pages
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
});

// --- Event Handlers ---
const applyFilters = () => {
    currentPage.value = 1; // Go back to page 1 when applying new filters
    fetchData();
};

// --- Utility Functions ---
const formatTimestamp = (timestamp: string | number | Date): string => {
    if (!timestamp) return "N/A";
    try {
        // Adjust formatting as needed (e.g., to locale string)
        return new Date(timestamp).toLocaleString();
    } catch (e) {
        return String(timestamp); // Fallback
    }
};

// --- Detect screen size for initial view mode ---
const setInitialViewMode = () => {
    // Set card view by default on smaller screens
    if (window.innerWidth < 640) {
        // 640px is Tailwind's 'sm' breakpoint
        viewMode.value = "card";
    }
};

// --- Lifecycle Hooks ---
onMounted(() => {
    setInitialViewMode(); // Set appropriate view mode based on screen size
    fetchData(); // Fetch initial data when component loads

    // Optional: Add window resize listener to switch views automatically
    window.addEventListener("resize", () => {
        if (window.innerWidth < 640 && viewMode.value === "table") {
            viewMode.value = "card";
        }
    });
});
</script>
<style scoped>
/* Base styles for date inputs */
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

/* Enhance table readability on smaller screens */
@media (max-width: 768px) {
    table {
        font-size: 0.875rem;
    }

    th,
    td {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
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
