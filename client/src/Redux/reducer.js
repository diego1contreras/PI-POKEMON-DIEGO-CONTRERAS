import {
    GET_POKEMONS,
    CLEAN_POKEMONS,
    GET_ALL_TYPES,
    GET_POKEMON_NAME,
    GET_DETAILS,
    CLEAN_DETAIL,
    POST_POKEMON,
    FILTER_CREATED,
    FILTER_TYPE,
    ORDER_NAME,
    ORDER_STR,
} from "../Redux/actions"; //importacion de los action-types

const initialState = { //estado inicial
    pokemons: [],
    allPokemons: [],
    types: [],
    pokemonsDetails: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POKEMONS: //get de los pokemons
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };
        
        case CLEAN_POKEMONS: 
            return {
                ...state,
                pokemons: action.payload
            };

        case GET_ALL_TYPES: //get de los types
            return {
                ...state,
                types: action.payload
            };

        case GET_POKEMON_NAME: // get de los pokemons por nombre
            return {
                ...state,
                pokemons: action.payload
            };

        case GET_DETAILS: //get de los details del pokemon (por ID)
            return {
                ...state,
                pokemonsDetails: action.payload
            };

        case CLEAN_DETAIL: //limpia los details
            return {
                ...state,
                pokemonsDetails: action.payload
            };

        case POST_POKEMON: //post de pokemon
            return {
                ...state,
            };

        case FILTER_CREATED: //filtro de creacion (API O BD)
            let aux = state.allPokemons;
            let createdFiltered;
            if(action.payload === 'created'){
                createdFiltered = aux.filter(e => e.createdInBd === true);
            } else if (action.payload === 'api'){
                createdFiltered = aux.filter(e => !e.createdInBd);
            } else {
                createdFiltered = aux;
            }
            return {
                ...state,
                pokemons: createdFiltered
            };

        case FILTER_TYPE: //filtro por types
            let aux2 = state.pokemons;
            let typeFiltered = action.payload === 'all' 
            ? aux2 
            : aux2.filter(e => e.types.some(e => e.name === action.payload));
            if(typeFiltered.length <= 0){
                typeFiltered = aux2;   
                alert('No se encuentran Pokemons del tipo indicado.');
            }; 
            return {
                ...state,
                pokemons: typeFiltered
            };
            
            case ORDER_NAME: //orden por nombre
                const sortedArr = action.payload === 'asc' ?
                    [...state.pokemons].sort(function (a, b) {
                        if (a.name > b.name) { return 1 }
                        if (b.name > a.name) { return -1 }
                        return 0;
                    }) :
                    [...state.pokemons].sort(function (a, b) {
                        if (a.name > b.name) { return -1; }
                        if (b.name > a.name) { return 1; }
                        return 0;
                    })
                return {
                    ...state,
                    pokemons: sortedArr
                }

            case ORDER_STR: //quedo el nombre como 'strenght' pero el orden es por attack
                const sortedStr = action.payload === 'asc' ?
                    [...state.pokemons].sort(function (a, b) {
                        if (a.attack > b.attack) { return 1 }
                        if (b.attack > a.attack) { return -1 }
                        return 0;
                    }) :
                    [...state.pokemons].sort(function (a, b) {
                        if (a.attack > b.attack) { return -1; }
                        if (b.attack > a.attack) { return 1; }
                        return 0;
                    })
                return {
                    ...state,
                    pokemons: sortedStr
                }

        default:
            return {
                ...state
            };
    }
};

export default rootReducer;