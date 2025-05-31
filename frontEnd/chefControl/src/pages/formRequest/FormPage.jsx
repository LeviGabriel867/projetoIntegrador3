import HeaderPages from "../../components/header/HeaderPages";
import { MdOutlineTableBar } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";


function FormPage() {
    
const navigate = useNavigate();

const handleTablesPage =() =>{
    navigate("/tablesPage");
}
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
                    <button type="submit" onClick={handleTablesPage}>Adicionar pedido</button>
                </form>
            </div>
        </div>
    );
}
export default FormPage;
