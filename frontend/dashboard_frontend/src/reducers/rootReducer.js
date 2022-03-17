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
    basketSelectedCompanies:[],
    visualize: false
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

    return state;
}

export default rootReducer;