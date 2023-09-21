import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import customaxios from 'axios';

function useAxios(url, method, requestData = null, lazy = true) {
  const token = useSelector((state) => state.token.token);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const serviceId = process.env.REACT_APP_BASE_URL;
  const axios = customaxios.create({
    baseURL: serviceId,
    timeout: 10000,
    headers:{
      'Authorization' : (token) ? token.token : ''
    }
  });

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
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };


    useEffect(()=>{
      if(!lazy) fetchData();
    },[url, method]);
 
  return { data, loading, error, fetchData };
}

export default useAxios;