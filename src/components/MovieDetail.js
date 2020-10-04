import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { API } from '../api-service'

function MovieDetail(props) {
    const mov = props.movie;

    const [ highlighted, setHighlighted ] = useState(-1)
    const updateRate = (mov_id, rate) => {
        API.updateRating(mov_id, rate).then( resp => props.updateMovie(resp))
    }
    const highlightRate = high => evt => {
        setHighlighted(high);
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
                                    onMouseLeave={highlightRate(0)}
                                    onClick={() => updateRate( mov.id, i)}
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