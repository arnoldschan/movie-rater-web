import React, { useState, useEffect } from 'react'
import { API } from '../api-service'
import { useCookies } from "react-cookie";

function MovieForm(props) {
    const [ title, setTitle ] = useState(props.movie.title);
    const [ description, setDescription ] = useState(props.movie.description)
    const [ token ] = useCookies(['mr-token']);

    const updateClick = () => {
        new API(token['mr-token']).updateMovie( props.movie.id, {title, description} )
        .then( resp => resp.json())
        .then( resp => props.updateMovie(resp))
        .catch( error => console.log(error))
    }

    const createClick = () => {
        new API(token['mr-token']).createMovie( {title, description} )
        .then( resp => resp.json())
        .then( resp => props.createMovie(resp))
        .catch( error => console.log(error))
    }

    useEffect( () => {
        setTitle(props.movie.title);
        setDescription(props.movie.description);
    }, [props.movie])

    return (props.movie ? 
        <div className="movie-form">
        <label>Title</label> <br/>
        <input id ="title" type="text" placeholder={title}
            onChange={ e=> setTitle(e.target.value)}
            value={title}/> <br/>
        <label>description</label> <br/>
        <textarea id ="description" type="text" placeholder={description}
            onChange={ e=> setDescription(e.target.value)}
            value={description}/> <br/>
            {
                props.movie.id ? 
                <button onClick={ updateClick }>Update</button>
                :
                <button onClick={ createClick }>Create</button>
            }
        </div>
        : null
    )
}

export default MovieForm
