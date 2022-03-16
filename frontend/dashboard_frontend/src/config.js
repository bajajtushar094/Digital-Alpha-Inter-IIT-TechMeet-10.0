export const LOCAL_SERVER_URL = `http://localhost:8000/api/`;

export const config = ()=>{
    const confs = {
        'local':{
            'auth':`${LOCAL_SERVER_URL}/api/auth/token/`,
            'search': `${LOCAL_SERVER_URL}api/search`,
            'getRecentFilings':`${LOCAL_SERVER_URL}/landingPage/recentFilings/all`,
            'getAllCompanies':`${LOCAL_SERVER_URL}/landingPage/companies/all`,
        }
    }

    return confs['local'];
}