import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../initFirebase";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Return: " + await getUserRole(email))
      switch (await getUserRole(email)) {
        case 5:
          navigate("/homeAdmin");
          return;
        default:
          navigate("/");
      }
    } catch (e) {
      console.error(e);
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
    <div>
      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} submitButtonLabel="Login" />
    </div>
  );
}
