const { read } = require('./src/gpxReader');
const { parse, build } = require('./src/gpxParser');
const { write } = require('./src/gpxWriter');

const { timezoneResolve } = require('./src/timezoneResolver');
const { timestampHoursDiffString } = require('./src/timestampOffsetter');
const { correctGpxSegments } = require('./src/gpxSegmentCorrector');
const path = require('path');

async function processGPX(filePath) {
  try {
      console.log("Processing GPX file");

      const originalFile = path.basename(filePath);
      const originalFilename = path.basename(filePath, '.gpx');
      const newFilename = `./gpx/${originalFilename}_corrected.gpx`;

      const xmlData = await read(filePath);
      const parsedData = await parse(xmlData);

      const trackCount = parsedData.gpx.trk.length
      console.log(`Found ${trackCount} Tracks`);

      // Zugriff auf die Tracks
      let tracks = parsedData.gpx.trk;

      // Durchlaufen Sie jeden Track
      for(let i = 0; i < tracks.length; i++) {
          
          // Get offset from first track segment
          const firstTrkSeg = tracks[i].trkseg[0];
          const firstTrkPt = firstTrkSeg.trkpt[0];

          const lat = firstTrkPt.$.lat;
          const lon = firstTrkPt.$.lon
          const time = firstTrkPt.time+"";

          const roundedLat = parseFloat(lat).toFixed(4);
          const roundedLon = parseFloat(lon).toFixed(4);

          let timezone = await timezoneResolve({ lat, lon });

          const hoursDiff = timestampHoursDiffString(time, timezone);

          console.log(`${originalFile} - Track ${i+1}/${trackCount} - Time: ${time}, Lat: ${roundedLat}, Lon: ${roundedLon} - ${timezone} Offsetting ${hoursDiff}`);

          // Adjust the timestamps
          tracks[i].trkseg = correctGpxSegments(tracks[i].trkseg, timezone);

      }
      const xmlOutput = build(parsedData);
      await write(xmlOutput, newFilename);
  } catch (error) {
      console.error('Error processing GPX file:', error);
  }
}

processGPX('./gpx/2xxx.gpx');
processGPX('./gpx/2009.gpx');
processGPX('./gpx/2010.gpx');
processGPX('./gpx/2011.gpx');
processGPX('./gpx/2012.gpx');
processGPX('./gpx/2013.gpx');
processGPX('./gpx/2014.gpx');
processGPX('./gpx/2015.gpx');
