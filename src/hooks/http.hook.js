import axios from 'axios';
import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (url, method, body, token = null, headers = { 'Content-Type': 'application/json' }) => {
      setLoading(true);
      if (token) {
        // eslint-disable-next-line no-param-reassign
        headers.Authorization = `Bearer ${token}`;
      }
      try {
        const response = await axios({
          method,
          url,
          data: body,
          headers,
        });
        setLoading(false);
        return response;
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
    [],
  );

  return { loading, request };
};

export default useHttp;
