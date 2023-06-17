import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const requst = useCallback( async (url, method = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => {
        setLoading(true);

        try{
            const response = await fetch(url, {method, body, headers});
            
            if(!response.ok){
                throw new Error(`Coulde not fetch ${url}, status ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data
        }   
        catch(e){
            setLoading(false);
            setError(true);
            throw e.message ;
        }

    }, [])

    const clearError = useCallback(() => setError(false));

    return {
        loading, 
        requst,
        error, 
        clearError
    }

}