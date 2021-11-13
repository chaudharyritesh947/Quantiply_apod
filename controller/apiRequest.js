const https = require('https');
const todayDate = new Date().toISOString().slice(0, 10);

const callNasaAPODApi = (query, callback) => {
    let url = `https://api.nasa.gov/planetary/apod?api_key=PXqBrUGI372XPO3keCFbaM0g3FOA6exxNaeX1YHN&date=`+`${query.date}`;
    https.get(url, (res) =>{
        let data = '';
        res.on('data', (chunk)=>{
            data +=chunk;
        });

        res.on('end' , ()=>{
            return callback(data)
        });
    }).on('error',(err)=>{
        console.log("error"+err.message)
    });
}

module.exports.callApi = callNasaAPODApi;