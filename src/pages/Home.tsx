import React, { useCallback, useRef, useState } from 'react';
import Card from '../components/molecules/Card';
import useFetchData from '../hooks/useFetchData';
import usePullToRefresh from '../hooks/usePullToRefresh';
import Book from '../types/interfaces/Book';
import LoadingSpinner from '../components/molecules/LoadingSpinner';
import Header from '../components/organisms/Header';
import RefreshSpinner from '../components/molecules/RefreshSpinner';
import Footer from '../components/organisms/Footer';

const Home: React.FC = () => {
  // Ref for the intersection observer
  const observer = useRef<IntersectionObserver | null>(null);

  // State for pagination
  const [page, setPage] = useState<number>(1);

  // Fetching data using custom hook
  const { data: books = [], hasMore, fetchData, loading, error } = useFetchData('book', page);

  // Callback for refreshing data
  const onRefresh = () => {
    setPage(1);
    fetchData();
  };

  // Custom hook for pull-to-refresh functionality
  const { pullChange } = usePullToRefresh({ onRefresh });

  // Callback for observing last book element
  const lastBookElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPageNumber) => prevPageNumber + 1);
          }
        },
        { threshold: 0.8 }, // Observe when 80% of the element is visible
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <div style={{ position: 'relative' }} className="page">
      {/* Pull-to-refresh spinner */}
      <RefreshSpinner pullChange={pullChange} loading={loading} />

      <div className="container">
        <Header title="Books" />

        <div className="card-list">
          {/* Render list of book cards */}
          {books?.map((book: Book, index: number) => {
            return (
              <div className="card-container" ref={index === books.length - 1 ? lastBookElementRef : null} key={index}>
                <Card book={book} />
              </div>
            );
          })}
        </div>

        {/* Show loading spinner if data is being fetched */}
        {loading && (
          <div
            style={{
              height: books?.length && books?.length > 0 ? '10vh' : '50vh',
            }}
            className="loading-card-list">
            <LoadingSpinner />
          </div>
        )}

        {/* Show error or "End of results" in the footer */}
        <Footer content={error || (!hasMore ? 'End of results' : undefined)} />
      </div>
    </div>
  );
};

export default Home;
