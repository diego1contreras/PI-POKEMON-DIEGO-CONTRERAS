import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { getPokemons } from "../../Redux/actions";
import Loading from "../Loading/Loading";
import Nav from "../Nav/Nav";
import Filters from "../Filters/Filters";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);

    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const [setOrder] = useState(''); //Modifica el estado local y ayuda al renderizado
    const indexLast = currentPage * pokemonsPerPage;
    const indexFirst = indexLast - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexFirst, indexLast);

    const pagination = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    return(
        <div>
            { allPokemons.length > 0 ?
            <div>
                <Nav/>
                <div className={styles.home}>
                    <div className={styles.filters}>
                        <Filters setCurrentPage={setCurrentPage} setOrder={setOrder}/>
                        <button className={styles.btn} onClick={e => {handleClick(e)}}>Limpiar Filtros</button>
                    </div>

                    <div>
                        <div>
                            <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} pagination={pagination} />
                        </div>

                        <div className={styles.cards}>
                            {
                                currentPokemons?.map((e, k) => {
                                    return(
                                        <div className={styles.card} key={k}>
                                            <Card 
                                                key={e.id}
                                                id={e.id}
                                                name={e.name}
                                                image={e.img}
                                                types={e.types}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div> : 
                <Loading/>}
        </div>
    )
}