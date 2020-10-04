const TOKEN = "12f17f8d7daa4f40a6155138e9894bfecccb1598"
const BASE_URL = "http://localhost:8000"
export class API {
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
}