const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function read(filePath) {
    try {
        const data = await readFile(filePath, { encoding: 'utf8' });
        return data;
    } catch (err) {
        console.error('Error reading GPX file:', err);
        throw err;
    }
}

module.exports = { read };
