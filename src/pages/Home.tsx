import React, { useCallback, useRef, useState } from "react";
import Card from "../components/molecules/Card";
import useFetchData from "../hooks/useFetchData";
import usePullToRefresh from "../hooks/usePullToRefresh";
import Book from "../types/interfaces/Book";
import LoadingSpinner from "../components/molecules/LoadingSpinner";
import Header from "../components/organisms/Header";
import RefreshSpinner from "../components/molecules/RefreshSpinner";
import Footer from "../components/organisms/Footer";

const Home: React.FC = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [page, setPage] = useState<number>(1);
  const {
    data: books = [],
    hasMore,
    refetch,
    isFetching,
    loading,
    error,
  } = useFetchData("book", page);

  const onRefresh = () => {
    setPage(1);
    refetch();
  };

  const { pullChange } = usePullToRefresh({ onRefresh });

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
        { threshold: 0.8 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div style={{ position: "relative" }} className="page">
      <RefreshSpinner pullChange={pullChange} isFetching={isFetching} />
      <div className="container">
        <Header title="Books" />
        <div className="card-list">
          {books?.map((book: Book, index: number) => {
            return (
              <div
                className="card-container"
                ref={index === books.length - 1 ? lastBookElementRef : null}
                key={index}
              >
                <Card book={book} />
              </div>
            );
          })}
        </div>
        {loading && (
          <div
            style={{
              height: books?.length && books?.length > 0 ? "10vh" : "50vh",
            }}
            className="loading-card-list"
          >
            <LoadingSpinner />
          </div>
        )}

        <Footer content={error || (!hasMore ? "End of results" : undefined)} />
      </div>
    </div>
  );
};

export default Home;
