import {signInWithEmailAndPassword} from "firebase/auth";
import UserFormLogin from "../components/UserFormLogin";
import {Link, useNavigate} from "react-router-dom";
import loginBackground from "../images/Login.jpg";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "../initFirebase";
import {useContext} from "react";
import {RoleContext} from "../App";
import swal from 'sweetalert';

export default function Login() {
    const navigate = useNavigate();
    let { idRole, setIdRole} = useContext(RoleContext)

    const handleLogin = async (e, email, password) => {
        e.preventDefault();

        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log("Return: " + await getUserRole(email));

          let userRole = await getUserRole(email);
          setIdRole(userRole);

          switch (userRole) {
            case 5:
              navigate("/homeAdmin");
              return;
            case 4:
              navigate("/homeDoctor")
              return;
            default:
              navigate("/");
          }
        } catch (e) {
          console.error(e);
          swal("Something went wrong...", "Control your email or password", "error");
        }
    };

    const getUserRole = async (email) => {
        let idRole = 0;
        try {
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.get("idRole"));
                idRole = doc.get("idRole");
            });
            if (querySnapshot.empty) {
                console.log("Empty")
            }

        } catch (error) {
            console.error(error);
        }
        return idRole;
    }
    return (
        <div className="mainDivLogin">
            <h1 className="mainTitleLogin">Connect to your account</h1>

            {/* Div containing the image on the right */}
            <div className="divImageLogin">
                <img className="imageLogin" src={loginBackground}
                     style={{width: "100%", borderRadius: "10px", padding: "5%"}}/>
            </div>

            {/* Div containing the Login form on the left*/}
            <div className="divInfoLogin">
                <UserFormLogin handleSubmit={handleLogin} submitButtonLabel="Sign In"/>
                <br/><br/>
                <span className="noAccountText" style={{marginLeft: "20%"}}>Don't have an account? </span>
                <Link to="/register" className="App-link">Sign Up</Link>
            </div>
        </div>
    );
}