import HeaderPages from "../../components/header/HeaderPages";
import { FaPen, FaCheck, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import "./TablesPage.css";

function TablesPage() {
  const tables = [
    { id: 1, name: "Mesa 1", order: "1 pizza  calabresa, 1 pepsi 1L" },
    { id: 2, name: "Mesa 2", order: "1 pizza  calabresa, 1 pepsi 1L" },
    { id: 3, name: "Mesa 3", order: "1 pizza  calabresa, 1 pepsi 1L" },
    { id: 4, name: "Mesa 4", order: "1 pizza  calabresa, 1 pepsi 1L" },
  ];

  return (
    <div className="containerTablesPage">
      <HeaderPages h1Header={"ChefControl"} pHeader={"Mesas"} />

      <div className="tablesList">
        {tables.map((table) => (
          <div className="tableCard" key={table.id}>
            <strong>{table.name}</strong>
            <p>{table.order}</p>
            <div className="cardActions">
              <FaPen />
              <FaCheck />
              <FaTrash />
            </div>
          </div>
        ))}
      </div>

      <button className="addButton">
        <IoMdAdd />
      </button>
    </div>
  );
}

export default TablesPage;
