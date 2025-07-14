// src/pages/OrdersPage.jsx

import { useState, useEffect } from "react";
import HeaderPages from "../../components/header/HeaderPages";
import { FaPen, FaCheck, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import "./TablesPage.css"; // Reutilizando o mesmo CSS

function TablesPage() {
  // --- ESTADO DO COMPONENTE ---
  // 'orders' armazena a lista de pedidos vinda da API
  const [orders, setOrders] = useState([]);
  // 'isLoading' controla a exibição da mensagem de carregamento
  const [isLoading, setIsLoading] = useState(true);
  // 'error' armazena qualquer erro que ocorra durante a busca
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Função para navegar para a página de formulário (mantida do seu exemplo)
  const handleAddOrder = () => {
    navigate("/formPage");
  };

  // --- EFEITO PARA BUSCAR DADOS DA API ---
  // O useEffect com o array de dependências vazio [] é executado apenas uma vez,
  // quando o componente é montado na tela.
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // IMPORTANTE: Substitua 'http://localhost:3001' pela URL do seu backend se for diferente.
        // Usamos a rota '/orders/active' que criamos no backend.
        const response = await fetch("http://localhost:3000/api/orders/active");

        if (!response.ok) {
          throw new Error("Falha ao buscar os dados da API");
        }

        const data = await response.json();
        setOrders(data); // Armazena os pedidos no estado
      } catch (err) {
        setError(err.message); // Armazena a mensagem de erro no estado
      } finally {
        setIsLoading(false); // Garante que o 'loading' termine, com ou sem erro.
      }
    };

    fetchOrders(); // Chama a função de busca
  }, []); // O array vazio [] garante que isso rode apenas uma vez.

  // --- RENDERIZAÇÃO CONDICIONAL ---
  if (isLoading) {
    return <div className="loadingMessage">Carregando pedidos...</div>;
  }

  if (error) {
    return <div className="errorMessage">Erro: {error}</div>;
  }

  // --- RENDERIZAÇÃO PRINCIPAL ---
  return (
    <div className="containerTablesPage">
      {/* O Header foi alterado para refletir que estamos vendo 'Pedidos' */}
      <HeaderPages h1Header={"ChefControl"} pHeader={"Pedidos Ativos"} />

      <div className="tablesList">
        {orders.length > 0 ? (
          orders.map((order) => (
            // A 'key' agora usa o 'id' único que vem do MongoDB
            <div className="tableCard" key={order.id}>
              {/* Exibindo os dados do pedido que vêm da API */}
              <strong>Mesa {order.mesa}</strong>
              <p>{order.descricao}</p>

              {/* Adicionamos uma tag para mostrar o status do pedido */}
              <div className="statusBadge">{order.status}</div>

              <div className="cardActions">
                <FaPen />
                <FaCheck />
                <FaTrash />
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum pedido ativo no momento.</p>
        )}
      </div>

      <button className="addButton" onClick={handleAddOrder}>
        <IoMdAdd />
      </button>
    </div>
  );
}

export default TablesPage;