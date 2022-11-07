import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Logo.png"
import styled from "styled-components";
import { RoleContext } from "../App";
import { auth, db } from "../initFirebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";


export default function Navbar() {
    let [user,setUser] = useState();

    useEffect( ()=>{
        fetchUser();
    },[]


    );

    const fetchUser = async () =>  {
        const idUser = auth.currentUser.uid;
    
    
       
    
        const docRef = doc(db, "users", idUser);
        const docSnap = await getDoc(docRef);
    
    
        if (docSnap.exists()) {
    
            setUser( await docSnap.data());
        }
        return null;
    };

    const getButtons =() => {
        console.log(user);
        if (user) {
            if (user.idRole === 4) // user is a doctor
            {
                return <ul class="nav-menu">
    
                        <li class="nav-item">
                            <a href="/logout" class="nav-link">Log out</a>
                        </li>
                        <li class="nav-item">
                            <a href="/questionnaires" class="nav-link">See Patient Survey</a>
                        </li>
                        <li class="nav-item">
                            <a href="/newRequest" class="nav-link">Check new requests</a>
                        </li>
                        <li class="nav-item">
                            <a href="/account" class="nav-link">My Profile</a>
                        </li>
                        <li class="nav-item">
                            <a href="/homeDoctor" class="nav-link">Home</a>
                        </li>
                    </ul>
                
            }
            if(user.idRole === 5) /// admin 
            {
                return <ul class="nav-menu">
    
                
                <li class="nav-item">
                    <a href="/logout" class="nav-link">Log out</a>
                </li>
                <li class="nav-item">
                    <a href="/normalVal" class="nav-link">Edit Normal Values</a>
                </li>
                <li class="nav-item">
                    <a href="/addDoctor" class="nav-link">Add new Doctor</a>
                </li>
                <li class="nav-item">
                    <a href="/homeAdmin" class="nav-link">Home</a>
                </li>
    
            </ul>
                
            }
    
            if(user.idRole === 2)
            {
                return <ul class="nav-menu">
    
                    <li class="nav-item">
                        <a href="/logout" class="nav-link">Log out</a>
                    </li>
                    <li class="nav-item">
                        <a href="/survey" class="nav-link">Take a Survey</a>
                    </li>
                    <li class="nav-item">
                        <a href="/history" class="nav-link">My history</a>
                    </li>
                    <li class="nav-item">
                        <a href="/account" class="nav-link">My profile</a>
                    </li>
                    <li class="nav-item">
                        <a href="/home" class="nav-link">Home</a>
                    </li>
        
                </ul>
                
            }
        }
        else // no user logged in
        {
            return <ul class="nav-menu">
    
                    <li class="nav-item">
                        <a href="/survey" class="nav-link">Take a Survey</a>
                    </li>
                    <li class="nav-item">
                        <a href="/register" class="nav-link">Register</a>
                    </li>
                    <li class="nav-item">
                        <a href="/login" class="nav-link">Login</a>
                    </li>
                    <li class="nav-item">
                        <a href="/" class="nav-link">Home</a>
                    </li>
    
                </ul>
    
        }
    };


    return (
        <Container>
            <nav class="navbar">
                <Link to="/home">
                    <img className="logo_app" src={logo} alt="Logo" />
                </Link>
                {getButtons()}
                <div class="hamburger" onClick={mobileMenu}>
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
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


const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;1,400&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

.header{
    border-bottom: 1px solid #E2E8F0;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
}
.hamburger {
    display: none;
}

.bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #101010;
}

.nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-item {
    margin-left: 5rem;
}

.nav-link{
    font-size: 1.6rem;
    font-weight: 400;
    color: #475569;
}

.nav-link:hover{
    color: #482ff7;
}

.nav-logo {
    font-size: 2.1rem;
    font-weight: 500;
    color: #482ff7;
}

.logo_app{width : 300px}

@media only screen and (max-width: 768px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 6rem;
        flex-direction: column;
        background-color: #fff;
        width: 100%;
        border-radius: 10px;
        text-align: center;
        transition: 0.3s;
        box-shadow:
            0 10px 27px rgba(0, 0, 0, 0.05);
    }

    .nav-menu.active {
        left: 0;
    }

    .nav-item {
        margin: 2.5rem 0;
    }

    .hamburger {
        display: block;
        cursor: pointer;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }

}



`; 