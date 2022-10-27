import {auth, db} from "../initFirebase";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import React, {useState, useEffect} from "react";
import Avatar from "../components/Avatar";
import {Link} from "react-router-dom";

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
            <>
                <div className="userDiv" style={{backgroundColor: "gray"}} >

                    <div className="User-header">
                        {formattedWelcome}
                        <p>First name: {' '}{this.props.firstName}</p>
                        <p>Last name: {' '}{this.props.lastName}</p>
                        <p>Email address: {' '}{this.props.email}</p>

                        {/*<div>*/}
                        {/*    <img src={Avatar.avatarUrl} height= "200px" alt="Sprite"/>*/}
                        {/*</div>*/}

                        <div>
                            <Link to="/logout" className="App-link">Logout</Link>
                        </div>

                    </div>
                </div>
                <div className="avatarDiv"><Avatar /></div>

            </>

        )
    }

}

function UserFormProfile({user}) {
    // let params = useParams();
    return <User {...user}
    />
}


export default function Profile() {

    const idUser = auth.currentUser.uid;
    let [user, setUser] = useState([]);
    console.log("idUser... : " +auth.currentUser.uid)
    let avatar = new Avatar();
    let avatURL = avatar.buildApiUrl();
    console.log("Avatar : " +avatURL);


    const updateAvatar = async() => {
        const avatarUrl = doc(db, "users", idUser);
        // Set the url of the user's avatar
        await updateDoc(avatarUrl, {
            avatarURL: avatar.buildApiUrl()
        });
    }

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
        updateAvatar();
        console.log("Avatar url updated to: " + avatURL)
    },[])

    useEffect( () => {
        fetchUser();
    } , [])


    return (
        <div>
            <UserFormProfile user={user} />
        </div>
    )

}

