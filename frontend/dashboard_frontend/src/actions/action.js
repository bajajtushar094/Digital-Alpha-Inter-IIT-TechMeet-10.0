import axios from "axios";
import jwt_decode from 'jwt-decode'


const updateToken = async () => {
    try {
        const data = await axios.post(
            'http://localhost:8000/auth/token/refresh/',
            {'refresh':localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')).refresh:null}
        )
        if(data.status===200)
        {
            await localStorage.removeItem('authTokens')
            localStorage.setItem('authTokens',JSON.stringify(data.data))
        }
    }
    catch(error) {
        console.log(error);
    }
}


setInterval(() => {
    if(localStorage.getItem('authTokens'))
        updateToken()
}, 240000);