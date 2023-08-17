import React from 'react';
import CardProps from '../../types/molecules/Card'; // Import the necessary props interface
import Image from '../atoms/Image';

// Define the Card component
const Card: React.FC<CardProps> = ({ book }) => {
  return (
    // Use a div with the "card" class to encapsulate the card
    <div className="card">
      {/* Render the cover image using the Image component */}
      <Image src={book.coverImage} alt="cover-image" className="cover-image" />
      <div className="info">
        <div className="title"> {book.title} </div> {/* Render the book title */}
        <div className="price-box">
          <div className="discount"> {book.discountRate}%</div> {/* Render the discount rate */}
          <div className="price">
            <div className="value"> {book.price} </div> {/* Render the book price */}
            <div className="currency">원</div> {/* Render the currency */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
