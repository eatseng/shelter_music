const https = require('https')
const Promise = require('promise')

const apiCall = module.exports = (endPointOptions, payload) => {

  return new Promise ((resolve, reject) => {

    const data = JSON.stringify(payload);

    const req = https.request(endPointOptions, (resp) => {
      let str;

      resp.setEncoding('utf8');
      resp.on('data', (chunk) => {
        str += chunk;
      });

      resp.on('end', () => {
        resolve({
          statusCode: resp.statusCode,
          content: JSON.parse(str.slice(str.indexOf('{'))),
        });
      });
    });

    req.on('error', (e) => {
      reject({
        statusCode: 520,
        content: e
      })
    });

    // write data to request body
    req.write(data);
    req.end();
  });
};