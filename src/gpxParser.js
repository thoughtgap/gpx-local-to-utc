const xml2js = require('xml2js');
const parser = new xml2js.Parser({
    //ignoreAttrs: true,
    //tagNameProcessors: [xml2js.processors.stripPrefix]
  });

const builder = new xml2js.Builder();

async function parse(xmlString) {
    return parser.parseStringPromise(xmlString);
}

function build(jsonObject) {
    return builder.buildObject(jsonObject);
}

module.exports = { parse, build };
