const axios = require('axios');
const { Pokemon, Type } = require('../db');

//Traigo los datos de la api
const getApiInfo = async() => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon';
        let pokemons = [];
        do {
            let info = await axios.get(url);
            let pokemonsApi = info.data;
            let auxPokemons = pokemonsApi.results.map(e => {
                return {
                    name: e.name,
                    url: e.url,
                }
            })
            pokemons.push(...auxPokemons);
            url = pokemonsApi.next;
        } while (url != null && pokemons.length < 40); //limito para que solo traiga 40.
    
        let pokemonsWithData = await Promise.all(pokemons.map(async e => {
            let pokemon = await axios.get(e.url);
            return { //stats sacadas del ultimo array
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map(e => {
                    return ({
                        name: e.type.name,
                    })
                }),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }
        }));

        return pokemonsWithData;
    }catch (e) {
        console.log(e);
    };
};

//Traigo pokemon por id o nombre
async function getPokemonDetail(arg){
    try{
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${arg}`);
        const data = await apiData.data;
        const pokemonData = {
            id: data.id,
            name: data.name,
            img: data.sprites.other.home.front_default,
            types: data.types.map(e => {
                return ({
                    name: e.type.name,
                })
            }),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
        };

        return pokemonData;
    }catch (e){
        console.log(e);
    };
};


/*const getDBInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};*/

/*
const getDBInfo = async () => {
    try {
    let dbData = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            types: [],
          },
        },
      });
  
      let pokemon = [];
      for (let i = 0; i < dbData.length; i++) {
        let tipos = dbData[i].types.map((tipo) => {
          return tipo.name;
        });
  
        let newPokemon = {
          id: dbData[i].id,
          name: dbData[i].name,
          img: dbData[i].img,
          hp: dbData[i].hp,
          strength: dbData[i].strength,
          defense: dbData[i].defense,
          speed: dbData[i].speed,
          height: dbData[i].height,
          weight: dbData[i].weight,
          types: tipos,
          createdInBd: true,
        };
        pokemon.push(newPokemon);
      }
  
      return pokemon;
    } catch (e) {
      console.log(e);
    }
};*/

//Traigo todos los pokemos de la base de datos
const getDBInfo = async () => {
    var pokemonsDB = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    return pokemonsDB;
}

//concateno los datos traidos de la api con los de la base de datos
const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const allPokemons = apiInfo.concat(dbInfo);

    return allPokemons;
}

module.exports = {
    getApiInfo,
    getPokemonDetail,
    getDBInfo,
    getAllPokemons
}