//line chart
<template>
    <div ref="chartContainer" class="w-full min-h-[250px]"></div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";

const props = defineProps({
    currentLevels: {
        type: Array,
        default: () => [],
    },
    predictedLevels: {
        type: Array,
        default: () => [],
    },
    bankHeight: {
        type: Number,
        default: 14,
    },
    labels: {
        type: Array,
        default: () => [
            "ຈັນ",
            "ອັງຄານ",
            "ພຸດ",
            "ພະຫັດ",
            "ສຸກ",
            "ເສົາ",
            "ອາທິດ",
        ],
    },
    height: {
        type: [Number, String],
        default: "100%",
    },
});

const chartContainer = ref(null);
let chart = null;
let resizeTimeout = null;

// Series data for the chart
const series = computed(() => [
    {
        name: "ລະດັບນ້ຳ",
        data: props.currentLevels,
    },
    {
        name: "ລະດັບນ້ຳທີ່ຄາດຄະເນ",
        data: props.predictedLevels,
    },
]);

// Chart options
const chartOptions = computed(() => ({
    chart: {
        type: "line",
        fontFamily: "Noto Sans Lao, sans-serif",
        height: "100%",
        toolbar: {
            show: true,
            tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
            },
        },
        animations: {
            enabled: false,
            easing: "easeinout",
            speed: 800,
        },
        zoom: {
            enabled: false,
        },
        parentHeightOffset: 0,
        redrawOnWindowResize: true,
    },
    colors: ["#3B82F6", "#F97316"], // Blue for current, Orange for predicted
    stroke: {
        curve: "smooth",
        width: 2,
    },
    markers: {
        size: 4,
        hover: {
            size: 7,
        },
    },
    xaxis: {
        categories: props.labels,
        labels: {
            style: {
                fontSize: "12px",
                fontWeight: "bold",
            },
            hideOverlappingLabels: true,
        },
    },
    yaxis: {
        title: {
            text: "ລະດັບນ້ຳ (m)",
            style: {
                fontSize: "12px",
            },
        },
        min: props.currentLevels?.length
            ? Math.max(
                  0,
                  Math.min(
                      ...props.currentLevels.filter((val) => val !== null),
                  ) - 2,
              )
            : 0,
        max: props.currentLevels?.length
            ? Math.max(
                  props.bankHeight + 2,
                  Math.max(
                      ...props.currentLevels.filter((val) => val !== null),
                  ) + 2,
              )
            : 20,
        tickAmount: 6,
        labels: {
            formatter: (value) => {
                return value.toFixed(1);
            },
        },
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: (value) => {
                return value !== null ? `${value} m` : "N/A";
            },
        },
    },
    grid: {
        borderColor: "#e0e0e0",
        strokeDashArray: 5,
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
        padding: {
            right: 10,
            left: 10,
        },
    },
    legend: {
        position: "bottom",
        horizontalAlign: "center",
    },
    annotations: {
        yaxis: [
            {
                y: props.bankHeight,
                borderColor: "#10B981", // Green color for bank height
                label: {
                    borderColor: "#10B981",
                    style: {
                        color: "#10B981",
                        // background: "#10B981",
                        fontSize: "10px",
                        fontWeight: "bold",
                    },
                    text: "ຄວາມສູງຂອງຕາຝັ່ງ",
                    position: "center",
                },
            },
            {
                y: props.bankHeight * 0.8, // Warning level at 80% of bank height
                borderColor: "#FF3B30",
                strokeDashArray: 4,
                label: {
                    borderColor: "#FF3B30",
                    style: {
                        color: "#FF3B30",
                        //background: "#F97316",
                        fontSize: "10px",
                        fontWeight: "bold",
                    },
                    text: "ລະດັບເຝົ້າລະວັງ",
                    position: "center",
                },
            },
        ],
    },
    stroke: {
        curve: "smooth",
        width: [3, 2], // Thicker line for current
        dashArray: [0, 4], // Solid for current, dashed for predicted
    },
    responsive: [
        {
            breakpoint: 768, // Tablet
            options: {
                markers: {
                    size: 3,
                },
                xaxis: {
                    labels: {
                        style: {
                            fontSize: "11px",
                        },
                    },
                },
            },
        },
        {
            breakpoint: 480, // Mobile
            options: {
                markers: {
                    size: 2,
                },
                xaxis: {
                    labels: {
                        rotate: -45,
                        rotateAlways: true,
                        style: {
                            fontSize: "10px",
                        },
                    },
                },
                yaxis: {
                    title: {
                        text: "ລະດັບນ້ຳ (m)", // Keep the title text
                        style: {
                            fontSize: "10px",
                        },
                    },
                    labels: {
                        show: true, // Ensure labels are visible
                        formatter: (value) => {
                            return value.toFixed(1);
                        },
                    },
                },
                legend: {
                    position: "bottom",
                    fontSize: "10px",
                },
                annotations: {
                    yaxis: [
                        {
                            y: props.bankHeight,
                            borderColor: "#10B981",
                            label: {
                                text: "ຕາຝັ່ງ", // Shorter text for mobile
                                style: {
                                    fontSize: "10px",
                                },
                            },
                        },
                    ],
                },
            },
        },
    ],
}));

const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (chart) {
            chart.update();
        }
    }, 250);
};

onMounted(async () => {
    if (!chartContainer.value) return;

    try {
        // Use static import instead of dynamic import
        const ApexCharts = (await import("apexcharts")).default;

        // Clear previous chart if exists
        if (chart) {
            chart.destroy();
        }

        chart = new ApexCharts(chartContainer.value, {
            ...chartOptions.value,
            series: series.value,
        });

        await chart.render();
        window.addEventListener("resize", handleResize);
    } catch (error) {
        console.error("Error initializing chart:", error);
    }
});

// Add deep watcher for data changes
watch(
    () => props.currentLevels,
    (newVal) => {
        if (chart) {
            chart.updateSeries([
                {
                    name: "ລະດັບນ້ຳ",
                    data: newVal,
                },
            ]);
        }
    },
    { deep: true },
);

// Add cleanup for resize listener
onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    if (chart) {
        chart.destroy();
        chart = null;
    }
});
</script>
