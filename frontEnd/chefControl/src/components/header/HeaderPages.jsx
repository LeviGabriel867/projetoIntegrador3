import "./HeaderPages.css"
function HeaderPages({h1Header, pHeader }){
    return(
        <div className="containerHeaderPages">
            <h1>{h1Header}</h1>
            <p>{pHeader}</p>
        </div>
    )
}
export default HeaderPages;