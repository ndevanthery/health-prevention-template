import { auth, db } from "../initFirebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import profileEdit from "../images/profileEdit.png";
import ModalEditProfile from "../components/ModalEditProfile";
import { BeatLoader } from "react-spinners";
import History from "./History";
import "../Stylesheets/Profile.css";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user : props.user};
  }

  //handle events...

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

function UserFormProfileAvatar({ user , onModalClose }) {
  const [openModalAvatarEdit, setOpenModalAvatarEdit] = useState(false);
  const onClose = (avatarUrl) =>{
    setOpenModalAvatarEdit(false);
    onModalClose(avatarUrl);
    console.log("user form profile");
    console.log(avatarUrl);
  };
  return (
    <div className="profileInfosWrapper">
      <div className="profileInfos">
        {/*<User {...user}></User>*/}

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

export default function Profile() {
  const [user, setUser] = useState();
  let idUser = auth.currentUser.uid;

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


  const catchUser = () => {
    if (auth.currentUser == null) return <Navigate to="/Login" />;
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


    console.log("user is defined now :)")
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





