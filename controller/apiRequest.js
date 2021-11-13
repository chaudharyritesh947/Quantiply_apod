const request = require('request');
 
const callNasaAPODApi = (query, callback) => {
    let url = `https://api.nasa.gov/planetary/apod?api_key=PXqBrUGI372XPO3keCFbaM0g3FOA6exxNaeX1YHN&date=`+`${query.date}`;
    request(url, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

module.exports.callApi = callNasaAPODApi;