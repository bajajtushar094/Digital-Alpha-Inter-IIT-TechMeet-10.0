import jwt_decode from "jwt-decode";

const initState = {
    members: [],
    isAuthenticated:  localStorage.getItem('authTokens')?(JSON.parse(localStorage.getItem('authTokens')).access):false,
    user: localStorage.getItem('authTokens')?jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access):null,
}

const rootReducer = (state=initState,action) => {
    console.log(action)
    if(action.type==='GET_COMPANIES') {
        const newArr = [...state.members,action.members];
        return {
            ...state,
            members: newArr
        }
    }
    if(action.type==='ADD_COMPANIES') {
        const newArr = [...state.members,action.member];
        return {
            ...state,
            members: newArr
        }
    }
    if(action.type==='LOGIN_USER') {
        return {
            ...state,
            isAuthenticated:true,
            user: action.user,
        }
    }
    if(action.type==='LOGOUT_USER') {
        localStorage.removeItem('authTokens');
        return {
            ...state,
            isAuthenticated:false,
            user: null,
        }
    }
    return state;
}

export default rootReducer;