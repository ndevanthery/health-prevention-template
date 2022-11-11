import {useNavigate} from "react-router-dom";
import '../../Stylesheets/Admin.css';
import doctor from '../../images/doctor.png'
import edit from '../../images/editVal.png'
import {useContext, useEffect} from "react";
import {auth} from "../../initFirebase";
import {RoleContext} from "../../App";


export default function HomeAdmin() {
    const navigate = useNavigate();
    const role = useContext(RoleContext);

    useEffect(() => {
        checkLogin();
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkLogin = () => {
        if (auth.currentUser && role.idRole === 5) {

        } else {
            navigate("/")
        }
    }


    const handleClick = (e) => {
        if (e.target.name === "editBtn") {
            navigate("/normalVal")

            return
        }
        navigate("/addDoctor")
    }

    return (
        <div className="mainDiv">
            <h1>Welcome back Admin</h1>
            <h2>What do you want to do?</h2>

            <button name="editBtn" className="buttonHome" onClick={handleClick}><img alt="edit" className="imgButton"
                                                                                                   src={edit}/><br/>Edit
                normal Values
            </button>
            <button name="doctorBtn" className="buttonHome" onClick={handleClick}><img
                alt="doctor" className="imgButton" src={doctor}/><br/>Create a new Doctor
            </button>
        </div>
    )
}
