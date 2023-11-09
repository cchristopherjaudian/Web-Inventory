import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import customaxios from 'axios';

function useIncomeAxios(url, method, requestData = null, lazy = true) {
  const token = useSelector((state) => state.token.token);
  const [incomeData, setIncomeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const serviceId = process.env.REACT_APP_BASE_URL;
  const axios = customaxios.create({
    baseURL: serviceId,
    timeout: 10000,
    headers: {
      'Authorization': (token) ? token.token : ''
    }
  });

  const fetchIncomeData = async () => {
    try {
      setLoading(true);
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

      setIncomeData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!lazy) fetchIncomeData();
  }, [url, method]);

  return { incomeData, loading, error, fetchIncomeData };
}

export default useIncomeAxios;