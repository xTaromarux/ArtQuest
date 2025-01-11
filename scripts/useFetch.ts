import { useState, useEffect, useCallback, startTransition } from "react";
import API_BASE_URL from "@/utils/config";

const useFetch = (endpoint: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      startTransition(() => {
        setData(result);
      });
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
    startTransition(() => {
      setLoading(true);
    });
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err: any) {
      startTransition(() => {
        setError(err.message);
      });
    } finally {
      startTransition(() => {
        setLoading(false);
      });
    }
  }, [endpoint]);

  return { loading, error, deleteData };
};

const usePost = (endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = useCallback(
    async (data: FormData) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "POST",
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
    },
    [endpoint]
  );

  return { loading, error, postData };
};

const usePut = (endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const putData = useCallback(
    async (data: FormData) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "PUT",
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
    },
    [endpoint]
  );

  return { loading, error, putData };
};

export { useFetch, useDelete, usePost, usePut };
