import React from "react";
import Card from "../components/molecules/Card";
import useFetchData from "../hooks/useFetchData";
import usePullToRefresh from "../hooks/usePullToRefresh";
import Book from "../types/interfaces/Book";
import LoadingSpinner from "../components/molecules/LoadingSpinner";
import Header from "../components/organisms/Header";
import RefreshSpinner from "../components/molecules/RefreshSpinner";

const Home: React.FC = () => {
  const { data: books = [], refetch, isFetching, loading, error } = useFetchData("book");

  const onRefresh = () => {
    refetch();
  };

  const { pullChange } = usePullToRefresh({ onRefresh });
  console.log('isFetching', isFetching)

  return (
    <div style={{position: "relative" }} className="page">
      <RefreshSpinner pullChange={pullChange} isFetching={isFetching} />
      <div className="container">
        <Header title="Books" />
        {loading ? (
          <div className="loading-card-list">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="card-list">
            {books?.map((book: Book) => (
              <Card key={book.id} book={book} />
            ))}
            {error && <p>Error: {error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
