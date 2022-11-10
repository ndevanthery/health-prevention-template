import React, {useContext} from "react";
import {Link} from "react-router-dom";
import logo from "../images/Logo.png"
import {RoleContext} from "../App";
import {Container} from "react-bootstrap";
import "../Stylesheets/Navbar.css"
import {auth} from "../initFirebase";

export default function Navbar() {

    //the navbar depends on the role the user have
    const role = useContext(RoleContext);

    const getButtons = (e) => {
        if (auth.currentUser && role.idRole === 4) // user is a doctor
            {
                return <ul className="nav-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/homeDoctor" style={{textDecoration: 'none'}}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/account" style={{textDecoration: 'none'}}>My Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/newRequest" style={{textDecoration: 'none'}}>Check New Requests</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/questionnaires" style={{textDecoration: 'none'}}>See Patient Survey</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" style={{textDecoration: 'none'}}>Logout</Link>
                    </li>
                </ul>
            }

            if (auth.currentUser && role.idRole === 5) /// user is an admin
            {
                return <ul className="nav-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/homeAdmin" style={{textDecoration: 'none'}}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/addDoctor" style={{textDecoration: 'none'}}>Add New Doctor</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/normalVal" style={{textDecoration: 'none'}}>Edit Normal Values</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" style={{textDecoration: 'none'}}>Logout</Link>
                    </li>
                </ul>
            }

            if (auth.currentUser && role.idRole === 2) { //user is a patient
                return <ul className="nav-menu">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home" style={{textDecoration: 'none'}}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/account" style={{textDecoration: 'none'}}>My Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/history" style={{textDecoration: 'none'}}>My History</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/survey" style={{textDecoration: 'none'}}>Take a Survey</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" style={{textDecoration: 'none'}}>Logout</Link>
                    </li>
                </ul>

            }
            // user is not logged in, so he is a guest
            return <ul className="nav-menu"> 
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={{textDecoration: 'none'}}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{textDecoration: 'none'}}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/survey" style={{textDecoration: 'none'}}>Take a Survey</Link>
                </li>
            </ul>
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

//to handle the hamburger behavior
function mobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
