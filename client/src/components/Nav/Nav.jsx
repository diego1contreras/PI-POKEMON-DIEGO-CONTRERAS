import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
import logo from '../../assets/pokemonTitle.png';

export default function Nav(){
    return (
        <header>
            <nav className={styles.nav}>
                <div>
                    <Link to='/home'>
                        <img src={logo} alt="logo" className={styles.img} />
                    </Link>
                </div>

                <div>
                    <Link to='/create'>
                        <button className={styles.btn}>Crear Pokemon</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}