export const LOCAL_SERVER_URL = `http://localhost:8000/api/`;
export const LOCAL_SERVER_URL_MAIN = `http://localhost:8000`; 
export const LOCAL_SERVER_URL_IP = `http://127.0.0.1:8000/`;
export const config = ()=>{
    const confs = {
        'local':{
            'email':'bajajtushar2019@gmail.com',
            'password': 'password',
            'auth':`${LOCAL_SERVER_URL}auth/token/`,
            'search': `${LOCAL_SERVER_URL}search`,
            'getRecentFilings':`${LOCAL_SERVER_URL}landingPage/recentFilings/all`,
            // 'getAllCompanies':`${LOCAL_SERVER_URL}landingPage/companies/all`,
            'getAllCompanies':`${LOCAL_SERVER_URL}company/metric/all`,
            'getMetricsFromFiling':`${LOCAL_SERVER_URL}filings/getMetricsFromFilings`,
            'getBookmarkCompany':`${LOCAL_SERVER_URL}landingPage/bookmarkedCompanies`,
            'getRecentlyViewedCompanies': `${LOCAL_SERVER_URL}landingPage/recentlyViewedCompanies`,
            'addRecentlyViewedCompany': `${LOCAL_SERVER_URL}companies/addRecentlyViewedCompany`,
            'getBasket': `${LOCAL_SERVER_URL}basket/get`,
            'createBasket': `${LOCAL_SERVER_URL}basket/create`,
            'getKeyMetricOfCompanyAPI':`${LOCAL_SERVER_URL}companies/getKeyMetrics`,
            'getAllMetricsOfCompany':`${LOCAL_SERVER_URL}company/metric/all`,
            'refresh':`${LOCAL_SERVER_URL}auth/token/refresh/`,
            'bookmarkCompanyUrl':`${LOCAL_SERVER_URL}landingPage/bookmarkedCompanies/`,
            'getMetricOfCompanyUrl':`${LOCAL_SERVER_URL}landingPage/bookmarkedCompanies/`,
            'getBasketDetailsUrl':`${LOCAL_SERVER_URL}basket/details?basket_id=`,
            'getKeyMetricUrl':`${LOCAL_SERVER_URL}companies/getKeyMetrics/`,
            "basketCompanreUrl":`${LOCAL_SERVER_URL}basket/compare`,
            'getKeyMetricsCSVUrl':`${LOCAL_SERVER_URL}companies/getKeyMetricsCSV`,
            'getCompareCSVUrl':`${LOCAL_SERVER_URL}basket/compareCSV`,
            'insertIntoBasket':`${LOCAL_SERVER_URL}basket/insertIntoBasket`
        }
    }

    return confs['local'];
}
