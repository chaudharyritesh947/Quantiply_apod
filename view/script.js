const container = document.querySelector('.container')
const header = document.querySelector('.header')
const description = document.querySelector('.description');
const media = document.querySelector('.media');
const astroDate = document.querySelector('.astro_date');

const todayDate = new Date().toISOString().slice(0, 10);
astroDate.max = todayDate;
const loadingMessage = '<h1>Loading Please wait...</h1>'
async function boot() {
    let url = '/api/get?'+`date=${todayDate}`;

   const record = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        initializeContainer();
        return response.json();
    });
    setData(record)
}
container.innerHTML = loadingMessage;
boot()

function reset(){
    header.innerHTML = '';
    description.innerHTML = 'Explaination: ';
    media.innerHTML = '';
    astroDate.value = '';
}

function setData(record){
    reset();
    console.log(record)
    header.innerHTML = record.data.title;
    description.innerHTML += record.data.explanation
    astroDate.value = record.data.date;
    setMedia(record);
}

function setMedia(record){
    console.log(record)
    if(record.data.media_type === 'image'){
        const image = document.createElement('img');
        image.src = record.serverImage;
        media.appendChild(image);
    }
    else if(record.data.media_type === 'video'){
        const iframe = document.createElement('iframe');
        iframe.classList.add('media-frame');
        iframe.src = record.data.url;
        media.appendChild(iframe);
    }
    else{
        const unFormatedMedia = document.createElement('div');
        unFormatedMedia.innerHTML = '<h3> Unformated Media!!</h3>';
        unFormatedMedia.style.color = red;
        media.appendChild(unFormatedMedia);
    }
}

async function getAstroData(event){
    container.innerHTML = loadingMessage;
    let url = '/api/get?'+`date=${event.value}`;
    const record =  await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then((response) =>{
        initializeContainer();
        return response.json();
    });
    setData(record)
  
}

function initializeContainer(){
    container.innerHTML = '';
    container.appendChild(header);
    container.appendChild(astroDate);
    container.appendChild(media);
    container.appendChild(description);
}