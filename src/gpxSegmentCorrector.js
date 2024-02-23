const { timestampOffset } = require('./timestampOffsetter');
const moment = require('moment-timezone');

function correctGpxSegments(data, timezone) {
    //console.log(`Correcting timestamps using timezone: ${timezone}`);
    
    data.forEach((seg, segIndex) => {
        seg.trkpt.forEach((pt, ptIndex) => {
            // Log the original time for each track point for visibility
            //console.log(`Original time for track segment ${segIndex + 1}, point ${ptIndex + 1}: ${pt.time[0]}`);

            // Interpret the timestamp as local time in the specified timezone
            let localTime = moment.tz(pt.time[0].replace('Z', ''), timezone);
        
            // Convert the local time back to UTC
            let correctedTime = timestampOffset(pt.time[0], timezone);
            pt.time[0] = correctedTime.toISOString();

            // Log the corrected time for verification
            //console.log(`Corrected time for track segment ${segIndex + 1}, point ${ptIndex + 1}: ${pt.time[0]}`);
        });
    });

    return data;
}

module.exports = { correctGpxSegments };
