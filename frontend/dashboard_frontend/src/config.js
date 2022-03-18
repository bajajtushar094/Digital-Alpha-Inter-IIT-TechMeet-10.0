export const LOCAL_SERVER_URL = `http://localhost:8000/api/`;

export const config = ()=>{
    const confs = {
        'local':{
            'email':'aman@test.com',
            'password': 'lmaolmao',
            'auth':`${LOCAL_SERVER_URL}auth/token/`,
            'search': `${LOCAL_SERVER_URL}search`,
            'getRecentFilings':`${LOCAL_SERVER_URL}landingPage/recentFilings/all`,
            'getAllCompanies':`${LOCAL_SERVER_URL}landingPage/companies/all`,
            'getMetricsFromFiling':`${LOCAL_SERVER_URL}filings/getMetricsFromFilings`,
            'getBookmarkCompany':`${LOCAL_SERVER_URL}landingPage/bookmarkedCompanies`,
            'getRecentlyViewedCompanies': `${LOCAL_SERVER_URL}landingPage/recentlyViewedCompanies`,
            'addRecentlyViewedCompany': `${LOCAL_SERVER_URL}companies/addRecentlyViewedCompany`,
            'getBasket': `${LOCAL_SERVER_URL}basket/get`,
            'getKeyMetricOfCompanyAPI':`${LOCAL_SERVER_URL}companies/getKeyMetrics`
        }
    }

    return confs['local'];
}
