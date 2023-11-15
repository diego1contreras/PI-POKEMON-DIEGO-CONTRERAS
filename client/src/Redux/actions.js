import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const CLEAN_POKEMONS = 'CLEAN_POKEMONS';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const GET_DETAILS = 'GET_DETAILS';
export const CLEAN_DETAIL = 'CLEAN_DETAIL';
export const POST_POKEMON = 'POST_POKEMON';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';

export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_NAME = 'ORDER_NAME';
export const FILTER_TYPE = 'FILTER_TYPE';
export const ORDER_STR = 'ORDER_STR';

export const getPokemons = () => {
    return async (dispatch) => {
        try{
            let url = 'http://localhost:3001/pokemons';
            let json = await axios.get(url);
            return dispatch({
                type: GET_POKEMONS,
                payload: json.data
            });
        } catch (e) {
            console.log(e);
        }
    }
};

export const cleanPokemons = (dispatch) => {
    return dispatch({
        type: CLEAN_DETAIL,
        payload: []
    })
};

export const getAllTypes = () => {
    return async (dispatch) => {
        try{
            let url = 'http://localhost:3001/types';
            let json = await axios.get(url);
            return dispatch({
                type: GET_ALL_TYPES,
                payload: json.data
            })
        } catch(e) {
            console.log(e);
        }
    }
};

export const getPokemonsByName = (name) => {
    return async (dispatch) => {
        try{
            var  json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: GET_POKEMON_NAME,
                payload: json.data
            })
        } catch(e) {
            alert('Lo siento, no encontramos ese Pokemon');
            window.location.href = "http://localhost:3000/home";
            console.log(e);
        }
    }
};

export function getDetails(id){
    return function(dispatch){
        axios.get(`http://localhost:3001/pokemons/${id}`)
        .then(res => res.data)
        .then(res => dispatch({
            type: GET_DETAILS,
            payload: res
        }))
        .catch(e => console.log(e))
    }
};

export const cleanDetail = (dispatch) => {
    return dispatch({
        type: CLEAN_DETAIL,
        payload: []
    })
};

export const postPokemon = (payload) => {
    console.log(payload);
    return async () => {
        try{
            var newPokemon = await axios.post('http://localhost:3001/pokemons', payload);

            return newPokemon;
        } catch(e) {
            alert('Ese Pokemon ya existe!!!');
            console.log(e);
        }
    }
};

///FILTROS///
export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload: payload
    }
};

export function orderName(payload){
    return{
        type: ORDER_NAME,
        payload: payload
    }
};

export function filterType(payload){
    return{
        type: FILTER_TYPE,
        payload: payload
    }
};

export function filterStr(payload){
    return{
        type: ORDER_STR,
        payload: payload
    }
};



