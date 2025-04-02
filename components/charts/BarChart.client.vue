// barchart
<template>
  <div ref="chartContainer" class="min-h-[250px]"></div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  seriesName: {
    type: String,
    default: "Data",
  },
  yAxisTitle: {
    type: String,
    default: "",
  },
  yAxisUnit: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#3B82F6", // Default blue color
  },
  columnWidth: {
    type: String,
    default: "50%",
  },
  height: {
    type: Number,
    default: 300,
  },
});

const chartContainer = ref(null);
let chart = null;

// Series data for the chart
const series = computed(() => [
  {
    name: props.seriesName,
    data: props.chartData,
  },
]);

// Chart options
const chartOptions = computed(() => ({
  chart: {
    type: "bar",
    fontFamily: "Noto Sans Lao, sans-serif",
    toolbar: {
      show: false,
    },
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
    },
    parentHeightOffset: 0,
    redrawOnWindowResize: true,
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      columnWidth: props.columnWidth,
      dataLabels: {
        position: "top",
      },
    },
  },
  colors: [props.color],
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: props.categories,
    position: "bottom",
    labels: {
      style: {
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: props.yAxisTitle,
      style: {
        fontSize: "12px",
      },
    },
    min: 0,
    max: props.chartData?.length ? Math.max(...props.chartData) * 1.2 : 100, // 20% headroom above max value
    tickAmount: 5,
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
  },
  tooltip: {
    y: {
      formatter: (value) => {
        return `${value} ${props.yAxisUnit}`;
      },
    },
  },
  responsive: [
    {
      breakpoint: 768, // Tablet breakpoint
      options: {
        plotOptions: {
          bar: {
            columnWidth: "60%",
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "11px",
            },
          },
        },
        yaxis: {
          title: {
            text: props.yAxisTitle, // Keep the title text
            style: {
              fontSize: "10px",
            },
          },
          labels: {
            show: true, // Ensure labels are visible
          },
        },
      },
    },
    {
      breakpoint: 480, // Mobile breakpoint
      options: {
        plotOptions: {
          bar: {
            columnWidth: "70%",
          },
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
            text: props.yAxisTitle, // Keep the title text
            style: {
              fontSize: "10px",
            },
          },
          labels: {
            show: true, // Ensure labels are visible
          },
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
    const ApexCharts = (await import("apexcharts")).default;

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

// Add cleanup for resize listener
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  if (chart) {
    chart.destroy();
    chart = null;
  }
});

// Update chart when data changes
watch(
  [
    () => props.chartData,
    () => props.categories,
    () => props.height,
    () => props.columnWidth,
  ],
  () => {
    if (chart) {
      chart.updateOptions({
        ...chartOptions.value,
      });
      chart.updateSeries(series.value);
    }
  },
  { deep: true }
);
</script>
