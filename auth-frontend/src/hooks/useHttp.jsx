import { useState } from 'react'
import instance from '../axios/axiosInstace';

export const useHttp = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ data, setDatat] = useState({});

    const request = async (url, method = 'GET', data=null, config={"Content-type": "application/json"}) => {
        try{
            setLoading(true);
            const result = await instance({
                url,
                method,
                data,
                ...config,
            })
            setDatat(result.data);
            return result.data;
        }catch(error){
            setError(error.response?.data?.message ?? error.message);
            throw error;
        }finally{
            setLoading(false);
        }
    }

    return { loading, error, data, request };
}
