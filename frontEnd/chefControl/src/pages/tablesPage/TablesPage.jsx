// src/pages/OrdersPage.jsx (VERSÃO CORRIGIDA)

import { useState, useEffect } from "react";
import HeaderPages from "../../components/header/HeaderPages";
import { FaPen, FaCheck, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import "./TablesPage.css";

function TablesPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate("/formPage");
  };

  const handleAdvanceStatus = async (orderId) => {
    try {
      // CORREÇÃO 1: Adicionado o prefixo /api na URL
      await fetch(
        `http://localhost:3000/api/orders/${orderId}/advance-status`,
        {
          method: "PATCH",
        }
      );
    } catch (err) {
      console.error(
        "Falha ao enviar comando para avançar o status do pedido:",
        err
      );
    }
  };

  useEffect(() => {
    const fetchInitialOrders = async () => {
      try {
        // CORREÇÃO 2: Adicionado o prefixo /api na URL
        const response = await fetch("http://localhost:3000/api/orders/active");
        if (!response.ok) {
          throw new Error("Falha ao buscar os dados da API");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialOrders();

    // CORREÇÃO 3: URL do EventSource corrigida para a rota de stream e com o prefixo /api
    const eventSource = new EventSource(
      "http://localhost:3000/api/orders/stream"
    );

    eventSource.onmessage = (event) => {
      console.log("MENSAGEM SSE RECEBIDA!", event.data);

      const updatedOrder = JSON.parse(event.data);
      console.log("PEDIDO PROCESSADO:", updatedOrder);

      setOrders((prevOrders) => {
        if (updatedOrder.status === "FINALIZADO") {
          return prevOrders.filter((order) => order.id !== updatedOrder.id);
        }

        const existingOrderIndex = prevOrders.findIndex(
          (order) => order.id === updatedOrder.id
        );

        if (existingOrderIndex > -1) {
          const newOrders = [...prevOrders];
          newOrders[existingOrderIndex] = updatedOrder;
          return newOrders;
        } else {
          return [updatedOrder, ...prevOrders];
        }
      });
    };

    eventSource.onerror = (err) => {
      console.error("Erro na conexão com o servidor (EventSource):", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // --- RENDERIZAÇÃO (sem alterações) ---
  if (isLoading) {
    return <div className="loadingMessage">Carregando pedidos...</div>;
  }
  if (error) {
    return <div className="errorMessage">Erro: {error}</div>;
  }

  return (
    <div className="containerTablesPage">
      <HeaderPages h1Header={"ChefControl"} pHeader={"Pedidos Ativos"} />
      <div className="tablesList">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="tableCard" key={order.id}>
              <strong>Mesa {order.mesa}</strong>
              <p>{order.descricao}</p>
              <div
                className={`statusBadge statusBadge--${order.status.toLowerCase()}`}
              >
                {order.status}
              </div>
              <div className="cardActions">
                <FaPen />
                <FaCheck onClick={() => handleAdvanceStatus(order.id)} />
              </div>
            </div>
          ))
        ) : (
          <p className="loadingMessage">Nenhum pedido ativo no momento.</p>
        )}
      </div>
      <button className="addButton" onClick={handleAddOrder}>
        <IoMdAdd />
      </button>
    </div>
  );
}

export default TablesPage;
