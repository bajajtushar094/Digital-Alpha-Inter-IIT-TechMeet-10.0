import axios from "axios";
import jwt_decode from 'jwt-decode'
import { config } from "../config";
import { turnOff, turnOn } from "../constants/spinnerActions";

const configHeaders = localStorage.getItem('authTokens')?{
    headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
    }
}:""

export const loginUser = async (loginData, dispatch) => {
    try {
        const data = await axios.post(
            config().auth,
            loginData
        )
        if (data.status === 200) {
            // console.log(data);
            try {

                dispatch({
                    type: 'LOGIN_USER',
                    user: jwt_decode(data.data.access)
                })
                localStorage.setItem('authTokens', JSON.stringify(data.data))
            }
            catch (err) {
                console.log("error: ", err);
            }
        }
        return data;
    }
    catch (error) {
        return { status: false };
    }
}


const updateToken = async () => {
    try {
        const data = await axios.post(
            config().refresh,
            { 'refresh': localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).refresh : null }
        )
        if (data.status === 200) {
            await localStorage.removeItem('authTokens')
            localStorage.setItem('authTokens', JSON.stringify(data.data))
        }
    }
    catch (error) {
        console.log(error);
    }
}


setInterval(() => {
    if (localStorage.getItem('authTokens'))
        updateToken()
}, 240000);


export const getRecentFilings = async (dispatch) => {
    let data;
    try {
        const response = await axios.get(
            config().getRecentFilings
        );

        dispatch({
            type: 'GET_RECENT_FILINGS',
            recentFilings: response.data
        });

        data = response.data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const getAllCompanies = async (dispatch) => {
    let data;
    await axios.get(
        `${config().getAllCompanies}`,
        configHeaders
    )
        .then((response) => {
            dispatch({
                type: 'GET_ALL_COMPANIES',
                allCompanies: response.data
            });
            data = response.data
        })
        .catch((err) => {
            console.log(err);
        })
    return data;
}

export const searchCompanies = async (query, dispatch) => {
    let data;
    await axios.post(
        `${config().search}/companies`,
        { 'tickers': query }
    )
        .then((response) => {
            data = response.data
        })
        .catch((err) => {
            console.log(err);
        })
    return data;
}

// export const searchFillings = async (query, dispatch) => {
//     let data;
//     const arr = query.split('%20');
//     await axios.post(
//         `${config().search}/filings`,
//         { 'tickers': (arr.length > 0) ? arr[0] : '', 'form_type': (arr.length > 1) ? arr[1] : '', 'time_start': (arr.length > 2) ? arr[2] : '', 'time_end': (arr.length > 3) ? arr[3] : '' }
//     )
//         .then((response) => {
//             data = response.data
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     return data;
// }

// export const searchFillings = async (query) => {
//     let data;
//     await axios.post(
//         `${config().search}/filings`,
//         {
//             'tickers': query['tickers'],
//             'form_type': query['form_type'],
//             'time_start': query['time_start'],
//             'time_end': query['time_end']
//         }
//     ).then((response) => {
//         data = response.data;
//     }).catch((err) => {
//         console.log(err);
//     })
//     return data;
// }
 
export const searchFillings = async (query, dispatch) => {
    let data;
    try{
        const res = await axios.post(
            `${config().search}/filings`,
            {
                'tickers': query['tickers'],
                'form_type': query['form_type'],
                'time_start': query['time_start'],
                'time_end': query['time_end']
            }
        )
        data = res.data;
        dispatch({
            type: 'UPDATE_QUERY_FILINGS_DATA',
            queryFilingsData: data
        })
    }
    catch(err) {
        console.log(err);
    }
    return data;
}

// export const 


export const simpleSearch = async (query, dispatch) => {
    let data;
    await axios.post(
        `${config().search}`,
        { 'query': query }
    )
        .then((response) => {
            data = response.data.data.companies
            if(data.length > 0)
            {
                dispatch({
                    type: 'ADD_SIMPLE_SEARCH_TO_QUERY_FILINGS',
                    ticker: data[0]['ticker'], 
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    return data;
}


export const getCurrentCompany = async (dispatch) => {
    let data;
    await axios.get(
        ''
    )
        .then((response) => {
            dispatch({
                type: 'GET_CURRENT_COMPANY',
                currentCompany: response.data
            });
            data = response.data
        })
        .catch((err) => {
            console.log(err);
        })
    return data;
}

export const getRecentlyViewedCompanies = async (dispatch) => {
    let data;
    // const config = {
    //     headers: {
    //         'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
    //     }
    // }
    await axios.get(
        config().getRecentlyViewedCompanies,
        configHeaders
    )
        .then((response) => {
            dispatch({
                type: 'GET_RECENTLY_VIEWED_COMPANIES',
                recentlyViewedCompanies: response.data
            });
            data = response.data
        })
        .catch((err) => {
            console.log(err);
        })
    return data;
}


export const getBookmarkCompanies = async (id, dispatch) => {
    // const config = {
    //     headers: {
    //         'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
    //     }
    // }
    try {
        const response = await axios.get(
            `${config().bookmarkCompanyUrl}${1}`,
            configHeaders
        )
        dispatch({
            type: 'GET_BOOKMARK_COMPANY',
            bookmarkedCompanies: response.data
        });
        console.log("Bookmark Companies:", response.data);
        return response.data;
    }
    catch (error) {
        return { status: false };
    }
}

export const getMetricsFromFiling = async (id, dispatch) => {
    let data;
    try {
        const response = await axios.get(
            `${config().getMetricsFromFiling}/${id}`,
            configHeaders
        );

        data = response.data;
    }
    catch (err) {
        console.log("Error:", err);
    }

    return data;
}

export const getBaskets = async (dispatch) => {
    try{
        const response = await axios.get(
            config().getBasket,
            configHeaders
        );
        // console.log("Response of Baskets: ", response.data)
        dispatch({
            type: 'GET_BASKETS',
            baskets: response.data
        });
        return response.data
    }
    catch(err) {
        console.log("Error:", err);
    }
}

export const getKeyMetricOfCompany = async (ticker, metric_type) => {
    try{
        const response = await axios.get(
            `${config().getMetricOfCompanyUrl}${ticker}/${metric_type}`,
            configHeaders
        );

        console.log("response:", response);
        return response.data;
    }
    catch(err) {
        console.log("Error:", err);
    }
}

export const getBasketDetails = async (basket_id, dispatch) => {
    try {
        const response = await axios.get(
            `${config().getBasketDetailsUrl}${basket_id}`,
            configHeaders
        );
        dispatch({
            type: 'GET_BASKET_DETAILS',
            basketDetails: response.data
        })
        console.log("Basket Details :", response.data)
        return response.data;
    }
    catch(err){
        return {status: false}
    }
}

export const createBasket = async (name,company_ticker, dispatch) => {
    let data;
    console.log(configHeaders)
    data = await axios.post(
        `${config().createBasket}`,
        {name:name, tickers:company_ticker},
        configHeaders
    )
    
    return data;
}

export const selectInBasket = (company, dispatch) => {
    dispatch({
        type: 'SELECT_IN_BASKET',
        company:company
    })
    console.log("Company being added to basket: ", company);
    return company;
}

export const deselectInBasket = (company, dispatch) => {
    dispatch({
        type:'DESELECT_IN_BASKET',
        company: company
    })

    console.log("Company being removed from selection: ", company);
    return company;
}

export const refreshSelectedCompanies = (dispatch) => {
    dispatch({type: 'RESET_BASKET_SELECTION'});
    return "Selections removed";
}
export const getKeyMetrics = async (metric, dispatch) => {
    let data;
    console.log("here")
    const config = {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
        }
    }
    data = await axios.get(
        `${config().getKeyMetricUrl}${metric.ticker}/${metric.metric_type}`,
        config
    )
    
    return data;
}

export const addRecentlyViewedCompany = async (company_ticker) => {
    let data;
    console.log("addRecentlyViewedCompany")
    // const config = {
    //     headers: {
    //         'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`
    //     }
    // }
    console.log(configHeaders)
    data = await axios.post(
        `${config().addRecentlyViewedCompany}/${company_ticker}`,
        {},
        configHeaders
    )
    
    return data;
}

export const searchCompanyAPI = async(queryFilings, dispatch) => {

    const response = await axios.post(
        `${config().getAllMetricsOfCompany}`,
        queryFilings,
        configHeaders
    )

    return response.data;
}
