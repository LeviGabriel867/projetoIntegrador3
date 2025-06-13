import { useState } from "react";
import HeaderPages from "../../components/header/HeaderPages";
import { MdOutlineTableBar } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";

function FormPage() {
    const navigate = useNavigate();
    const [pedidoEnviado, setPedidoEnviado] = useState(false);

    const handleTablesPage = () => {
        navigate("/tablesPage");
    };

    const chamarAnimação = (e) => {
        e.preventDefault(); 
        setPedidoEnviado(true);

        setTimeout(() => {
            setPedidoEnviado(false); 
        }, 2000);
    };

    return (
        <div className='ConteinerFormPage'>
            <HeaderPages h1Header={'ChefControl'} pHeader={"Pedidos"} />
            <div className="ContainerFormRequests">
                <form>
                    <div className="inputGroup">
                        <MdOutlineTableBar />
                        <input type="text" name="table" id="table" placeholder="Mesa" />
                    </div>
                    <div className="inputGroup">
                        <IoFastFoodOutline />
                        <input type="text" name="request" id="request" placeholder="Pedido" />
                    </div>
                    <button type="submit" onClick={chamarAnimação}>Adicionar pedido</button>
                    <button type="submit" onClick={handleTablesPage}>Visualizar pedidos</button>
                </form>

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
