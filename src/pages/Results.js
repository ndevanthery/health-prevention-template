import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

import { Cancer } from "../algorithms/Cancer";
import { Infarctus } from "../algorithms/Infarctus";
import { Diabete } from "../algorithms/Diabete";
import "../Stylesheets/Results.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Avatar from "../components/Avatar";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../initFirebase";
import add from '../images/add.png'


export default function Results() {
    //input from questionnary page
    let params = useParams();

    let [user, setUser] = useState([]);

    var idUser = null
    try {
        idUser = auth.currentUser.uid;

    }
    catch (error) {
        idUser = null;
    }

    const fetchUser = async () => {
        const docRef = doc(db, "users", idUser);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(docSnap.data())

        }
    }


    const [survey, setSurvey] = useState({ sex: "0", age: 40, weight: 80, height: 180, systolic: "1", chol: "1", glyc: 3.5, hdl: 1.9, diabete: "0", infarctus: "1", afInfarctus: "1", afCancer: "1", smoke: "1", alim: "3", alcohol: "2", physical: "3" }, []);


    useEffect(() => {
        fetchUser();
        fetchSurvey(params.id);
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [myInfos_modified, setInfosModified] = useState(survey);

    let myInfarctus = new Infarctus({ ...survey });
    let myInfarctus_2 = new Infarctus({ ...myInfos_modified });

    let myCancer = new Cancer({ ...survey });
    let myCancer_2 = new Cancer({ ...myInfos_modified });

    let myDiabete = new Diabete({ ...survey });
    let myDiabete_2 = new Diabete({ ...myInfos_modified });


    let setHabitsFunc = ({ smoke, alim, physical, alcohol }) => {
        setInfosModified({ ...myInfos_modified, smoke: smoke, alim: alim, physical: physical, alcohol: alcohol });
    };



    const [doctorInfo, setDoctorInfo] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const fetchSurvey = async (idQuestionnary) => {
        const docRef = doc(db, "questionnaires", idQuestionnary);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            setSurvey( docSnap.data())
            setInfosModified(docSnap.data());    
        }

    
    } 

    const fetchDoctor = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        try {
            let q = query(collection(db, "users"), where("email", "==", email), where("idRole", "==", 4));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setDoctorInfo({ ...doc.data(), id: doc.id });
            });

            if (querySnapshot.empty) {
                setDoctorInfo({
                    firstName: "",
                    lastName: "",
                    email: ""
                })
            }

        } catch (error) {
            console.error(error);
        }
    }

    const addDoctor = async (e) => {
         await addDoc(collection(db, "doctorAccess"), { "doctorId": doctorInfo.id, "surveyId": params.id, "userID": idUser, "doctorAccept": 0, date: new Date() });
    }

    if(user === undefined)
    {
        return ( <div>waiting</div> );
    }
    else{
        
        const myAvatarSick = new Avatar({ sick: "yes" , avatarURL : user.avatarUrl });
        const myAvatar = new Avatar({ sick: "no" , avatarURL : user.avatarUrl  });
    return (
        
        <div className="App">

            <div className="result-line">
                <ResultContainer title="Your result" infarctus={myInfarctus.resultCalc()} cancer={myCancer.resultCalc()} diabete={myDiabete.resultCalc()} urlHealthy={myAvatar.buildApiUrl()} urlSick={myAvatarSick.buildApiUrl()} />
                <ChangeHabits habits={myInfos_modified} setHabits={setHabitsFunc} />
                <ResultContainer title="Your future results" infarctus={myInfarctus_2.resultCalc()} cancer={myCancer_2.resultCalc()} diabete={myDiabete_2.resultCalc()} urlHealthy={myAvatar.buildApiUrl()} urlSick={myAvatarSick.buildApiUrl()} />

            </div>
            <form onSubmit={fetchDoctor}>
                <div className="userSearch">
                    <h2>Send your results to a doctor</h2>
                    <input className="effect" type="text" placeholder="Enter E-Mail Address" />
                    <input className="buttonHome" style={{ height: "50px" }} type="submit" value="Search User" />
                </div>
                <table className="user">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{doctorInfo.firstName}</td>
                            <td>{doctorInfo.lastName}</td>
                            <td>{doctorInfo.email}</td>
                            {doctorInfo.email !== "" ? <td><button><img alt="test" height="30" src={add} onClick={addDoctor} /></button></td> : <td></td>}
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    );
    }
}


function ResultContainer({ title, infarctus, cancer, diabete, urlHealthy, urlSick }) {
    let url = urlHealthy
    if (infarctus + cancer + diabete >= 120) {
        url = urlSick;
    }
    else {
        url = urlHealthy;
    }

    return (
        <div className="results-div">
            <div className="results-title">{title}</div>
            <img src={url} width={100} alt="my avatar" />
            <div>
                Infarctus risk: {infarctus.toFixed(1)} %

                <div className="progress">
                    <div className="progress-bar bg-warning" role="progressbar" style={{ "width": infarctus + "%" }} aria-valuenow={infarctus} aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                Cancer risk: {cancer.toFixed(1)} %

                <div className="progress">

                    <div className="progress-bar bg-success" role="progressbar" style={{ "width": cancer + "%" }} aria-valuenow={cancer} aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                Diabete risk: {diabete.toFixed(1)} %
                <div className="progress">
                    <div className="progress-bar bg-danger" role="progressbar" style={{ "width": diabete + "%" }} aria-valuenow={diabete} aria-valuemin="0" aria-valuemax="100"></div>
                </div>

            </div>

        </div>
    );
}

function ChangeHabits({ habits, setHabits }) {

    let onChangeHandle = (event) => {
        setHabits({ ...habits, [event.target.name]: parseInt(event.target.value) });
    };
    return (
        <div className="results-div">
            <div className="results-title">What if you change your habits ...</div>
            <div className="select-div">
                <label htmlFor="smoke">Do you smoke:</label>

                <select onChange={onChangeHandle} className="select-habits" name="smoke" id="smoke" value={habits.smoke}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
            </div>

            <div className="select-div">
                <label htmlFor="eating">Eating habits</label>

                <select onChange={onChangeHandle} className="select-habits" name="alim" id="alim" value={habits.alim} >
                    <option value="0">Very bad</option>
                    <option value="1">Pretty bad</option>
                    <option value="2">Pretty good</option>
                    <option value="3">Very good</option>
                </select>
            </div>

            <div className="select-div">
                <label htmlFor="physical">Physical activity</label>

                <select onChange={onChangeHandle} className="select-habits" name="physical" id="physical" value={habits.physical}>
                    <option value="0">I don't move a lot</option>
                    <option value="1">Sport 3 days / week</option>
                    <option value="2">Sport 5 days / week</option>
                    <option value="3">Sport every day</option>
                </select>
            </div>

            <div className="select-div">
                <label htmlFor="alcohol">Do you drink alcohol:</label>

                <select onChange={onChangeHandle} className="select-habits" name="alcohol" id="alcohol" value={habits.alcohol}>
                    <option value="0">Every day</option>
                    <option value="1">3-6 times a week</option>
                    <option value="2">1-2 times a week</option>
                    <option value="3">Less than once a week</option>
                    <option value="4">I don't drink</option>
                </select>
            </div>

            <div>
            </div>

        </div>
    );
}