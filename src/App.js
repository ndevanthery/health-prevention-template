import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import {createContext, useEffect, useMemo, useState} from "react";
import "./Stylesheets/App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import Results from "./pages/Results";
import NormalValues from "./pages/Admin/NormalValues";
import AddDoctor from "./pages/Admin/AddDoctor";
import HomeAdmin from "./pages/Admin/HomeAdmin";
import History from "./pages/History";
import SurveyDetails from "./pages/SurveyDetails";
import HomeDoctor from "./pages/Doctor/HomeDoctor";
import Questionnaires from "./pages/Doctor/Questionnaires";
import NewRequests from "./pages/Doctor/NewRequests";
import Page404 from "./pages/Page404";
import Footer from './pages/Footer'
import { BeatLoader } from "react-spinners";
import AvatarEditor from "./pages/AvatarEditor";


export const RoleContext = createContext({
  idRole : -1,
  setIdRole: () => {},
});

export default function App() {
  /* Current user state */
  const [currentUser, setCurrentUser] = useState(undefined);
  const [idRole, setIdRole] = useState('');
  const value = useMemo(
      () => ({ idRole, setIdRole }),
      [idRole]
  );

  /* Watch for authentication state changes */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Unsubscribe from changes when App is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  if (currentUser === undefined) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="center">
          <BeatLoader color="#8DC6FF" />
          </div>
        </header>
      </div>
    );
  }

  return (
    <>

      <div className="App">
      {/*<header className="App-header">*/}
        <RoleContext.Provider value={value}>
          <Navbar/>
        </RoleContext.Provider>
      </div>
      <div>
        <RoleContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/avatarEditor" element={<AvatarEditor />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/results/:id" element={<Results/>} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<SurveyDetails/>} />

          <Route path="homeAdmin" element={<HomeAdmin />}/>
          <Route path="/normalVal" element={<NormalValues />}/>
          <Route path="/addDoctor" element={<AddDoctor />}/>

          <Route path="/homeDoctor" element={<HomeDoctor />}/>
          <Route path="/questionnaires" element={<Questionnaires />}/>
          <Route path="/newRequest" element={<NewRequests />}/>
          {/* Page 404 */}
          <Route path="*" element={<Page404 />}/>

        </Routes>
      {/*</header>*/}
        </RoleContext.Provider>
        <Footer/>
    </div>
      </>
  );
}
