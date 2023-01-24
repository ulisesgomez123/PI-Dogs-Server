const { Router } = require('express');
// Importar todos los routers;
 const dogsRouter = require('./dogs.js');
 const temperamentRouter = require('../routes/temperaments');

const router = Router();

// Configurar los routers
router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentRouter);


module.exports = router;
