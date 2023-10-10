import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import customaxios from 'axios';

function useLowAxios(url, method, requestData = null, lazy = true) {
  const token = useSelector((state) => state.token.token);

  const [lowData, setLowData] = useState(null);
  const [lowLoading, setLowLoading] = useState(false);
  const [lowError, setLowError] = useState(null);
  const serviceId = process.env.REACT_APP_BASE_URL;
  const axios = customaxios.create({
    baseURL: serviceId,
    timeout: 10000,
    headers: {
      'Authorization': (token) ? token.token : ''
    }
  });

  const lowFetchData = async () => {
    try {
      console.log(url);
      setLowLoading(true);
      
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

      setLowData(response.data);
    } catch (error) {
      setLowError(error);
    } finally {
      setLowLoading(false);
    }
  };


  useEffect(() => {
    if (!lazy) lowFetchData();
  }, [url, method]);

  return { lowData, lowLoading, lowError, lowFetchData };
}

export default useLowAxios;