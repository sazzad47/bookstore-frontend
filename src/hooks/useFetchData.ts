import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Book from "../types/interfaces/Book";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface FetchDataResult {
	data: Book[] | null;
	hasMore: boolean;
	loading: boolean;
	error: string | null;
	isFetching: boolean;
	refetch: () => void;
}

const useFetchData = (url: string, page: number = 1): FetchDataResult => {
	const [data, setData] = useState<Book[] | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isFetching, setIsFetching] = useState<boolean>(false);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await axios.get(`${backendUrl}/api/${url}?page=${page}`);
			const newData = response.data.books;

			setData((prevData: Book[] | null) => {
				if (prevData === null || page === 1) {
					return newData;
				} else {
					const mergedData = [...prevData, ...newData];
					const uniqueData = mergedData.filter(
						(book, index, self) => self.findIndex(b => b.id === book.id) === index
					);
					return uniqueData;
				}
			});
			setHasMore(response.data.remainingBooks > 0);
		} catch (error) {
			setError("An error occurred while fetching data.");
		} finally {
			setLoading(false);
			setIsFetching(false);
		}
	}, [url, page]);

	const refetch = () => {
		setIsFetching(true);
		fetchData();
	};

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, hasMore, loading, error, isFetching, refetch };
};

export default useFetchData;
