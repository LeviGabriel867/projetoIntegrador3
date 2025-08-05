
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const FloatingActionButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="fab" aria-label="Adicionar funcionário">
      <FaPlus size={22} />
    </button>
  );
};

export default FloatingActionButton;