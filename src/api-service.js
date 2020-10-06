const TOKEN = "12f17f8d7daa4f40a6155138e9894bfecccb1598"
const BASE_URL = "http://localhost:8000"

export class API {
    constructor(token){
        this.token = token;
    }
    static loginUser(body){
        return fetch(`${BASE_URL}/auth/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify( body )
        }).then ( resp => resp.json())
    }
    static registerUser(body){
        return fetch(`${BASE_URL}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify( body )
            }).then ( resp => resp.json())
    }

    getMovies(){
        return fetch(`${BASE_URL}/api/movies/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.token}`,
            }
            })
            .then( resp => resp.json())
            .catch( error => console.log(error))
    }
    updateMovie(mov_id, body){
        return fetch(`${BASE_URL}/api/movies/${mov_id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.token}`,
        },
            body: JSON.stringify( body )
        })
    }

    createMovie(body){
        return fetch(`${BASE_URL}/api/movies/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.token}`,
        },
            body: JSON.stringify( body )
        })
    }

    updateRating(mov_id, rate) {
        return fetch(`${BASE_URL}/api/movies/${mov_id}/rate_movie/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.token}`,
        },
            body: JSON.stringify( {stars: rate + 1} )
        })
        .then( resp => resp.json())
        .then( resp => this.getDetails(mov_id))
        .catch( error => console.log(error))
        }

    getDetails(mov_id) {
        return fetch(`${BASE_URL}/api/movies/${mov_id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.token}`,
                }})
                .then( resp => resp.json())
                .catch( error => console.log(error))
        }

    deleteMovie(mov_id) {
        return fetch(`${BASE_URL}/api/movies/${mov_id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${this.token}`,
                }})
                .catch( error => console.log(error))
        }
}