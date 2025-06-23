
import React from 'react';
import { FaUserCircle, FaPencilAlt, FaTrash } from 'react-icons/fa';

const EmployeeItem = React.memo(({ employee, onEdit, onDelete }) => {
  return (
    <div className="employee-item">
      <div className="employee-item__info">
        <FaUserCircle size={24} className="employee-item__avatar" />
        <span className="employee-item__name">{employee.name}</span>
      </div>
      <div className="employee-item__actions">
        <button
          onClick={() => onEdit(employee.id)}
          className="action-button"
          aria-label={`Editar ${employee.name}`}
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={() => onDelete(employee.id)}
          className="action-button action-button--delete"
          aria-label={`Deletar ${employee.name}`}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
});

export default EmployeeItem;