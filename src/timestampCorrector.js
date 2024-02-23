const moment = require('moment-timezone');

function correct(data, timezone) {
    console.log(`Correcting timestamps using timezone: ${timezone}`);
    
    data.gpx.trk.forEach((trk, trkIndex) => {
        trk.trkseg.forEach((seg, segIndex) => {
            seg.trkpt.forEach((pt, ptIndex) => {
                // Log the original time for each track point for visibility
                console.log(`Original time for track ${trkIndex + 1}, segment ${segIndex + 1}, point ${ptIndex + 1}: ${pt.time[0]}`);

                // Interpret the timestamp as local time in the specified timezone
                let localTime = moment.tz(pt.time[0].replace('Z', ''), timezone);
                
                // // Log if the current time is in DST
                // if (localTime.isDST()) {
                //     console.log(`Applying DST adjustment for: ${pt.time[0]}`);
                //     localTime.subtract(1, 'hour'); // Manually adjust for DST if necessary
                // }

                // Convert the local time back to UTC
                let correctedTime = localTime.utc();
                pt.time[0] = correctedTime.toISOString();

                // Log the corrected time for verification
                console.log(`Corrected time for track ${trkIndex + 1}, segment ${segIndex + 1}, point ${ptIndex + 1}: ${pt.time[0]}`);
            });
        });
    });

    return data;
}

module.exports = { correct };
