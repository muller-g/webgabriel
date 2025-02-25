import axios from "axios";

export default class useApi {
    static async axiosRequestAuth(method: string, url: string, data: any, token: string){
        let response = null;
        let error = null;

        try {
            response = await axios({
                method: method,
                url: process.env.NEXT_PUBLIC_API_ROUTE + url,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (err) {
            error = err;
        }

        return {response, error};
    }

    static async axiosRequest(method: string, url: string, data: any){
        let response = null;
        let error = null;

        try {
            response = await axios({
                method: method,
                url: process.env.NEXT_PUBLIC_API_ROUTE + url,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (err) {
            error = err;
        }

        return {response, error};
    }
}