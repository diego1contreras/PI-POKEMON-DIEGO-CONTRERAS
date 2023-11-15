const express = require('express');
const { Pokemon, Type } = require('../db');
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
    console.log("Llegamos aca");
    try{
        if(name){
            const allPokemons = await getAllPokemons();
            const isPokemon = allPokemons.find(e => e.name === name.toLowerCase());

            if(!isPokemon){
                const p = await Pokemon.create({
                    name,
                    hp, 
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    img,
                }).catch( (e) => {return e });

                const typeDB = await Type.findAll({
                    where: {
                        name: types,
                    }
                });

                p.addType(typeDB);
                return res.status(201).send(p);
            } else {
                return res.status(404).send("El nombre del pokemon ya existe!!!");
            }
        } else {
            return res.status(404).send("El nombre del pokemon es obligatorio!!!");
        }
    }catch(e) {
        console.log(e);
    }
});

module.exports = router;