import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import customaxios from 'axios';

function useInventoryAxios(url, method, requestData = null, lazy = true) {
  const token = useSelector((state) => state.token.token);

  const [inventoryData, setInventoryData] = useState(null);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryError, setInventoryError] = useState(null);
  const serviceId = process.env.REACT_APP_BASE_URL;
  const axios = customaxios.create({
    baseURL: serviceId,
    timeout: 10000,
    headers: {
      'Authorization': (token) ? token.token : ''
    }
  });

  const inventoryFetchData = async () => {
    try {
      setInventoryLoading(true);
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

      setInventoryData(response.data);
    } catch (error) {
      setInventoryError(error);
    } finally {
      setInventoryLoading(false);
    }
  };


  useEffect(() => {
    if (!lazy) inventoryFetchData();
  }, [url, method]);

  return { inventoryData, inventoryLoading, inventoryError, inventoryFetchData };
}

export default useInventoryAxios;