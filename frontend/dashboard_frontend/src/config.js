export const LOCAL_SERVER_URL = `http://localhost:8000/`;

export const config = ()=>{
    const confs = {
        'local':{
            'auth':`${LOCAL_SERVER_URL}auth/token/`
        }
    }

    return confs['local'];
}