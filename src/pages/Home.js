import {Link } from "react-router-dom";
import home1 from '../images/home1.jpg'
import "../Stylesheets/App.css"

export default function Home() {

    return (
        <>
            <div className="mainDivHomePage">
                <h1 className="titleHomePage1">Welcome to the health prevention system</h1>
                <h3 className="titleHomePage3">Your online personal assistant</h3>
                <p style={{float: "left", paddingBottom: "50px", paddingTop: "30px"}}>Welcome to the web application to test your health.
                    It was designed to help in preventive healthcare, by allowing users to answer questions in
                    order to get a result regarding their current health condition and risks.
                This web page has been developed by 4 students from the HES-SO Valais.</p>
            </div>

            <div className="imageDivHomePage">
                <img src={home1} className="img1" style={{width: "90%"}}/>
            </div>

            <Link to="/survey" className="linkSurvey">Take a survey</Link>
            <br/><br/><br/><br/>
        </>
    );
}