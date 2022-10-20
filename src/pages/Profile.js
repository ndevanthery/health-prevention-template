import {BrowserRouter, Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import {auth, db} from "../initFirebase";
import {doc, getDoc} from "firebase/firestore";
import React, {useState, useEffect} from "react";

class User extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    //handle events...

    render() {

        let formattedWelcome;
        if(this.props.firstName != null) {
            formattedWelcome = (
                <h2 style={{color: "lightblue"}}>Welcome {' '}{this.props.firstName}!</h2>
            );
        } else {
            formattedWelcome = <h2>Welcome dear guest!</h2>
        }

        return (
            <div className="User" style={{backgroundColor: "gray"}} >

                <header className="User-header">
                    {formattedWelcome}
                    <p>First name : {' '}{this.props.firstName}</p>
                    <p>Last name : {' '}{this.props.lastName}</p>
                    <p>Email address : {' '}{this.props.email}</p>
                    {/*<p>First name : {' '}{this.props.avatarURL}</p>*/}

                </header>

            </div>

        )
    }

}

function UserFormProfile({user}) {
    let params = useParams();
    return <User {...user}
        />
}


export default function Profile() {

    const idUser = auth.currentUser.uid;
    let [user, setUser] = useState([]);



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

    //==== this part was before "const fetchUser = async() ..." =======
    useEffect( () => {
        fetchUser();
    } , [])
    //======================================

    //let updateUser ?? (instead of addBook, l. 321)


    return (

            <div>
                <UserFormProfile user={user} />
                <div><br/></div>
                {/* Logout */}
                <Link to="/logout" className="App-link">Logout</Link>
            </div>


    )

}

