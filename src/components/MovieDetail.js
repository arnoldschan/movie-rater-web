import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function MovieDetail(props) {
    const mov = props.movie;

    const [ highlighted, setHighlighted ] = useState(-1)
    
    const highlightRate = high => evt => {
        setHighlighted(high);
    }
    const rateClicked = rate => evt => {
        fetch(`http://djangoproject--arnoldschan.repl.co/api/movies/${mov.id}/rate_movie/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token 12f17f8d7daa4f40a6155138e9894bfecccb1598',
        },
            body: JSON.stringify( {stars: rate + 1} )
        })
        .then( resp => resp.json())
        .then( resp => getDetails())
        .catch( error => console.log(error))
        }
    
    const getDetails = () => {
        fetch(`http://djangoproject--arnoldschan.repl.co/api/movies/${mov.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 12f17f8d7daa4f40a6155138e9894bfecccb1598',
            }})
            .then( resp => resp.json())
            .then( resp => props.updateMovie(resp))
            .catch( error => console.log(error))
    }
    return (
        <React.Fragment>
            { mov ? (
                <div>
                    <h1>{ mov.title}</h1>
                    <p>{mov && mov.description}</p>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? "orange": ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? "orange": ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? "orange": ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? "orange": ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? "orange": ''}/>
                    ({mov.no_of_rating})
                    <div className="rate-container">
                        <h2>Rate it</h2>
                        { [...Array(5)].map( (e, i)=> {
                            return (
                                <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i -1 > 0 ? "purple": ''}
                                    onMouseEnter={highlightRate(i)}
                                    onMouseLeave={highlightRate(1)}
                                    onClick={rateClicked(i)}
                                />
                            )
                        })
                        }
                    </div>
                </div>
                ) : null }
        </React.Fragment>
    )
}

export default MovieDetail