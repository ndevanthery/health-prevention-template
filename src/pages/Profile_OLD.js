import {Link, useNavigate} from "react-router-dom";
import {auth, db} from "../initFirebase";
import {doc, getDoc} from "firebase/firestore";
import React, {useState, useEffect} from "react";

//==========================================================
// class User extends React.Component{
//     constructor() {
//         super();
//
//         //build the currentUser object
//         this.state = {
//             myUser: this.currentUser
//         }
//         // this.email = email;
//         // this.firstname = firstname;
//         // this.lastname = lastname;
//         // this.idRole = idRole;
//     }
//
//     myUser = GetCurrentUser();
//
//     currentUser = { email: this.myUser.email, firstName: this.myUser.firstName, lastName: this.myUser.lastName, idRole: this.myUser.idRole, avatarURL: this.myUser.avatarURL}
//
//     toString() {
//         return this.state.firstName + " " + this.state.lastName;
//     }
//
//     render() {
//         return (
//             <>
//             <form>
//                 <FormInput type="text" name="firstnameInput" value={this.state.firstName} disabled={true} style={{border: 'none'}} />
//             </form>
//
//             </>
//         );
//     }
//
// }
//
// function GetCurrentUser() {
//     //Store idUser in constant for fetching infos of the user
//     let idUser = auth.currentUser.uid;
//
//     //Retrieve document from firestore with connected user
//     let [user, setUser] = useState([]);
//
//     useEffect( () => {
//         fetchUser();
//     } , [])
//
//     const fetchUser = async() => {
//         const docRef = doc(db, "users", idUser);
//         const docSnap = await getDoc(docRef);
//         let myUser = new User();
//
//         if (docSnap.exists()) {
//             setUser(await docSnap.data())
//             console.log("User DATA from docSnap.data(): " +user);
//             myUser.setState({
//                 email: docSnap.get("email"),
//                 firstName: docSnap.get("firstName"),
//                 lastName: docSnap.get("lastName"),
//                 idRole: docSnap.get("idRole"),
//                 avatarURL: docSnap.get("avatarURL")
//             });
//
//             return myUser;
//
//         } else {
//             setUser(null);
//             console.log("No such document!");
//         }
//         console.log("My data: " +docSnap.get("firstName"));
//     }
// }

//==========================================================

export default function Profile_OLD() {

    //Used for navigation
    const navigate = useNavigate();

    //Store idUser in constant for fetching infos of the user
    const idUser = auth.currentUser.uid;

    //Retrieve document from firestore with connected user
    const[user, setUser] = useState([]);

    useEffect( () => {
        fetchUser();
        } , [])

    const fetchUser = async() => {
        const docRef = doc(db, "users", idUser);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(await docSnap.data())
            console.log("User DATA from docSnap.data(): " +user);

        } else {
            setUser(null);
            console.log("No such document!");
        }
        console.log("My data: " +docSnap.get("firstName"));
    }

    useEffect(() => {
        fetchUser();
        },[] )


    const firstname = user.firstName;
    console.log("first name: " +firstname);
    const lastname = user.lastName;
    const idRole = user.idRole;

    return (
        <>
            <div>
                <h1>Welcome {firstname}</h1>

                <div>Firstname:{' '}
                <input type="text" name="firstnameInput" value={firstname} disabled={true} style={{border: 'none'}} />
                </div>
                {/*<button onClick={fetchUser}>See my infos</button>*/}
                <div><br/></div>
                {/* Logout */}
                <Link to="/logout" className="App-link">Logout</Link>
            </div>
        </>

    );
}

function FormInput({type, name, value, disableBoolean}) {
    return (
        <>
            type = {type}
            name = {name}
            value = {value}
            disabled = {disableBoolean}
        </>
    )
}