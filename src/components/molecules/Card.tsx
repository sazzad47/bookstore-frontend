import React from "react";
import CardProps from "../../types/molecules/Card";

const Card: React.FC<CardProps> = ({ book }) => {
  return (
    <div className="card">
      <div className="cover-image">
        <img
          className="imagesmode"
          alt="Imagesmode"
          src="https://anima-uploads.s3.amazonaws.com/projects/64da47c09e7225f2aa1a3abe/releases/64da4831b7c090d6dedf5155/img/imagesmode@2x.png"
        />
      </div>
      <div className="info">
        <div className="name"> {book.title} </div>
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
