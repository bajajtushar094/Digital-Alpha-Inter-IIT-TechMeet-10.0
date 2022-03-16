export const LOCAL_SERVER_URL = `http://localhost:8000/api/`;

export const config = ()=>{
    const confs = {
        'local':{
            'email':'bajajtushar2019@gmail.com',
            'password': 'password',
            'auth':`${LOCAL_SERVER_URL}auth/token/`,
            'search': `${LOCAL_SERVER_URL}search`,
            'getRecentFilings':`${LOCAL_SERVER_URL}landingPage/recentFilings/all`,
            'getAllCompanies':`${LOCAL_SERVER_URL}landingPage/companies/all`,
            'getMetricsFromFiling':`${LOCAL_SERVER_URL}filings/getMetricsFromFilings`,
            'getBookmarkCompany':`${LOCAL_SERVER_URL}landingPage/bookmarkedCompanies`
        }
    }

    return confs['local'];
}