export const LOCAL_SERVER_URL = `http://localhost:8000/`;

export const config = ()=>{
    const confs = {
        'local':{
            'auth':`${LOCAL_SERVER_URL}/api/auth/token/`,
            'search': `${LOCAL_SERVER_URL}api/search`,
        }
    }

    return confs['local'];
}