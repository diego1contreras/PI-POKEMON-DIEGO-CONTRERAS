import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({pokemonsPerPage, allPokemons, pagination}){
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++){ //for para saber cuantas paginas va a haber
        pageNumbers.push(i);     
    }

    return (
        <nav>
            <ul className={styles.list}>
                {
                    pageNumbers?.map(number => (
                        <li className={styles.items} key={number}>
                            {/* eslint-disable jsx-a11y/anchor-is-valid */}
                            <a className={styles.a} onClick={() => pagination(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}