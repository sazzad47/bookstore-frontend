import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Book from "../types/interfaces/Book";

// Define the shape of the data returned by the custom hook
interface FetchDataResult {
    data: Book[] | null;
    hasMore: boolean;
    loading: boolean;
    error: string | null;
    isFetching: boolean;
    refetch: () => void;
}

const useFetchData = (url: string, page: number = 1): FetchDataResult => {
    // State variables for managing data fetching
    const [data, setData] = useState<Book[] | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    // Fetch data from the API
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch data from the backend API using axios
            const response = await axios.get(`backend/api/${url}?page=${page}`);
            const newData = response.data.books;

            setData((prevData: Book[] | null) => {
                if (prevData === null || page === 1) {
                    return newData;
                } else {
                    // Merge and remove duplicates from previous and new data
                    const mergedData = [...prevData, ...newData];
                    const uniqueData = mergedData.filter(
                        (book, index, self) => self.findIndex(b => b.id === book.id) === index
                    );
                    return uniqueData;
                }
            });

            // Update whether there is more data to load
            setHasMore(response.data.remainingBooks > 0);
        } catch (error) {
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
            setIsFetching(false);
        }
    }, [url, page]);

    // Function to manually trigger data refetching
    const refetch = () => {
        setIsFetching(true);
        fetchData();
    };

    // Fetch data when the component mounts or when fetchData changes
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Return the data and functions to the component using the hook
    return { data, hasMore, loading, error, isFetching, refetch };
};

export default useFetchData;
