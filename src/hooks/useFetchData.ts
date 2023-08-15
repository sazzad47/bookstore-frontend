import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Book from "../types/interfaces/Book";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const useFetchData = ( url : string) => {
  const [data, setData] = useState<Book[] | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false); 

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${backendUrl}/api/${url}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [url]);

  const refetch = () => {
    setIsFetching(true); 
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, isFetching, refetch }; 
};

export default useFetchData;
