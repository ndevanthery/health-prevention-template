import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import UserFormLogin from "../components/UserFormLogin";
import { auth, db} from "../initFirebase";
import { useNavigate } from "react-router-dom";
import UserFormRegister from "../components/UserFormRegister";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (e, email, password) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("new userid : " + auth.currentUser.uid);
            await handleCreateNewUser(email);

            navigate("/");
        } catch (error) {
            console.error("Register error : " + error);
        }
    };

    const handleCreateNewUser = async (email) => {

        console.log("auth.currentUser.uid : " + auth.currentUser.uid + " My email is : " + email);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
            email: email,
            idRole: 2,
            firstname: "",
            lastName: "",
        });

//  const handleRegister = async (e, firstName, lastName, email, password) => {
//    e.preventDefault();
//    console.log(firstName, " ", lastName, " ", email, " ", password);


    return (
        <div>
            <h1>Register</h1>
            <UserFormRegister handleSubmit={handleRegister} submitButtonLabel="Register"/>
        </div>
    );
  };
}
