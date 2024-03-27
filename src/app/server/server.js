const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));

const protocol = 'https:';
const ApiUrl = '//gateway.marvel.com:443/v1/public/';
const ApiKey = 'ab30297f4880c92fff8d0a6fa9461ef1';  
const hash = 'e66f6d4113c62a340eccea2bbe11aef7'; 
let offset = 0;
let arrayHeroe = [];

function Heroe(id, name, description, modified, thumbnail_path, thumbnail_extension, resourceURI){
    this.id = id;
    this.name = name;
    this.description = description;
    this.modified = modified;
    this.thumbnail_path = thumbnail_path;
    this.thumbnail_extension = thumbnail_extension;
    this.resourceURI = resourceURI; 
}

async function getHeroes(offset){
    let url = `${protocol}${ApiUrl}characters?ts=1&apikey=${ApiKey}&hash=${hash}&offset=${offset}`;
    const response = await axios.get(url);
        response.data.data.results.forEach( heroe => {
            let hero = new Heroe(
                heroe.id,
                heroe.name,
                heroe.description,
                heroe.modified,
                heroe.thumbnail.path,
                heroe.thumbnail.extension,
                heroe.resourceURI
            )
            arrayHeroe.push(hero)
            
        });
}



app.get('/api/marvel', async (req, res) => {
  try {
    for(let i = 0; i < 79; i++){
        await getHeroes(offset)
        offset+= 20
    }
    res.json((arrayHeroe));
    console.log(offset);
  } catch (error) {
    console.error('Error fetching Marvel characters:', error);
    res.status(500).json({ message: 'Internal Server Error' }); 
  }
});

app.listen(3000, () => {
  console.log('Servidor Express escuchando en el puerto 3000');
});