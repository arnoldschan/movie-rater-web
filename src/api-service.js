const TOKEN = "12f17f8d7daa4f40a6155138e9894bfecccb1598"
const BASE_URL = "http://localhost:8000"
export class API {
    static loginUser(body){
        return fetch(`${BASE_URL}/auth/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify( body )
        }).then ( resp => resp.json())
    }

    static updateMovie(mov_id, body){
        return fetch(`${BASE_URL}/api/movies/${mov_id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
        },
            body: JSON.stringify( body )
        })
    }

    static createMovie(body){
        return fetch(`${BASE_URL}/api/movies/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
        },
            body: JSON.stringify( body )
        })
    }

    static updateRating(mov_id, rate) {
        return fetch(`${BASE_URL}/api/movies/${mov_id}/rate_movie/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`,
        },
            body: JSON.stringify( {stars: rate + 1} )
        })
        .then( resp => resp.json())
        .then( resp => this.getDetails(mov_id))
        .catch( error => console.log(error))
        }

    static getDetails(mov_id) {
        return fetch(`${BASE_URL}/api/movies/${mov_id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`,
                }})
                .then( resp => resp.json())
                .catch( error => console.log(error))
        }

    static deleteMovie(mov_id) {
        return fetch(`${BASE_URL}/api/movies/${mov_id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`,
                }})
                .catch( error => console.log(error))
        }
}