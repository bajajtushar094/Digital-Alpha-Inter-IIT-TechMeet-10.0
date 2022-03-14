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


export const getRecentFilings = async (dispatch) => {
    let data;
    await axios.get(
        ''
    )
    .then((response)=>{
        dispatch({
            type:'GET_RECENT_FILINGS',
            recentFilings:response.data
        });
        data = response.data
    })
    .catch((err)=>{
        console.log(err);
    })
    return data;
}

export const getAllCompanies = async (dispatch) => {
    let data;
    await axios.get(
        ''
    )
    .then((response)=>{
        dispatch({
            type:'GET_ALL_COMPANIES',
            allCompanies:response.data
        });
        data = response.data
    })
    .catch((err)=>{
        console.log(err);
    })
    return data;
}

export const getCurrentCompany = async (dispatch) => {
    let data;
    await axios.get(
        ''
    )
    .then((response)=>{
        dispatch({
            type:'GET_CURRENT_COMPANY',
            currentCompany:response.data
        });
        data = response.data
    })
    .catch((err)=>{
        console.log(err);
    })
    return data;
}

export const getRecentlyViwedCompanies = async (dispatch) => {
    let data;
    await axios.get(
        ''
    )
    .then((response)=>{
        dispatch({
            type:'GET_RECENTLY_VIEWED_COMPANIES',
            recentlyViwedCompanies:response.data
        });
        data = response.data
    })
    .catch((err)=>{
        console.log(err);
    })
    return data;
}
