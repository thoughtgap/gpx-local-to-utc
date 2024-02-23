const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const path = require('path');

async function write(data, filePath) {
    try {
        const filename = path.basename(filePath);
        await writeFile(filePath, data, { encoding: 'utf8' });
        console.log(`${filename} GPX file has been corrected and saved.`);
    } catch (err) {
        console.error('Error writing corrected GPX file:', err);
        throw err;
    }
}

module.exports = { write };
