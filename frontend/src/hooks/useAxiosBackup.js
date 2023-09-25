import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import customaxios from 'axios';

function useAxios(url, method, requestData = null, lazy = true) {
  const token = useSelector((state) => state.token.token);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const serviceId = process.env.REACT_APP_BASE_URL;
  const axios = customaxios.create({
    baseURL: serviceId,
    timeout: 10000,
    headers: {
      'Authorization': (token) ? token.token : ''
    }
  });

  const fetchProfile = async () => {
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
        case 'DELETE':
          response = await axios.delete(url, requestData);
          break;
        default:
          throw new Error('Invalid method');
      }

      setProfile(response.data);
    } catch (error) {
      console.log(error);
      setProfileError(error);
    } finally {
      setProfileLoading(false);
    }
  };


  useEffect(() => {
    if (!lazy) fetchProfile();
  }, [url, method]);

  return { profile, profileLoading, profileError, fetchProfile };
}

export default useAxios;