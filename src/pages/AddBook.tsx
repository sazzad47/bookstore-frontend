import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';


const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [discountRate, setDiscountRate] = useState<number | ''>('');
 

  const handleAddBook = () => {
   
  };

  return (
    <div>
      <main>
        <form>
          <Input
            type="text"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Discount Rate"
            type="number"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.valueAsNumber)}
          />
          <Button onClick={handleAddBook}>Add Book</Button>
        </form>
      </main>
    </div>
  );
};

export default AddBook;
