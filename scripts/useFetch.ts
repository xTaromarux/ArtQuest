import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const base_url =  "https://bce9-178-43-255-119.ngrok-free.app";
const web_url =  "http://localhost:8000";
const API_VALUE = Platform.OS === 'web' ? web_url : base_url;

const useFetch = (endpoint: string) => {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_VALUE}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

const useDelete = (endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_VALUE}${endpoint}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { loading, error, deleteData };
};

const usePost = (endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = useCallback(async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_VALUE}${endpoint}`, {
        method: 'POST',
        body: data,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { loading, error, postData };
};

const usePut = (endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putData = useCallback(async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_VALUE}${endpoint}`, {
        method: 'PUT',
        body: data,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { loading, error, putData };
};

export { useFetch, useDelete, usePost, usePut };