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

          // Determine Track Name if available
          const trackName = tracks[i].name[0] || `Track ${i+1}`;
          
          // Determine UTC offset using the first track point
          const firstTrkSeg = tracks[i].trkseg[0];
          const firstTrkPt = firstTrkSeg.trkpt[0];

          const lat = firstTrkPt.$.lat;
          const lon = firstTrkPt.$.lon
          const time = firstTrkPt.time+"";

          let timezone = await timezoneResolve({ lat, lon });
          const hoursDiff = timestampHoursDiffString(time, timezone);


          // Console Output
          const trackCountOutput = `${(i+1).toString().padStart(2, ' ')}/${trackCount}`;
          const roundedLat = parseFloat(lat).toFixed(4).padStart(10, ' ');
          const roundedLon = parseFloat(lon).toFixed(4).padStart(10, ' ');
          const timezoneOutput = timezone.padEnd(25, ' ')

          console.log(`${originalFile} ${trackCountOutput}  ${time}  ${roundedLat},${roundedLon}  ${hoursDiff} ${timezoneOutput}  ${trackName}`);

          // Adjust the timestamps
          tracks[i].trkseg = correctGpxSegments(tracks[i].trkseg, timezone);

      }
      const xmlOutput = build(parsedData);
      await write(xmlOutput, newFilename);
  } catch (error) {
      console.error('Error processing GPX file:', error);
  }
}

// Check for parameter
if (process.argv.length < 3) {
  console.log('Please provide a path to a GPX file as parameter to process.');
  process.exit(1);
}

const filename = process.argv[2];
processGPX(`${filename}`);
