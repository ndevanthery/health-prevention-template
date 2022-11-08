import React, {useContext} from "react";
import {Link} from "react-router-dom";
import logo from "../images/Logo.png"
import {RoleContext} from "../App";
import {auth, db} from "../initFirebase";
import {doc, getDoc} from "firebase/firestore";
import {useState} from "react";
import {useEffect} from "react";
import {Container} from "react-bootstrap";
import "../Stylesheets/Navbar.css"

export default function Navbar() {
    let [user, setUser] = useState();

    useEffect(() => {
            fetchUser();
        }, []
    );

    const fetchUser = async () => {
        const idUser = auth.currentUser.uid;

        const docRef = doc(db, "users", idUser);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(await docSnap.data());
        }
        return null;
    };

    const getButtons = () => {
        console.log(user);
        if (user) {
            if (user.idRole === 4) // user is a doctor
            {
                return <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="/homeDoctor" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/account" className="nav-link">My Profile</a>
                    </li>
                    <li className="nav-item">
                        <a href="/newRequest" className="nav-link">Check new requests</a>
                    </li>
                    <li className="nav-item">
                        <a href="/questionnaires" className="nav-link">See Patient Survey</a>
                    </li>
                    <li className="nav-item">
                        <a href="/logout" className="nav-link">Log out</a>
                    </li>
                </ul>
            }

            if (user.idRole === 5) /// admin
            {
                return <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="/homeAdmin" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/addDoctor" className="nav-link">Add new Doctor</a>
                    </li>
                    <li className="nav-item">
                        <a href="/normalVal" className="nav-link">Edit Normal Values</a>
                    </li>
                    <li className="nav-item">
                        <a href="/logout" className="nav-link">Log out</a>
                    </li>
                </ul>
            }

            if (user.idRole === 2) {
                return <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="/home" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                    <a href="/account" className="nav-link">My profile</a>
                    </li>
                    <li className="nav-item">
                        <a href="/history" className="nav-link">My history</a>
                    </li>
                    <li className="nav-item">
                        <a href="/survey" className="nav-link">Take a Survey</a>
                    </li>
                    <li className="nav-item">
                        <a href="/logout" className="nav-link">Log out</a>
                    </li>
                </ul>

            }
        } else // no user logged in
        {
            return <ul className="nav-menu">
                <li className="nav-item">
                    <a href="/" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/login" className="nav-link">Login</a>
                </li>
                <li className="nav-item">
                    <a href="/survey" className="nav-link">Take a Survey</a>
                </li>
            </ul>
        }
    };

    return (
        <Container>
            <nav className="navbar">
                <Link to="/home">
                    <img className="logo_app" src={logo} alt="Logo"/>
                </Link>
                {getButtons()}
                <div className="hamburger" onClick={mobileMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </Container>
    );
}


function mobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
