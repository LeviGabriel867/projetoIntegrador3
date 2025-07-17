// src/pages/formRequest/FormPage.jsx (VERSÃO CORRIGIDA)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPages from "../../components/header/HeaderPages";
import { MdOutlineTableBar } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

import "./FormPage.css";

function FormPage() {
  const navigate = useNavigate();

  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const [order, setOrder] = useState({
    mesa: "",
    descricao: "",
  });
  const [error, setError] = useState("");

  const handleLogout = () => {


    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError("");

    const url = `${import.meta.env.VITE_API_URL}/api/orders`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao enviar o pedido.");
      }

      setPedidoEnviado(true);
      setOrder({ mesa: "", descricao: "" });

      setTimeout(() => {
        setPedidoEnviado(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTablesPage = () => {
    navigate("/waiter/tables");
  };

  return (
    <div className="ConteinerFormPage">
      <HeaderPages h1Header="ChefControl" pHeader="Pedidos" />
      
      {/* O ícone de Home agora chama a função de logout corrigida */}
      <FaHome onClick={handleLogout} className="logoutIcon" /> 

      <div className="ContainerFormRequests">
        <form onSubmit={handleSubmitOrder} className="formRequest">
          <div className="inputGroup">
            <MdOutlineTableBar />
            <input
              type="text"
              name="mesa"
              id="mesa"
              placeholder="Mesa"
              value={order.mesa}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputGroup">
            <IoFastFoodOutline />
            <input
              type="text"
              name="descricao"
              id="descricao"
              placeholder="Pedido"
              value={order.descricao}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Adicionar pedido</button>
        </form>

        <button className="buttonOrder" onClick={handleTablesPage}>
          Visualizar pedidos
        </button>

        {pedidoEnviado && (
          <div className="mensagem-enviada">
            <FaCheckCircle className="icone-check" />
            Pedido Enviado!
          </div>
        )}
      </div>
    </div>
  );
}

export default FormPage;