const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

async function write(data, filePath) {
    try {
        await writeFile(filePath, data, { encoding: 'utf8' });
        console.log('GPX file has been corrected and saved.');
    } catch (err) {
        console.error('Error writing corrected GPX file:', err);
        throw err;
    }
}

module.exports = { write };
