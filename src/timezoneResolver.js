const { find } = require('geo-tz');

async function resolve({ lat, lon }) {
    // Find the timezone based on lat/lon using geo-tz
    const timeZones = find(lat, lon);
    // Assuming the first timezone is the correct one
    // In rare cases, there might be multiple valid timezones. Consider your use case.
    const timeZone = timeZones[0]; 
    return timeZone || 'UTC'; // Fallback to 'UTC' if no timezone found
}

module.exports = { resolve };
