import { useState} from 'react';
import axios from 'axios';

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<any>(null);

  const sendRequest = async (url:string, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError('');
    setData(null);

    let createUrl = `http://localhost:8000/v1/${url}`

    try {
      const response = await axios({
        method : method,
        url : createUrl,
        data : body,
        headers : headers
      });

      setData(response.data);
    } catch (error:any) {
      setError(error.response.data.message || 'Something went wrong');
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    data,
    sendRequest,
  };
};

export default useHttp;
