import UserForm from "../components/UserForm";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";

import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "../initFirebase";

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

    }

    return (
        <div>
            <h1>Register</h1>
            <UserForm handleSubmit={handleRegister} submitButtonLabel="Register"/>
        </div>
    );
}
