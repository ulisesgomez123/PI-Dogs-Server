const { Router } = require('express');
const {
    API_KEY
  } = process.env;
const axios = require('axios');
const dogsRouter = Router();
const {queryFunction1, transformer, filteredTransformer, transformer2} = require('../functions/functions');
const {Breed} = require('../db')

dogsRouter.post('/creation', async (req, res) => {
  try {
   const {id,breed,height,weight,lifeSpan,temperament,arrayOfTempsId} = req.body;
   const dog = {id,name:breed,weight,height,life_Span:lifeSpan}
   const newDog= await Breed.create(dog);
   await newDog.addTemperaments(arrayOfTempsId)

   res.send({...dog,temperament: temperament.join(', ')})
  } catch (error) {
   console.log(error)
  }
});


dogsRouter.get('/:breedId', async (req, res) => {
  try {
   const {breedId} = req.params;
   var parsed=parseInt(breedId)
   const response= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);

    const dog = response.data.filter(d => d.id === parsed)
    const dogParsed = transformer2(dog)

   res.send(dogParsed)
  } catch (error) {
   console.log(error)
  }
});

dogsRouter.get('/search/:name', async (req,res) => {
  try {
    const {name} = req.params;
    if (name)  { 
      const capitalizedName= queryFunction1(name)
      const response= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
      const filteredDogs= response.data.filter( d => d.name.includes(name) || d.name.includes(capitalizedName));

      if (!filteredDogs[0]) {throw new Error('dog not found')}
      else {
        const dogList= filteredTransformer(filteredDogs)
        res.send(dogList)
      } 
    }
  } catch (error) {
    res.send(error.message)
  }
})


dogsRouter.get('/', async (req, res) => {
  try {
      const {name} = req.query;
  
      if (name)  { 
        const capitalizedName= queryFunction1(name)
        const response= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const filteredDogs= response.data.filter( d => d.name.includes(name) || d.name.includes(capitalizedName));
  
        if (!filteredDogs[0]) throw new Error('the entered word was not found') 

        else {
          const dogList= filteredTransformer(filteredDogs)
          return res.send(dogList)
        }  
      }

  const response= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const dogList= transformer(response)
   res.send(dogList)
  }
   catch (error) {
    res.send(error.message)
  }
});


module.exports = dogsRouter;