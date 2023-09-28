import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cleanPokemons, getAllTypes, postPokemon } from "../../Redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Form.module.css";


export default function Form(){
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
        img: ''
    });

    //VALIDACIONES
    let noEmpty = /\S+/;
    let validateName = /^[a-z]+$/i;
    let validateNum = /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;

    function validate(input){
        let errors = {};

        //El método test ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada. Devuelve true o false.
        if(!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3){ 
            errors.name = "Nombre requerido. Sólo cadena de más de dos caracteres y sin números";
        }

        if(!validateNum.test(input.hp) || parseInt(input.hp) < 1){
            errors.hp = "Número requerido. Más alto que uno";
        }

        if(!validateNum.test(input.attack) || parseInt(input.attack) < 1){
            errors.attack = "Número requerido. Más alto que uno";
        }

        if(!validateNum.test(input.defense) || parseInt(input.defense) < 1){
            errors.defense = "Número requerido. Más alto que uno";
        }

        if(!validateNum.test(input.speed) || parseInt(input.speed) < 1){
            errors.speed = "Número requerido. Más alto que uno";
        }

        if(!validateNum.test(input.height) || parseInt(input.height) < 1){
            errors.height = "Número requerido. Más alto que uno";
        }

        if(!validateNum.test(input.weight) || parseInt(input.weight) < 1){
            errors.weight = "Número requerido. Más alto que uno";
        }

        if(!validateUrl.test(input.img)){
            errors.img = "URL requerida";
        }

        return errors;
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        if(input.types.length < 2){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
            e.target.value = 'Select type';
        } else {
            alert('Solo se permite un maximo de 2 tipos por Pokemon');
        }
    }

    function handleSubmit(e){
        e.preventDefault();

        if(!errors.name && !errors.hp && !errors.attack && !errors.defense && !errors.speed && !errors.height && !errors.weight && !errors.img){
            dispatch(postPokemon(input));
            console.log(input);
            alert("Good job!", "Pokemon created successfuly!", "success");
            setInput({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                types: [],
                img: '',
            });

            dispatch(cleanPokemons(dispatch));
            history.push('/home');
        }else{
            alert('Error');
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            types: input.types.filter(type => type !== e)
        })
    }

    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch]);

    return(
        <div className={styles.container}>
            <Link to='/home'>
                <button className={styles.btn}>Regresar</button>
            </Link>

            <form className={styles.form} onSubmit={e => {handleSubmit(e)}}>
                <h2 className={styles.h2}>Crea un Pokemon!</h2>
                <div className={styles.div}>
                    <div className={styles.divito}>
                        <label className={styles.label}>Name:</label>
                        <input type="text" name="name" value={input.name} className={styles.input} onChange={e => {handleChange(e)}} placeholder="Nombre..."/>
                        <p className={styles.p}>{errors.name}</p>
                        
                        <label className={styles.label}>HP:</label>
                        <input type="number" name="hp" value={input.hp} className={styles.input} onChange={e => {handleChange(e)}} placeholder="Vida..."/>
                        <p className={styles.p}>{errors.hp}</p>

                        <label className={styles.label}>Attack:</label>
                        <input type="number" name="attack" value={input.attack} className={styles.input} onChange={e => {handleChange(e)}} placeholder="Ataque..."/>
                        <p className={styles.p}>{errors.attack}</p>

                        <label className={styles.label}>Defense:</label>
                        <input type="number" name="defense" value={input.defense} className={styles.input} onChange={e => {handleChange(e)}} placeholder="Defensa..."/>
                        <p className={styles.p}>{errors.defense}</p>
                    </div>

                    <div className={styles.divito}>
                        <label className={styles.label}>Speed:</label>
                        <input type="number" name="speed" value={input.speed} className={styles.input} onChange={e => {handleChange(e)}} placeholder="Velocidad..."/>
                        <p className={styles.p}>{errors.speed}</p>

                        <label className={styles.label}>Height:</label>
                        <input type="number" name="height" value={input.height} className={styles.input} onChange={e => {handleChange(e)}} placeholder="Altura..."/>
                        <p className={styles.p}>{errors.height}</p>

                        <label className={styles.label}>Weight:</label>
                        <input type="number" name="weight" value={input.weight} className={styles.input} onChange={e => {handleChange(e)}} placeholder="Peso..."/>
                        <p className={styles.p}>{errors.weight}</p>

                        <label className={styles.label}>Image:</label>
                        <input type="text" name="img" value={input.img} className={styles.input} onChange={e => {handleChange(e)}} placeholder="URL imagen..."/>
                        <p className={styles.p}>{errors.img}</p>
                    </div>
                </div>

                <div>
                    <label className={styles.label}>Selecciona hasta 2 tipos:</label>
                    <select className={styles.select} onChange={e => {handleSelect(e)}}>

                        <option>-</option>
                        {
                            types?.map(e => {
                                return(
                                    <option key={e.id} value={e.name}>{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</option>
                                )
                            })
                        }
                    </select>

                    {
                        input.types.map(e => {
                            return (
                                <div className={styles.typesSelect} key={e}>
                                        <p className={styles.pTypes}>{e.charAt(0).toUpperCase() + e.slice(1)}</p>
                                        <button className={styles.btnDelete} onClick={() => {handleDelete(e)}}>X</button>
                                </div>
                            )
                        })
                    }
                </div>

                <button className={styles.btnCreate} type="submit">Crear!</button>
            </form>
        </div>
    )
}