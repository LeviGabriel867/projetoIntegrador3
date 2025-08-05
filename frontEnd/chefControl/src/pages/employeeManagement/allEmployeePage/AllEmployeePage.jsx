
import React, { useState, useCallback } from 'react';
import EmployeeItem from '../../../components/EmployeeItem';
import FloatingActionButton from '../../../components/FloatingActionButton';
import './AllEmployeePage.css';

const INITIAL_EMPLOYEES = [
  { id: 1, name: 'Francisco junior' },
  { id: 2, name: 'Francisco junior' },
  { id: 3, name: 'Francisco junior' },
];

function AllEmployeePage() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  const handleDelete = useCallback((id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== id)
    );
    console.log(`Deletar funcionário com ID: ${id}`);
  }, []);

  const handleEdit = useCallback((id) => {
    console.log(`Editar funcionário com ID: ${id}`);
  }, []);

  const handleAdd = () => {
    const newName = prompt('Digite o nome do novo funcionário:');
    if (newName) {
      const newEmployee = {
        id: Date.now(),
        name: newName,
      };
      setEmployees((prev) => [newEmployee, ...prev]);
    }
  };

  return (
    <div className="all-employee-page">
      <header className="page-header">
        <h1>ChefControl</h1>
        <h2>Colaboradores</h2>
      </header>

      <main className="employee-list">
        {employees.map((employee) => (
          <EmployeeItem
            key={employee.id}
            employee={employee}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </main>

      <FloatingActionButton onClick={handleAdd} />
    </div>
  );
}

export default AllEmployeePage;