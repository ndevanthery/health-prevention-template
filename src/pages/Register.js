import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../initFirebase";
import {Link, useNavigate} from "react-router-dom";
import UserFormRegister from "../components/UserFormRegister";
import swal from "sweetalert";
import loginBackground from "../images/Login.jpg";
import UserFormLogin from "../components/UserFormLogin";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (e, firstName, lastName, email, password) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("new userid : " + auth.currentUser.uid);
            await handleCreateNewUser(firstName, lastName, email);
            swal("Welcome to our App!", "Thanks for your registration", "success");
            navigate("/");
        } catch (error) {
            console.error("Register error : " + error);
        }
    };

    const handleCreateNewUser = async (firstName, lastName, email) => {

        console.log("auth.currentUser.uid : " + auth.currentUser.uid + " My email is : " + email);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: email,
            idRole: 2,
            firstName: firstName,
            lastName: lastName,
        });
    };

    return (
            <div className="mainDivLogin">
                <h1 className="mainTitleLogin">Create your patient account</h1>

                {/* Div containing the image on the right */}
                <div className="divImageLogin">
                    <img className="imageLogin" src={loginBackground}
                         style={{width: "100%", borderRadius: "10px", padding: "5%"}}/>
                </div>

                {/* Div containing the Login form on the left*/}
                <div className="divInfoLogin">
                    <UserFormRegister handleSubmit={handleRegister} submitButtonLabel="Register"/>
                </div>
            </div>
    );
}
