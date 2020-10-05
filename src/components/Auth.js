import React, { useState, useEffect } from 'react'
import { API } from "../api-service";
import { useCookies } from "react-cookie";

function Auth() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("")
    const [ token, setToken ] = useCookies(['mr-token']);
    const [ isLoginView, setIsLoginView] = useState(true)
    const loginClick = () => {
        API.loginUser({ username, password})
        .then(resp => setToken('mr-token', resp.token))
        .catch( error => console.log(error))
    }
    const registerClick = () => {
        API.registerUser({ username, password})
        .then(() => loginClick())
        .catch( error => console.log(error))
    }
    useEffect(() => {
        if (token["mr-token"]) window.location.href = '/movies';
        console.log(token)
    }, [token])
    return (
        <div>
            <label>Username</label> <br/>
            <input id ="username" type="text" placeholder="username"
                onChange={ e=> setUsername(e.target.value)}
                value={username}/> <br/>
            <label>Password</label> <br/>
            <input id ="password" type="password" placeholder="password"
                onChange={ e=> setPassword(e.target.value)}
                value={password}/> <br/>
            { isLoginView ?
                <>
                    <button onClick={ loginClick }>Login</button>
                    <p>Don't have an account? <b onClick={() => setIsLoginView(false)}> Register Here! </b></p>
                </>
                :
                <>
                    <button onClick={ registerClick }>Register</button>
                    <p>Already have an account? <b onClick={() => setIsLoginView(true)}> Login Here! </b></p>
                </>
            }
        </div>
    )
}

export default Auth
