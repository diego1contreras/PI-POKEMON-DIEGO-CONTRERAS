import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCreated, getAllTypes, orderName, filterType, filterStr, getPokemons } from "../../Redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Filters.module.css";

export default function Filters({setCurrentPage, setOrder}) {
    const dispatch = useDispatch();
    const allTypes = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getAllTypes())
    }, [dispatch]);

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    };
    
    function handleOrderName(e){
        e.preventDefault();
        dispatch(orderName(e.target.value));
        setCurrentPage(1);
    };
    
    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterType(e.target.value)); 
        setCurrentPage(1);
    };
    
    function handleFilterStr(e){
        e.preventDefault();
        dispatch(filterStr(e.target.value));
        setCurrentPage(1);
    };

    return (
        <Fragment>
        <div className={styles.div}>
            <div>
                <SearchBar/>
            </div>
            
            <div>
                <h4 className={styles.h4}>Filtros</h4>
                <label className={styles.label}>Base de Datos - API</label>
                <select className={styles.select} onChange={e => {handleFilterCreated(e)}}>
                    <option value="all">Todos</option>
                    <option value="created">Base de Datos</option>
                    <option value="api">API</option>
                </select>

                <label className={styles.label}>Tipos</label>
                <select className={styles.select} onChange={e => {handleFilterType(e)}}>
                    <option value="all">Todos</option>
                    {
                        allTypes?.map(e => {
                            return (
                                <option key={e.id} value={e.name}>{e.name.toUpperCase()}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div>
                <h4 className={styles.h4}>Ordenar</h4>
                <label className={styles.label}>Por Nombre</label>
                <select className={styles.select} onChange={e => {handleOrderName(e)}}>
                    <option>-</option>
                    <option value="asc">Ascencente</option>
                    <option value="desc">Descendente</option>
                </select>

                <label className={styles.label}>Por Ataque</label>
                <select className={styles.select} onChange={e => {handleFilterStr(e)}}>
                    <option>-</option>
                    <option value="asc">Ascencente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
        </div>
    </Fragment>
    )
}