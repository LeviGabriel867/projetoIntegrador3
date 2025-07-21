import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderPages from "../../components/header/HeaderPages";
import EditOrderModal from "../../components/EditOrderModal.jsx"; 
import { FaPen, FaCheck, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import "./TablesPage.css"; 

function TablesPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [lastUpdatedId, setLastUpdatedId] = useState(null); // Estado adicionado

  const navigate = useNavigate();

  const handleAddOrder = () => navigate("/waiter");

  const handleAdvanceStatus = async (orderId) => {
    try {
      await fetch(`http://localhost:3000/api/orders/${orderId}/advance-status`, {
        method: "PATCH",
      });
    } catch (err) {
      console.error("Erro ao avançar status:", err);
    }
  };

  const handleOpenEditModal = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const handleSaveChanges = async (orderId, updateData) => {
    try {
      await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });
      handleCloseModal();
    } catch (err) {
      console.error("Erro ao salvar:", err);
    }
  };

  useEffect(() => {
    const fetchInitialOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/orders/active");
        if (!response.ok) throw new Error("Falha ao buscar pedidos");
        setOrders(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialOrders();

    const eventSource = new EventSource("http://localhost:3000/api/orders/stream");

    // Listener específico para orderUpdated
    eventSource.addEventListener('orderUpdated', (event) => {
      const updatedOrder = JSON.parse(event.data);
      setLastUpdatedId(updatedOrder.id);
      
      setOrders(prevOrders => {
        if (updatedOrder.status === "FINALIZADO") {
          return prevOrders.filter(order => order.id !== updatedOrder.id);
        }

        const existingIndex = prevOrders.findIndex(o => o.id === updatedOrder.id);
        if (existingIndex > -1) {
          const newOrders = [...prevOrders];
          newOrders[existingIndex] = updatedOrder;
          return newOrders;
        }
        return [updatedOrder, ...prevOrders];
      });

      // Remove o destaque após 1.5 segundos
      setTimeout(() => setLastUpdatedId(null), 1500);
    });

    eventSource.onerror = (err) => {
      console.error("Erro SSE:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  if (isLoading) return <div className="loadingMessage">Carregando...</div>;
  if (error) return <div className="errorMessage">Erro: {error}</div>;

  return (
    <div className="containerTablesPage">
      <HeaderPages h1Header="ChefControl" pHeader="Pedidos Ativos" />
      
      <div className="tablesList">
        {orders.length > 0 ? (
          orders.map(order => (
            <div 
              className={`tableCard ${order.id === lastUpdatedId ? 'highlight-update' : ''}`}
              key={order.id}
            >
              <strong>Mesa {order.mesa}</strong>
              <p style={{ whiteSpace: 'pre-wrap' }}>{order.descricao}</p>
              <div className={`statusBadge statusBadge--${order.status.toLowerCase()}`}>
                {order.status}
              </div>
              <div className="cardActions">
                <FaPen onClick={() => handleOpenEditModal(order)} />
                <FaCheck onClick={() => handleAdvanceStatus(order.id)} />
              </div>
            </div>
          ))
        ) : (
          <p className="loadingMessage">Nenhum pedido ativo</p>
        )}
      </div>

      <button className="addButton" onClick={handleAddOrder}>
        <IoMdAdd onClick={handleAddOrder} />
      </button>

      <EditOrderModal
        isOpen={isModalOpen}
        order={editingOrder}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
      />
    </div>
  );
}

export default TablesPage;