import {useNavigate} from "react-router-dom";
import {RoleContext} from "../../App";
import {auth} from "../../initFirebase";
import edit from "../../images/editVal.png";
import check from "../../images/Checkmark.png";
import {useContext, useEffect} from "react";

export default function HomeDoctor() {
    const navigate = useNavigate();
    const role = useContext(RoleContext);

    useEffect(() => {
        checkLogin();
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const checkLogin = () => {
        if(auth.currentUser && role.idRole === 4) {

        }else {
            navigate("/")
        }
    }


    const handleClick = (e) => {
        if(e.target.name === "questionnairesBtn") {
            navigate("/questionnaires")

            return
        }
        navigate("/newRequest")
    }

    return (
        <div className="mainDiv">
            <h1>Welcome back</h1>
            <h2>What do you want to do?</h2>

            <button name="questionnairesBtn" className="buttonHome"  onClick={handleClick}><img alt="edit" className="imgButton" src={edit}/><br/>Patient Questionnaires</button>
            <button name="requestBtn" className="buttonHome"  onClick={handleClick}><img alt="check" className="imgButton" src={check}/><br/>Check new Requests</button>
        </div>
    )
}