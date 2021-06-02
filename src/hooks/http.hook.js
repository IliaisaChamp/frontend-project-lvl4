import axios from 'axios';
import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, body = null) => {
      setLoading(true);
      try {
        const response = await axios.post(url, body);
  
        if (!response.statusText) {
          throw new Error(response.messages); // ?????? проверить сообщение с сервера || 'Что-то пошло не так'
        }

        setLoading(false);

        return response;

      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};

export default useHttp;
