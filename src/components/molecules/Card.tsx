import React from "react";
import CardProps from "../../types/molecules/Card";
import Image from "../atoms/Image";

const Card: React.FC<CardProps> = ({ book }) => {
  return (
    <div className="card">
      <Image src={book.coverImage} alt="cover-image" className="cover-image" />
      <div className="info">
        <div className="title"> {book.title} </div>
        <div className="price-box">
          <div className="discount"> {book.discountRate}%</div>
          <div className="price">
            <div className="value"> {book.price} </div>
            <div className="currency">원</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
