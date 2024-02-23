# GPX Timezone Corrector

The GPX Timezone Corrector is a Node.js script designed to correct timestamps in GPX files.
Many GPS Receivers (like the Garmin Oregon) and mobile apps save the GPS track timestamps as UTC (indicated as ZULU Time with the Z at the end) but actually mean local time.

The script dynamically adjusts timestamps based on the geographical location, taking into account the correct timezone and daylight saving time adjustments.

## Prerequisites
- Node.js (version 12.x or higher recommended)
- NPM (Node Package Manager)

## Installation
Clone the repository, then install the necessary dependencies:

```bash
git clone https://your-repository-url-here.git
cd gpx-timezone-corrector
npm install
```

## Usage
To correct timestamps in a GPX file, run the script with the path to your GPX file as an argument:

```bash
node index.js path/to/your/file.gpx
```

The script will process the file and generate a corrected version named file_corrected.gpx in the same directory.
