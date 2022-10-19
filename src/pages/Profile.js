import {Link, useNavigate} from "react-router-dom";
import {auth, db} from "../initFirebase";
import {doc, getDoc} from "firebase/firestore";

export default function Login({currentUser}) {

    //Used for navigation
    const navigate = useNavigate();

    //Store idUser in constant for fetching infos of the user
    const idUser = currentUser.uid;

    //Retrieve document from firestore with connected user
    const fetchUser = async (e, idUser) => {
        console.log("Fetch user: " + currentUser.uid);
        try {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                console.log("UID:", currentUser.uid);
                console.log("Firstname:", docSnap.get("firstName"));
                console.log("LastName:", docSnap.get("lastName"));
                console.log("Email:", docSnap.get("email"));
                console.log("IdRole:", docSnap.get("idRole"));
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <h1>Welcome {currentUser.email}</h1>
                {/* Get data from user*/}
                <button onClick={fetchUser}>See my infos</button>
                <div><br/></div>
                {/* Logout */}
                <Link to="/logout" className="App-link">Logout</Link>
            </div>
        </>

    );
}