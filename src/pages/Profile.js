import { auth, db } from "../initFirebase";
import React, { useState, useEffect } from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import ModalEditProfile from "../components/ModalEditProfile";
import { BeatLoader } from "react-spinners";
import History from "./History";
import "../Stylesheets/Profile.css";
import {doc, getDoc} from "firebase/firestore";


/**
  This class handle the user profile and data to display.
 **/
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user : props.user};
  }
  render() {
    return (
      <>
        {/*<div className="userWelcome">{formattedWelcome}</div>*/}
        <div className="userDiv" >
            <p>First name: {this.state.user.firstName}</p>
            <p>Last name: {this.state.user.lastName}</p>
            <p>Email address: {this.state.user.email}</p>

            <div>
              <Link to="/logout" className="App-link">
                Logout
              </Link>
              <button
                type={"button"}
                style={{ background: "none", border: "none" }}
                onClick={(e) => {
                  console.log("button edit clicked");
                }}
              >
              </button>
          </div>
        </div>
      </>
    );
  }
}

/**
 *
 * @param user
 * @returns {JSX.Element}
 * @constructor
 *
 * This function format the welcome message in case of none registered user
 */
function UserWelcomeTitle({user}) {
  let formattedWelcome;
  if (user.firstName != null) {
    formattedWelcome = (
        <h2 style={{ color: "#8DC6FF" }}>Welcome {user.firstName}!</h2>
    );
  } else {
    formattedWelcome = <h2>Welcome dear guest!</h2>;
  }

  return (
      <div className="userWelcome">{formattedWelcome}</div>
  )
}


/**
 *
 * @param user
 * @param onModalClose
 * @returns {JSX.Element}
 * @constructor
 *
 * This class handle the behavior (open or not) of the modal window used to
 * create or update the user's avatar.
 * Clicking on the avatar's image open the modal window to edit the avatar
 */
function UserFormProfileAvatar({ user , onModalClose }) {
  const [openModalAvatarEdit, setOpenModalAvatarEdit] = useState(false);
  const onClose = (avatarUrl) =>{
    setOpenModalAvatarEdit(false);
    onModalClose(avatarUrl);
  };
  return (
    <div className="profileInfosWrapper">
      <div className="profileInfos">

        <img
          className="imgProfile"
          src={user.avatarUrl}
          height="200px"
          alt="Avatar"
          onClick={() => setOpenModalAvatarEdit(true)}
        />
      </div>
      <ModalEditProfile
        open={openModalAvatarEdit}
        onClose={onClose}
        user={user}
      />
    </div>
  );
}

/**
 *
 * @returns {JSX.Element}
 * @constructor
 * The main function. Called from Route.
 * Responsible to catch user's data from Firestore DB
 * Display the web page components
 */
export default function Profile() {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    let idUser;
    const catchUser = () => {
        if (auth.currentUser != null) {
            idUser = auth.currentUser.uid;
        } else return navigate('/login');
    };

    const fetchUser = async () => {
        const docRef = doc(db, "users", idUser);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(docSnap.data());
        } else {
            setUser(null);
            console.log("No such user!");
        }
    };

    useEffect(() => {
        catchUser();
        fetchUser();
    }, []);


    const onModalClose = (avatarUrl) =>{
        if(!(avatarUrl === undefined) && !(avatarUrl === null))
        {
            let newUser = user;
            newUser.avatarUrl = avatarUrl;
            setUser(newUser);
        }

    };

    return user === undefined ? (<div className="App">
    <header className="App-header">
      <div className="center">
      <BeatLoader color="#8DC6FF" />
      </div>
    </header>
  </div>) : (
      <>
        <div className="profileGlobalContainer">

            <UserWelcomeTitle user={user}/>

          <div className="profileContainer">
            <div>
              <UserFormProfileAvatar user={user} onModalClose={onModalClose} />
            </div>
            <div>
              <User user = {user}></User>
            </div>
          </div>

          <div className="historyInProfile">
            <History />
          </div>

        </div>
      </>
      );


}





