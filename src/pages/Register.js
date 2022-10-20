import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import { auth, db} from "../initFirebase";
import { useNavigate } from "react-router-dom";
import UserFormRegister from "../components/UserFormRegister";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (e, firstName, lastName, email, password) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("new userid : " + auth.currentUser.uid);
            await handleCreateNewUser(firstName, lastName, email);

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
            firstname: firstName,
            lastName: lastName,
        });
    };

    return (
        <div>
            <h1>Register</h1>
            <UserFormRegister handleSubmit={handleRegister} submitButtonLabel="Register"/>
        </div>
    );
}
