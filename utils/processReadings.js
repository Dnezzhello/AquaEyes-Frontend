// utils/processReadings.js
export function processReadings(readings) {
  console.log("Processing readings input:", readings);

  if (!readings || !Array.isArray(readings) || readings.length === 0) {
    console.warn("No readings to process or invalid data format");
    return {
      waterLevel: { current: [], predicted: [], latest: null },
      rainfall: { intensity: [], accumulated: [], latest: null },
      flowRate: { values: [], latest: null },
      soilMoisture: { values: [], latest: null },
      labels: [],
    };
  }

  // Group readings by sensor type
  const waterLevelReadings = readings.filter((r) => {
    const isWaterLevel =
      r.sensor_id?.startsWith("WL") || r.sensor_id?.startsWith("water_level");
    if (isWaterLevel) console.log("Found water level reading:", r);
    return isWaterLevel;
  });

  const rainfallReadings = readings.filter((r) => {
    const isRainfall =
      r.sensor_id?.startsWith("RG") || r.sensor_id?.startsWith("rainfall");
    if (isRainfall) console.log("Found rainfall reading:", r);
    return isRainfall;
  });

  const flowRateReadings = readings.filter((r) => {
    const isFlowRate =
      r.sensor_id?.startsWith("FL") || r.sensor_id?.startsWith("flow_rate");
    if (isFlowRate) console.log("Found flow rate reading:", r);
    return isFlowRate;
  });

  const soilMoistureReadings = readings.filter((r) => {
    const isSoilMoisture =
      r.sensor_id?.startsWith("SM") || r.sensor_id?.startsWith("soil_moisture");
    if (isSoilMoisture) console.log("Found soil moisture reading:", r);
    return isSoilMoisture;
  });

  console.log("Grouped readings:", {
    waterLevel: waterLevelReadings.length,
    rainfall: rainfallReadings.length,
    flowRate: flowRateReadings.length,
    soilMoisture: soilMoistureReadings.length,
  });

  // Sort all readings by timestamp
  const sortByTimestamp = (a, b) =>
    new Date(a.timestamp) - new Date(b.timestamp);

  waterLevelReadings.sort(sortByTimestamp);
  rainfallReadings.sort(sortByTimestamp);
  flowRateReadings.sort(sortByTimestamp);
  soilMoistureReadings.sort(sortByTimestamp);

  // Take last 7 readings or pad with nulls if less than 7
  const getLastReadings = (readingsArray, count = 7) => {
    const values = readingsArray.slice(-count).map((r) => parseFloat(r.value));
    // Pad with nulls if less than count
    while (values.length < count) {
      values.unshift(null);
    }
    return values;
  };

  // Process water level data
  const waterLevelValues = getLastReadings(waterLevelReadings);

  // For prediction (in a real app, this would come from your prediction model)
  const waterLevelPredicted =
    waterLevelValues.length > 0 &&
    waterLevelValues[waterLevelValues.length - 1] !== null
      ? [
          null,
          null,
          null,
          null,
          null,
          waterLevelValues[waterLevelValues.length - 1] * 1.05,
          waterLevelValues[waterLevelValues.length - 1] * 1.1,
        ]
      : [null, null, null, null, null, null, null];

  // Process rainfall data
  const rainfallIntensity = getLastReadings(rainfallReadings);

  // Fix: Safely check for accumulated property
  const rainfallAccumulated = rainfallReadings.slice(-7).map((r) => {
    // Check if accumulated exists, otherwise use value or default to 0
    if (r && typeof r.accumulated !== "undefined") {
      return r.accumulated;
    } else if (r && typeof r.value !== "undefined") {
      return parseFloat(r.value) || 0;
    } else {
      return 0;
    }
  });

  // Process flow rate and soil moisture
  const flowRateValues = getLastReadings(flowRateReadings);
  const soilMoistureValues = getLastReadings(soilMoistureReadings);

  // Create time labels
  const createTimeLabels = (readingsArray) => {
    return readingsArray.slice(-7).map((r) =>
      new Date(r.timestamp).toLocaleTimeString("lo-LA", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  };

  // Use the readings with the most data for labels
  const labels =
    waterLevelReadings.length >= 7
      ? createTimeLabels(waterLevelReadings)
      : rainfallReadings.length >= 7
        ? createTimeLabels(rainfallReadings)
        : flowRateReadings.length >= 7
          ? createTimeLabels(flowRateReadings)
          : soilMoistureReadings.length >= 7
            ? createTimeLabels(soilMoistureReadings)
            : Array(7).fill("--:--");

  return {
    waterLevel: {
      current: waterLevelValues,
      predicted: waterLevelPredicted,
      latest: waterLevelValues[waterLevelValues.length - 1] || null,
    },
    rainfall: {
      intensity: rainfallIntensity,
      accumulated: rainfallAccumulated,
      latest: rainfallIntensity[rainfallIntensity.length - 1] || null,
    },
    flowRate: {
      values: flowRateValues,
      latest: flowRateValues[flowRateValues.length - 1] || null,
    },
    soilMoisture: {
      values: soilMoistureValues,
      latest: soilMoistureValues[soilMoistureValues.length - 1] || null,
    },
    labels,
  };
}
