import jwt_decode from "jwt-decode";

const initState = {
    isAuthenticated:  localStorage.getItem('authTokens')?(JSON.parse(localStorage.getItem('authTokens')).access):false,
    user: localStorage.getItem('authTokens')?jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access):null,
    bookmarkedCompanies: [],
    recentFilings: [],
    allCompanies: [],
    currentCompany: {},
    recentlyViwedCompanies: [],
    baskets: [],
    queryFilings: {
        "tickers": [],
        "form_type": [],
        "time_start": "",
        "time_end": ""
    },
    queryFilingsData: null ,
    searchFilings: []
}

const rootReducer = (state=initState,action) => {
    // console.log(action);

    if(action.type==='LOGIN_USER') {
        return {
            ...state,
            isAuthenticated:true,
            user: action.user,
        }
    }
    if(action.type==="GET_BOOKMARK_COMPANY"){
        const newArr = action.bookmarkedCompanies;
        return {
            ...state,
            bookmarkedCompanies: newArr
        }
    }
    if(action.type==='GET_RECENT_FILINGS') {
        const newArr = action.recentFilings;
        return {
            ...state,
            recentFilings: newArr
        }
    }
    if(action.type==='GET_ALL_COMPANIES') {
        const newArr = action.allCompanies;
        return {
            ...state,
            allCompanies: newArr
        }
    }
    if(action.type==='GET_CURRENT_COMPANY') {
        const newObj = action.currentCompany;
        return {
            ...state,
            currentCompany: newObj
        }
    }
    if(action.type==='GET_RECENTLY_VIEWED_COMPANIES') {
        const newArr = action.recentlyViewedCompanies;
        return {
            ...state,
            recentlyViewedCompanies: newArr
        }
    }
    if(action.type==='UPDATE_QUERY_FILINGS') {
        const newObj = action.queryFilings;
        return {
            ...state,
            queryFilings: newObj
        }
    }
    if(action.type==='UPDATE_QUERY_FILINGS_DATA') {
        const newObj = action.queryFilingsData;
        return {
            ...state,
            queryFilingsData: newObj
        }
    }
    // if(action.type==='ADD_COMPANIES') {
    //     const newArr = [...state.members,action.member];
    //     return {
    //         ...state,
    //         members: newArr
    //     }
    // }
    
    if(action.type==='LOGOUT_USER') {
        localStorage.removeItem('authTokens');
        return {
            ...state,
            isAuthenticated:false,
            user: null,
        }
    }
    if(action.type === 'GET_BASKETS') {
        const newArr = action.baskets;
        return {
            ...state,
            baskets: newArr
        }
    }
    if(action.type === "STORE_SEARCH_FILINGS"){
        const newArr = action.searchFilings;
        return {
            ...state,
            searchFilings: newArr
        }
    }
    return state;
}

export default rootReducer;