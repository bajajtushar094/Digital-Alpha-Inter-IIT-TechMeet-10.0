import axios from "axios";
import jwt_decode from 'jwt-decode'
import {config} from "../config";
import { turnOff, turnOn } from "../constants/spinnerActions";


export const loginUser = async (loginData,dispatch) => {
    try {
        const data = await axios.post(
            config().auth,
            loginData
        )
        if(data.status===200)
        {
            console.log(data);
            dispatch({
                type:'LOGIN_USER',
                user: jwt_decode(data.data.access)
            })
            localStorage.setItem('authTokens',JSON.stringify(data.data))
        }
        return data;
    }
    catch(error) {
        return {status:false};
    }
}


const updateToken = async () => {
    try {
        const data = await axios.post(
            'http://localhost:8000/api/auth/token/refresh/',
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
    try{
        const response = await axios.get(
            config().getRecentFilings
        );
    
        dispatch({
            type:'GET_RECENT_FILINGS',
            recentFilings:response.data
        });

        data = response.data;
    }
    catch(err){
        console.log("Error:", err);
    }

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

export const searchCompanies = async (query,dispatch) => {
    let data;
    await axios.post(
        `${config().search}/companies`,
        {'tickers':query}
    )
    .then((response)=>{
        data = response.data
    })
    .catch((err)=>{
        console.log(err);
    })
    return data;
}

export const searchFillings = async (query,dispatch) => {
    let data;
    const  arr = query.split('%20');
    await axios.post(
        `${config().search}/filings`,
        {'tickers':(arr.length>0)?arr[0]:'','form_type':(arr.length>1)?arr[1]:'','time_start':(arr.length>2)?arr[2]:'','time_end':(arr.length>3)?arr[3]:''}
    )
    .then((response)=>{
        data = response.data
    })
    .catch((err)=>{
        console.log(err);
    })
    return data;
}


export const simpleSearch = async (query,dispatch) => {
    let data;
    await axios.post(
        `${config().search}`,
        {'query':query}
    )
    .then((response)=>{
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


export const bookmarkCompany = async (company,dispatch) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
        }
    }
    try {
        const data = await axios.post(
            `${config().companies}/${company}`,
            company,
            config
        )
        return data;
    }
    catch(error) {
        return {status:false};
    }
}

export const getMetricsFromFiling = async (id, dispatch) => {
    let data;
    const configHeaders = {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
        }
    }
    try{
        const response = await axios.get(
            `${config().getMetricsFromFiling}/${id}`,
            configHeaders
        );

        data = response.data;
    }
    catch(err){
        console.log("Error:", err);
    }

    return data;
}