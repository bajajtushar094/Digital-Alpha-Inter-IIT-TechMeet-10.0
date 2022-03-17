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
        const newArr = action.recentlyViwedCompanies;
        return {
            ...state,
            recentlyViwedCompanies: newArr
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

    if(action.type === 'GET_BASKET_DETAILS') {
        const newArr = action.basketDetails;
        return {
            ...state,
            basketDetails: newArr
        }
    }
    return state;
}

export default rootReducer;