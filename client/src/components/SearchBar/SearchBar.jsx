import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPokemonsByName, cleanPokemons } from "../../Redux/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(cleanPokemons(dispatch));
        dispatch(getPokemonsByName(name));
        setName('');
    }

    return (
        <div className={styles.search}>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" onChange={e => {handleInputChange(e)}} value={name} className={styles.input} />
                <button type="submit" className={styles.btn}>Buscar</button>
            </form>
        </div>
    );
}