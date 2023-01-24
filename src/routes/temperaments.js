const { Router } = require('express');
const {
    API_KEY
  } = process.env;
const axios = require('axios');
const temperamentsRouter = Router();
const {temperamentsFunction} = require('../functions/functions');
const {Temperament} = require('../db')

temperamentsRouter.get('/', async (req, res) => {
  try {
    const response= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments = response.data.map(d => d.temperament);
    const temps = temperamentsFunction(temperaments)
    const found = await Temperament.findAll()
    if (!found[0]) {
      const tempsArray = await temps.map(t => {return {name: t}})
      const resFromDB = await Temperament.bulkCreate(tempsArray);
      res.send(resFromDB)
    }
    if (found[0]) {
     res.send(found)
   }
  } catch (error) {
   console.log(error)
  }
});

temperamentsRouter.delete('/delete', async (req, res) => {
    try {
       Temperament.destroy({
        truncate : true,
       });
    res.send('hola')
    } catch (error) {
     console.log(error)
    }
  });

module.exports = temperamentsRouter;