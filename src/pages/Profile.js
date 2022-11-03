import {auth, db} from "../initFirebase";
import {doc, getDoc} from "firebase/firestore";
import React, {useState, useEffect} from "react";
import {Link, Navigate} from "react-router-dom";
import profileEdit from '../images/profileEdit.png'
import ModalEditAvatar from "../components/ModalEditAvatar";
import {Tooltip} from "react-bootstrap";

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
                        {/*<p>Avatar: {' '}{this.props.avatarURL}</p>*/}

                        <div>
                            <Link to="/logout" className="App-link">Logout</Link>
                            <button
                                type={"button"}
                                style={{background:"none", border:"none"}}
                                onClick={(e) => {console.log("button edit clicked")}}
                            >
                                <img src={profileEdit}
                                     alt="Edit profile"
                                     style={{width: "30px"}}
                                     />
                                {/*<label>Edit your profile</label>*/}
                            </button>
                        </div>
                    </div>

                </div>

                {/*<div className="avatarDiv"><Avatar /></div>*/}

            </>

        )
    }

}


function UserFormProfile({user}) {
    // let params = useParams();
    const [openModalAvatarEdit, setOpenModalAvatarEdit] = useState(false);

    return (
        <>
            <div className='profileInfos'>
                <User {...user}></User>

                <img className='imgProfile'
                    src={user.avatarURL}
                    height= "200px"
                    alt="Sprite"
                    onClick={() => setOpenModalAvatarEdit(true)}
                />
            </div>
            <ModalEditAvatar
                open={openModalAvatarEdit}
                onClose={() => setOpenModalAvatarEdit(false)}
                user={user}
            />
            {/*<ModalEditProfil*/}
            {/*    open={openModalEditProfil}*/}
            {/*    onClose={() => setOpenModalProfilEdit(false)}*/}
            {/*    user={user}*/}
            {/*/>*/}
        </>
    )
}


export default function Profile() {
    if(auth.currentUser != null) {
        return (
            CatchUserProfile()
        )
    } else {
        return (
            <Navigate to="/Login" />
        )
    }
}

function CatchUserProfile() {

    const idUser = auth.currentUser.uid;
    let [user, setUser] = useState([]);
    console.log("idUser... : " +auth.currentUser.uid)


    const fetchUser = async() => {
        const docRef = doc(db, "users", idUser);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(await docSnap.data())

        } else {
            setUser(null);
            console.log("No such user!");
        }
    }

    useEffect( () => {
        fetchUser();
    } , [])


    return (
            <div>
                <UserFormProfile user={user} />
            </div>
    )

}

