import axios from 'axios';
import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

        if (!response.statusText) {
          throw new Error(response.messages);
        }

        setLoading(false);

        return response;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};

export default useHttp;
