export const LOCAL_SERVER_URL = `http://localhost:8000/api`;

export const config = ()=>{
    const confs = {
        'local':{
            'auth':`${LOCAL_SERVER_URL}auth/token/`,
            'getRecentFilings':`${LOCAL_SERVER_URL}/landingPage/recentFilings/all`
        }
    }

    return confs['local'];
}