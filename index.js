const { read } = require('./src/gpxReader');
const { parse, build } = require('./src/gpxParser');
const { write } = require('./src/gpxWriter');

const { resolve } = require('./src/timezoneResolver');
const { correct } = require('./src/timestampCorrector');



async function processGPX(filePath) {
  try {
      console.log("Processing GPX file");
      const xmlData = await read(filePath);
      const parsedData = await parse(xmlData);

      // Assuming correct structure, here's how you might access the first trackpoint
      const firstTrkSeg = parsedData.gpx.trk[0].trkseg[0];
      console.log(firstTrkSeg);

      const firstTrkPt = firstTrkSeg.trkpt[0];
      console.log(firstTrkPt.$);

      const lat = firstTrkPt.$.lat;
      const lon = firstTrkPt.$.lon
      const time = firstTrkPt.time;

      // Debugging: log the lat and lon to ensure they're being accessed correctly
      console.log(`Time: ${time}, Lat: ${lat}, Lon: ${lon}`);

      let timezone = await resolve({ lat, lon });
      let correctedData = correct(parsedData, timezone);
      const xmlOutput = build(correctedData);
      await write(xmlOutput, './gpx/corrected_file.gpx');
  } catch (error) {
      console.error('Error processing GPX file:', error);
  }
}

processGPX('./gpx/2013.gpx');
