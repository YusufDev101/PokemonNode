
const express = require('express')
const fetch = require('node-fetch');

// Urls.
const PokemonUrl = require('../helpers/HttpEndpoints')

// Variables
let pokeObject = [];

const GetPokemon = async (req, res, next) => {
	try {

		const url = "https://pokeapi.co/api/v2/pokemon/";

		const pokemonName = req.body.name;

		if (!pokemonName) {
			return res.status(500).json({
				message: 'Pokemon not received',
				success: false
			})
		}

		console.log('url', url + pokemonName)

		await fetch(new URL(url))
			.then(res => res.json())
			.then(json => {
				pokeObject.push(json)
			})

		return res.status(200).json({
			data: pokeObject,
			message: 'Pokemon received',
			success: true
		})

	} catch (error) {
		return res.status(500).json({
			message: 'Pokemon not received',
			success: false
		})
	}
}

module.exports = {
	GetPokemon
}