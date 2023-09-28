const express = require('express');
const { Pokemons, Type } = require('../db');
const { getAllPokemons }= require('./functions');

const router = express.Router();

router.get('/', async (req, res) => {
    const {name} = req.query;
    const allPokemons = await getAllPokemons();

    try{
        if(name){  //si recibe name filtra 
            let pokemon = allPokemons.filter(e => e.name.toLowerCase() === name.toLowerCase());
            
            pokemon.length  
            ? res.status(200).send(pokemon)
            : res.status(404).send("Pokemon not found");
        } else { // si no recibe name entrega todos los pokemons
            let pokemons = await getAllPokemons();
            return res.status(200).send(pokemons);
        }
    }catch (e){
        console.log(e);
    }
});

//metodo get por id
router.get('/:id', async (req, res) => { 
    const {id} = req.params;
    const allPokemons = await getAllPokemons();
    try{
        if(id){
            let pokemonId = allPokemons.filter(e => e.id == id);
            pokemonId.length
            ? res.status(200).send(pokemonId)
            : res.status(404).send("Pokemon not found");
        }
    } catch (e){
        console.log(e);
    }
});

//metodo post
router.post('/', async(req, res) => {
    const {name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    try{
        if(name){
            const allPokemons = await getAllPokemons();
            const isPokemon = allPokemons.find(e => e.name === name.toLowerCase());

            if(!isPokemon){
                const p = await Pokemons.create({
                    name,
                    hp, 
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    img,
                });

                const typeDB = await Type.findAll({
                    where: {
                        name: types,
                    }
                });

                p.addType(typeDB);
                return res.status(201).send(p);
            } else {
                return res.status(404).send("Pokemon name already exist!!!");
            }
        } else {
            return res.status(404).send("Pokemon name is obligatory");
        }
    }catch(e) {
        console.log(e);
    }
});

module.exports = router;