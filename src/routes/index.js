// Require third-party packages.
const express = require('express');

// Require internal packages.
const controller = require('../controllers/Pokemon');

// Constants and Variables.
const router = express.Router();

/*******************************************************************************
 *  GET Route(s)
 *******************************************************************************/

router.get('/pokemon', controller.GetPokemon);

/*******************************************************************************
 *  POST Route(s)
 *******************************************************************************/

router.post('/pokemon', controller.GetPokemon);

/*******************************************************************************
 *  Module Export(s)
 *******************************************************************************/

module.exports = router;