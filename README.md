# GPX Timezone Corrector

The GPX Timezone Corrector is a Node.js script designed to correct timestamps in GPX files.
Many GPS Receivers and mobile track recorder apps save the GPS track timestamps by using local time, but adding a UTC 'Z' indicator at the end. When reusing this data, the timestamps get imported as UTC, resulting in an undesired time offset.

The script dynamically adjusts timestamps based on the geographical location, taking into account the correct timezone and daylight saving time adjustments.

## Example
```xml
<trk>
   <trkseg>
     <trkpt lat="43.291821023449302" lon="-0.369691969826818">
       <ele>180.92570000000001</ele>
       <time>2013-07-28T23:07:14Z</time>
     </trkpt>
```

For each track segment, the first trackpoint's timezone is determined. The example coordinates are in `Europe/Paris`.
The date `2013-07-28T23:07:14` (dropping the UTC indicator as it refers to local time) is assigned `Europe/Paris` timezone.
As it was DST in July 2013, it results in a 2h negative offset to UTC. The result is `2013-07-28T21:07:14Z`.
The -2h offset will be applied to all trackpoints in the segment.
For the next segment, the timezone and offset are determined separately.


## Prerequisites
- Node.js (version 12.x or higher recommended)
- NPM (Node Package Manager)

## Installation
Clone the repository, then install the necessary dependencies:

```bash
git clone https://github.com/thoughtgap/gpx-timestamp
cd gpx-timestamp
npm install
```

## Usage
To correct timestamps in a GPX file, run the script with the path to your GPX file as an argument:

```bash
node index.js path/to/your/file.gpx
```

The script will process the file and generate a corrected version named file_corrected.gpx in the same directory.
