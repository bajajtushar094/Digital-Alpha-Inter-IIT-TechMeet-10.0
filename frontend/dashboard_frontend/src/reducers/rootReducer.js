import jwt_decode from "jwt-decode";

let endDate = new Date();
const startDate = `${endDate.getFullYear() - 3}-${endDate.getMonth() + 1
    }-${endDate.getDate()}`
endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1
    }-${endDate.getDate()}`

const initState = {
    isAuthenticated:  localStorage.getItem('authTokens')?(JSON.parse(localStorage.getItem('authTokens')).access):false,
    user: localStorage.getItem('authTokens')?jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access):null,
    bookmarkedCompanies: [],
    recentFilings: [],
    allCompanies: [],
    currentCompany: {},
    recentlyViewedCompanies: [],
    baskets: [],
    queryFilings: {
        "tickers": [],
        "metric_type": [],
        "form_type":[],
        "time_start": startDate,
        "time_end": endDate
    },
    queryFilingsData: null,
    basketDetails: {
        error: "",
        data: {
            basket:{
                id: 0,
                name:"",
                user_id:""
            },
            companies:[],
            filings:[],
        }
    },
    basketSelectedCompanies:[],
    visualize: false,
    currentBasket: null,
    page:1
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
        console.log("GET_RECENTLY_VIEWED_COMPANIES", newArr)
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
    if(action.type === 'ADD_SIMPLE_SEARCH_TO_QUERY_FILINGS') {
        const newObj = action.ticker;
        return {
            ...state,
            queryFilings: {
                ...state.queryFilings,
                tickers: [...state.queryFilings.tickers, newObj]
            }
        }
    }
    if(action.type === 'CLEAN_QUERY_FILINGS') {
        return {
            ...state,
            queryFilings: { 
                tickers: [],
                form_type: [],
                metric_type:[],
                time_start: "",
                time_end: ""
            }
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
        const newArr = action.searchFillings;
        return {
            ...state,
            searchFillings: newArr
        }
    }

    if(action.type === 'GET_BASKET_DETAILS') {
        const newArr = action.basketDetails;
        return {
            ...state,
            basketDetails: newArr
        }
    }

    if(action.type === 'SELECT_IN_BASKET') {
        const company_to_add = action.company;
        let temp = state.basketSelectedCompanies 
        temp.push(company_to_add);
        return {
            ...state,
            basketSelectedCompanies: temp
        }
    }

    if(action.type === 'DESELECT_IN_BASKET') {
        const company_to_remove = action.company;
        let temp = state.basketSelectedCompanies 
        temp = temp.filter((company)=> company.ticker !== company_to_remove.ticker)
        return {
            ...state,
            basketSelectedCompanies: temp
        }
    }

    if(action.type === 'RESET_BASKET_SELECTION') {
        return{
            ...state,
            basketSelectedCompanies: []
        }
    }

    if( action.type == "ENABLE_VISUALIZE"){
        return {
            ...state,
            visualize: true
        }
    }

    if(action.type == 'DISABLE_VISUALIZE'){

        return {
            ...state,
            visualize: false
        }
    }
    
    if(action.type === 'RESET_QUERY_FILINGS'){
        return{
            ...state,
            queryFilings: {
                "tickers": [],
                "form_type": [],
                "time_start": "",
                "time_end": ""
            }
        }
    }

    if(action.type === 'RESET_SEARCH_FILINGS'){
        return{
            ...state,
            searchFillings: []
        }
    }

    if(action.type === 'SET_CURRENT_BASKET'){
        const basket = action.basket;
        return{
            ...state,
            currentBasket: basket
        }
    }

    if(action.type === 'RESET_PAGE'){
        return {
            ...state,
            page:1
        }
    }

    if(action.type === 'SET_PAGE'){
        const page = action.page;
        return{
            ...state,
            page:page
        }
    }

    return state;
}

export default rootReducer;