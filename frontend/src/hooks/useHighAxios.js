import { useEffect, useState, useRef } from 'react';
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
      Authorization: token ? token.token : ''
    }
  });

  // Create a ref for the cancel token
  const cancelTokenSource = useRef(null);

  const highFetchData = async () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation cancelled due to new request.');
    }
    cancelTokenSource.current = customaxios.CancelToken.source();

    try {
      setHighLoading(true);

      let response;
      switch (method) {
        case 'GET':
          response = await axios.get(url, { cancelToken: cancelTokenSource.current.token });
          break;
        case 'POST':
          response = await axios.post(url, requestData, { cancelToken: cancelTokenSource.current.token });
          break;
        case 'PATCH':
          response = await axios.patch(url, requestData, { cancelToken: cancelTokenSource.current.token });
          break;
        case 'DELETE':
          response = await axios.delete(url, requestData, { cancelToken: cancelTokenSource.current.token });
          break;
        default:
          throw new Error('Invalid method');
      }

      setHighData(response.data);
    } catch (error) {
      if (customaxios.isCancel(error)) {
        console.log('Request cancelled', error.message);
      } else {
        setHighError(error);
      }
    } finally {
      setHighLoading(false);
    }
  };

  useEffect(() => {
    if (!lazy) highFetchData();

    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('Operation canceled due to component being unmounted.');
      }
    };
  }, [url, method]);

  return { highData, highLoading, highError, highFetchData };
}

export default useHighAxios;
