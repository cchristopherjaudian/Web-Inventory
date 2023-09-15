import { useState, useEffect } from 'react';
import axios from 'axios';

function useAxios(url, method, requestData = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                switch (method) {
                    case 'GET':
                        response = await axios.get(url);
                        break;
                    case 'POST':
                        response = await axios.post(url, requestData);
                        break;
                    case 'PATCH':
                        response = await axios.patch(url, requestData);
                        break;
                    default:
                        throw new Error('Invalid method');
                }
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, requestData]);

    return { data, loading, error };
}

export default useAxios;
//const { data, loading, error } = useAxios('https://api.example.com/data', 'POST', { key: 'value' });