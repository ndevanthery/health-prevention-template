import {signInWithEmailAndPassword} from "firebase/auth";
import UserFormLogin from "../components/UserFormLogin";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import loginBackground from "../images/Login.jpg";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "../initFirebase";

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
        <Container>
            <img src={loginBackground} style={{width: "30%", borderRadius:"10px", padding:"5%"}}/>
            <div className="mainDivLogin">
                <h1 className="mainTitleLogin">Login</h1>
                <UserFormLogin handleSubmit={handleLogin} submitButtonLabel="Sign In"/>
            </div>
        </Container>
    );
}

const Container = styled.div`
  background: #61dafb;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 2%;
  border-radius: 50px;
  

  
`;