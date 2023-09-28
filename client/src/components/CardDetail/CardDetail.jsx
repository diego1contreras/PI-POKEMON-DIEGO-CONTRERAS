import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, cleanDetail, cleanPokemons } from "../../Redux/actions";
import noImage from "../../assets/noImage.png";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import styles from "./CardDetail.module.css";

export default function CardDetail(props){
    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemonsDetails);

    useEffect(() => {
        dispatch(getDetails(props.match.params.id))
        return () => {
            dispatch(cleanDetail(dispatch), cleanPokemons(dispatch));
        }
    }, [dispatch, props.match.params.id]);

    return (
        <div>
            {
                pokemon.length > 0 ?
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h2 className={styles.h2}>{pokemon[0].name.charAt(0).toUpperCase() + pokemon[0].name.slice(1)}:</h2>
                        <p className={styles.p}>#{pokemon[0].id}</p>
                        <img className={styles.img} src={pokemon[0].img ? pokemon[0].img : noImage} alt="img not found" height="250px" width="250px"/>
                        <p className={styles.subtitulo}>Tipos:</p>
                        <div className={styles.types}>
                            <h3>{pokemon[0].types?.map((e, k) => {
                                return (
                                    <div className={styles.types} key={k}>
                                        <p className={styles.text}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</p>
                                    </div>
                                )
                            } )}</h3>
                        </div>
                        <p className={styles.subtitulo}>Habilidades:</p>
                        <div className={styles.types}>
                        <h5 className={styles.h5}>HP:  {pokemon[0].hp}</h5>
                        <h5 className={styles.h5}>Attack:  {pokemon[0].attack}</h5>
                        <h5 className={styles.h5}>Defense:  {pokemon[0].defense}</h5>
                        </div>
                        <div className={styles.types}>
                        <h5 className={styles.h5}>Speed:  {pokemon[0].speed}</h5>
                        <h5 className={styles.h5}>Height:  {pokemon[0].height}</h5>
                        <h5 className={styles.h5}>Weight:  {pokemon[0].weight}</h5>
                        </div>
                    </div>
                </div> : 
                <div>
                    <Loading/>
                </div>
            }

            <div>
                <Link to='/home'>
                    <button className={styles.btn}>Home</button>
                </Link>
            </div>

        </div>
    )
}