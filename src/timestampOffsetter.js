const moment = require("moment-timezone");

function timestampOffset(time, timezone) {
  if (!time) {
    return time;
  }
  try {
    // Interpret the timestamp as local time in the specified timezone
    let localTime = moment.tz(time.replace("Z", ""), timezone);

    // Convert the local time back to UTC
    let correctedTime = localTime.clone().utc();
    //let correctedTimeISO = correctedTime.toISOString();

    return correctedTime;
  } catch (error) {
    console.log(`time: ${time}, timezone: ${timezone}`); // Debugging line
    throw error;
  }
  
}

function timestampHoursDiff(time, timezone) {
  if (!time) { return 0; }

  // Interpret the timestamp as local time in the specified timezone
  const originalTime = moment.tz(time, timezone);
  const correctedTime = timestampOffset(time, timezone);
  const diffHours = correctedTime.diff(originalTime, "hours");

  // Calculate the difference in hours
  return diffHours;
}

function timestampHoursDiffString(time, timezone) {
  const hoursDiff = timestampHoursDiff(time, timezone);
  return (hoursDiff >= 0 ? `+${hoursDiff}h` : `${hoursDiff}h`)
}

module.exports = { timestampOffset, timestampHoursDiff, timestampHoursDiffString };
