import React, { useEffect, useState, useCallback } from "react";
import Card from "../components/molecules/Card";
import Book from "../types/interfaces/Book";
import { getData } from "../utils/fetchData";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = useCallback(async () => {
    try {
      const fetchedBooks = await getData("books");
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div>
      <main>
        <div className="card-list">
          {books.map((book) => (
            <Card key={book.id} book={book} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
