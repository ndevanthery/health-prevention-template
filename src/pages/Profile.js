import { auth, db } from "../initFirebase";
import React, {useState, useEffect, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import History from "./History";
import "../Stylesheets/Profile.css";
import {doc, getDoc} from "firebase/firestore";
import {RoleContext} from "../App";


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
        <div className="userDiv" >
            <p>First name: {this.state.user.firstName}</p>
            <p>Last name: {this.state.user.lastName}</p>
            <p>Email address: {this.state.user.email}</p>

            <div>
              <Link to="/logout" className="buttonSubmitForm" style={{margin:'0%'}}>
                Logout
              </Link>
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
  const navigate = useNavigate();

  return (
    <div className="profileInfosWrapper">
      <div className="profileInfos">

        <img
          className="imgProfile"
          src={user.avatarUrl}
          height="200px"
          alt="Avatar"
          onClick={() => navigate('/avatarEditor')}
        />
      </div>
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
    const role = useContext(RoleContext);

    const catchUser = () => {
        if (auth.currentUser && (role.idRole === 2 || role.idRole === 4)) {

        } else {
            navigate("/")
        }
    }

    const fetchUser = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data())
            setUser(docSnap.data());
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        catchUser();
        fetchUser();
    }, []);

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
              <UserFormProfileAvatar user={user}  />
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





