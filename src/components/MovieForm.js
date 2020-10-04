import React, { useState } from 'react'
import { API } from '../api-service'
function MovieForm(props) {
    const [ title, setTitle ] = useState(props.movie.title);
    const [ description, setDescription ] = useState(props.movie.description)

    const updateClick = () => {
        API.updateMovie( props.movie.id, {title, description} )
        .then( resp => resp.json())
        .then( resp => props.updateMovie(resp))
        .catch( error => console.log(error))
    }
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
            <button onClick={ updateClick }>Update</button>
        </div>
        : null
    )
}

export default MovieForm
