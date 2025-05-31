import HeaderPages from "../../components/header/HeaderPages";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
function HomePage(){

    const navigate = useNavigate();

    const handleFormPage =()=>{
        navigate("/formPage")
    }

    return(
        <div  className="containerHomePage">
            <HeaderPages h1Header={"ChefControl"} pHeader={"Mesas"}/>   
            <CiCirclePlus onClick={handleFormPage}/>
 
        </div>
    )
}

export default HomePage;