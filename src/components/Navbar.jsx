import React, {useContext} from "react";
import {Link} from "react-router-dom";
import logo from "../images/Logo.png"
import styled from "styled-components";
import {RoleContext} from "../App";
import {auth} from "../initFirebase";

export default function Navbar() {
    const role = useContext(RoleContext);

    const listElements = () => {
        console.log(role.idRole)
        if(auth.currentUser && role.idRole === 2) {
            return <ul>
                <Link to="/home">
                    <img className="logo_app" src={logo} alt="Logo"/>
                </Link>
                <li>
                    <Link className="links" to="/logout" style={{textDecoration: 'none'}}>Logout</Link>
                </li>
                <li>
                    <Link className="links" to="/survey" style={{textDecoration: 'none'}}>Take a Survey</Link>
                </li>
                <li>
                    <Link className="links" to="/history" style={{textDecoration: 'none'}}>My history</Link>
                </li>
                <li>
                    <Link className="links" to="/account" style={{textDecoration: 'none'}}>My profile</Link>
                </li>
                <li>
                    <Link className="links" to="/" style={{textDecoration: 'none'}}>Home</Link>
                </li>
            </ul>
        }else if(auth.currentUser && role.idRole === 5) {
            return <ul>
                <Link to="/home">
                    <img className="logo_app" src={logo} alt="Logo"/>
                </Link>
                <li>
                    <Link className="links" to="/logout" style={{textDecoration: 'none'}}>Logout</Link>
                </li>
                <li>
                    <Link className="links" to="/normalVal" style={{textDecoration: 'none'}}>Edit Normal Values</Link>
                </li>
                <li>
                    <Link className="links" to="/addDoctor" style={{textDecoration: 'none'}}>Add new Doctor</Link>
                </li>
                <li>
                    <Link className="links" to="/homeAdmin" style={{textDecoration: 'none'}}>Home</Link>
                </li>
            </ul>
        }
        return <ul>
            <Link to="/home">
                <img className="logo_app" src={logo} alt="Logo"/>
            </Link>
            <li>
                <Link className="links" to="/survey" style={{textDecoration: 'none'}}>Take a Survey</Link>
            </li>
            <li>
                <Link className="links" to="/register" style={{textDecoration: 'none'}}>Register</Link>
            </li>
            <li>
                <Link className="links" to="/login" style={{textDecoration: 'none'}}>Login</Link>
            </li>
            <li>
                <Link className="links" to="/" style={{textDecoration: 'none'}}>Home</Link>
            </li>
        </ul>
    }
    return (
        <Container>
            <div className="navbar">
                {listElements()}

            </div>
        </Container>
    );
}


const Container = styled.div`
  padding: 0;
  margin: 0;
  text-decoration: none;
  
  .logo_app {
    float: left;
    width: 20%;
  }

  .navbar {
    display: flex;
    align-items: center;
    padding: 0.5rem 0rem;
  }
  
  .navbar ul {
    list-style-type: none;
    width: 100%;
  }
  
  .navbar ul li {
    display: inline-flex;
    float:right;
    padding-right: 1%;
  }
  
  .links {
    float: right;
    color: #8DC6FF;
    padding: 10px;
    border: 2px solid transparent;
    font-weight: bold;
  }
  
  .links:hover {
    background: transparent;
    border: 2px solid #1167b1;
    color: #1167b1;
    text-decoration: none;
    border-radius: 8px;
  }
  
  
`;