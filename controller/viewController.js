const request = require('./apiRequest');
const Apod = require('../model/apod');
const download = require('image-downloader');
const path = require('path');

const imageOptions = {
    url:'',
    dest: 'images'
  }

const apodRequest =  (req, res) =>{
    const query = { date: req.query.date };
    let imageUrl = '';
    Apod.find(query, (err, responce)=>{
        if(err){
            console.log(err);
            return;
        }
        if(responce.length == 0){
            request.callApi(query, async function(record){
                const result = await Apod.create(record)
               
                //Download and saving image on server
                imageOptions.url =  result.url;
                await download.image(imageOptions).then( ({filename})=>{
                }).catch((err)=>console.log(err));
                imageUrl = path.join('/images',result.url.split('/').pop());
                res.json({
                     status: 'okay', 
                     data: result, 
                     serverImage: imageUrl
                    });
            });
        }
        else{
            imageUrl = path.join('/images',responce[0].url.split('/').pop());
             res.json({ 
              status: 'okay',
              data: responce[0], 
              serverImage: imageUrl
            });
        }
    });
 }

module.exports = {
    apodRequest
}