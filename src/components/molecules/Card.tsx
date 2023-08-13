import React from "react";
import CardProps from "../../types/molecules/Card";


const Card: React.FC<CardProps> = ({ book }) => {
  return (
    <div className="card">
      <img src={book.coverImage} alt={book.title} />
      <h2>{book.title}</h2>
      <p>Discount Rate: {book.discountRate}%</p>
      <p>Price: ${book.price}</p>
    </div>
  );
};

export default Card;
