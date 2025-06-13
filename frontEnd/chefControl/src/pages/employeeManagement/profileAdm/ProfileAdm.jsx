import HeaderPages from "../../../components/header/HeaderPages.jsx";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "./ProfileAdm.css";
function ProfileAdm() {
    const navigate = useNavigate();
    const handleFormEmployee = () => {
        navigate("/formEmployee");
    }
    
    return (
        <div className="containerProfileAdm">
            <HeaderPages h1Header={"ChefControl"} pHeader={"Adicionar colaborador"} />
            <CiCirclePlus onClick={handleFormEmployee}/>

        </div>
    );
}
export default ProfileAdm;