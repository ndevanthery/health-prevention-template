import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../initFirebase";
import { useNavigate} from "react-router-dom";
import UserFormRegister from "../components/UserFormRegister";
import swal from "sweetalert";
import loginBackground from "../images/Login.jpg";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (e, firstName, lastName, email, password) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            await handleCreateNewUser(firstName, lastName, email);
            swal("Welcome to our App!", "Thanks for your registration", "success");
            navigate("/");
        } catch (error) {
            console.error("Register error : " + error);
        }
    };

    const handleCreateNewUser = async (firstName, lastName, email) => {

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: email,
            idRole: 2,
            firstName: firstName,
            lastName: lastName,
            avatarUrl: "https://avatars.dicebear.com/api/avataaars/2.svg?top=longHair&hairColor=auburn&clothes=blazer&clothesColor=black&eyes=default&eyebrow=default&mouth=default&skin=pale"
        });
    };

    return (
            <div className="mainDivLogin">
                <h1 className="mainTitleLogin">Create your patient account</h1>

                {/* Div containing the image on the right */}
                <div className="divImageLogin">
                    <img alt="background" className="imageLogin" src={loginBackground}
                         style={{width: "100%", borderRadius: "10px", padding: "5%"}}/>
                </div>

                {/* Div containing the Login form on the left*/}
                <div className="divInfoLogin">
                    <UserFormRegister handleSubmit={handleRegister} submitButtonLabel="Register"/>
                </div>
            </div>
    );
}
