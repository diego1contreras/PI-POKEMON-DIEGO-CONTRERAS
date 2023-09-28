import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage(){
    return (
        <Fragment>        {/* prueba del componente fragment (agrupa elementos sin introducir elementos extra a nivel del DOM) */}
            <div className={styles.hero}> 
                <h1 className={styles.title}>PI POKEMON</h1>
                <Link to='/home'>
                    <button className={styles.bubblyButton}>COMENCEMOS</button>
                </Link>
                <video autoPlay muted loop className={styles.video_bg}>
                    <source src="../Pikachu-video.mp4" type="video/mp4"/> 
                </video>
            </div>
        </Fragment>
    )
}