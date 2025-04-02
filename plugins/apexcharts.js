// apex chart plugin
export default defineNuxtPlugin((nuxtApp) => {
  // Only run on client-side
  if (process.client) {
    // Import dynamically on client side only
    import("vue3-apexcharts").then((module) => {
      const VueApexCharts = module.default;
      nuxtApp.vueApp.use(VueApexCharts);
    });
  }
});
