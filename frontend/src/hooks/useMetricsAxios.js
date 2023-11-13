import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import customaxios from 'axios';

function useMetricsAxios(url, method, requestData = null, lazy = true,tempToken='') {
  const token = useSelector((state) => state.token.token);

  const [metricsData, setMetricsData] = useState(null);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metricsError, setMetricsError] = useState(null);
  const serviceId = process.env.REACT_APP_BASE_URL;
  const axios = customaxios.create({
    baseURL: serviceId,
    timeout: 10000,
    headers: {
      'Authorization': (token.token) ? token.token : (tempToken) ? tempToken : ''
    }
  });
  const metricsFetchData = async () => {
    try {
      setMetricsLoading(true);
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

      setMetricsData(response.data);
    } catch (error) {
      setMetricsError(error);
    } finally {
      setMetricsLoading(false);
    }
  };


  useEffect(() => {
    if (!lazy) metricsFetchData();
  }, [url, method]);

  return { metricsData, metricsLoading, metricsError, metricsFetchData };
}

export default useMetricsAxios;