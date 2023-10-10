import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import customaxios from 'axios';

function useHighAxios(url, method, requestData = null, lazy = true) {
  const token = useSelector((state) => state.token.token);

  const [highData, setHighData] = useState(null);
  const [highLoading, setHighLoading] = useState(false);
  const [highError, setHighError] = useState(null);
  const serviceId = process.env.REACT_APP_BASE_URL;
  const axios = customaxios.create({
    baseURL: serviceId,
    timeout: 10000,
    headers: {
      'Authorization': (token) ? token.token : ''
    }
  });

  const highFetchData = async () => {
    try {
      console.log(url);
      setHighLoading(true);
      
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
        case 'DELETE':
          response = await axios.delete(url, requestData);
          break;
        default:
          throw new Error('Invalid method');
      }

      setHighData(response.data);
    } catch (error) {
      setHighError(error);
    } finally {
      setHighLoading(false);
    }
  };


  useEffect(() => {
    if (!lazy) highFetchData();
  }, [url, method]);

  return { highData, highLoading, highError, highFetchData };
}

export default useHighAxios;