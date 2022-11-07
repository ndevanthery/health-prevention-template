import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import image1 from '../images/questionnaire.jpg'

import { Cancer } from "../components/Cancer";
import { Infarctus } from "../components/Infarctus";
import { Diabete } from "../components/Diabete";
import { NonInfarctus } from "../components/NonInfarctus";
import "../Results.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Avatar from "../components/Avatar";
import { CheckBox } from "react-native-web";
import { addDoc, collection, doc, DocumentSnapshot, getDoc, getDocs, query, where } from "firebase/firestore";
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
    const myAvatarSick = new Avatar({ sick: "yes" });
    const myAvatar = new Avatar({ sick: "no" });


    const [doctorInfo, setDoctorInfo] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const fetchSurvey = async (idQuestionnary) => {
        console.log(idQuestionnary);
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
                console.log("Empty")
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
        console.log("doctor added");
        console.log(doctorInfo.id);
        console.log(params.id);
        const docRef = await addDoc(collection(db, "doctorAccess"), { "doctorId": doctorInfo.id, "surveyId": params.id, "userID": idUser, "doctorAccept": 0, date: new Date() });
    }

    return (
        <div className="App">

            <div className="result-line">
                <ResultContainer title="your result" infarctus={myInfarctus.resultCalc()} cancer={myCancer.resultCalc()} diabete={myDiabete.resultCalc()} urlHealthy={myAvatar.buildApiUrl()} urlSick={myAvatarSick.buildApiUrl()} />
                <ChangeHabits habits={myInfos_modified} setHabits={setHabitsFunc} />
                <ResultContainer title="your future results" infarctus={myInfarctus_2.resultCalc()} cancer={myCancer_2.resultCalc()} diabete={myDiabete_2.resultCalc()} urlHealthy={myAvatar.buildApiUrl()} urlSick={myAvatarSick.buildApiUrl()} />

            </div>
            <form onSubmit={fetchDoctor}>
                <div className="userSearch">
                    <h2>send your results to a doctor</h2>

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
                infarctus risk : {infarctus.toFixed(1)} %

                <div class="progress">
                    <div class="progress-bar bg-warning" role="progressbar" style={{ "width": infarctus + "%" }} aria-valuenow={infarctus} aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                cancer risk : {cancer.toFixed(1)} %

                <div class="progress">

                    <div class="progress-bar bg-success" role="progressbar" style={{ "width": cancer + "%" }} aria-valuenow={cancer} aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                diabete risk : {diabete.toFixed(1)} %
                <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" style={{ "width": diabete + "%" }} aria-valuenow={diabete} aria-valuemin="0" aria-valuemax="100"></div>
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
            <div className="results-title">what if you change your habits ...</div>
            <div className="select-div">
                <label for="smoke">do you smoke:</label>

                <select onChange={onChangeHandle} className="select-habits" name="smoke" id="smoke" value={habits.smoke}>
                    <option value="1">yes</option>
                    <option value="0">no</option>
                </select>
            </div>

            <div className="select-div">
                <label for="eating">eating habits</label>

                <select onChange={onChangeHandle} className="select-habits" name="alim" id="alim" value={habits.alim} >
                    <option value="0">very bad</option>
                    <option value="1">pretty bad</option>
                    <option value="2">pretty good</option>
                    <option value="3">very good</option>
                </select>
            </div>

            <div className="select-div">
                <label for="physical">physical activity</label>

                <select onChange={onChangeHandle} className="select-habits" name="physical" id="physical" value={habits.physical}>
                    <option value="0">i don't move a lot</option>
                    <option value="1">sport 3 days / week</option>
                    <option value="2">sport 5 days / week</option>
                    <option value="3">sport every day</option>
                </select>
            </div>

            <div className="select-div">
                <label for="alcohol">do you drink alcohol:</label>

                <select onChange={onChangeHandle} className="select-habits" name="alcohol" id="alcohol" value={habits.alcohol}>
                    <option value="0">every day</option>
                    <option value="1">3-6 times a week</option>
                    <option value="2">1-2 times a week</option>
                    <option value="3">less than once a week</option>
                    <option value="4">i don't drink</option>
                </select>
            </div>

            <div>

            </div>




        </div>
    );
}

/* async function getMyDoc(idUser) {
    const myQuery = query(collection(db, "questionnaires"), where("userID", "==", idUser));

    let latestseconds = 0;
    let resultData  = null;
    const querySnapshot = await getDocs(myQuery);

    querySnapshot.forEach((doc) => {
        let data =  doc.data();
        let id =  doc.id;
        if(data.date.seconds>latestseconds)
        {
            latestseconds = data.date.seconds;
            resultData = id;
        }
        

    });
    if(resultData === null)
    {
        resultData ={ sex: 0, age: 40, weight: 80, height: 180, systolic: true, chol: 3.5, glyc: 3.5, hdl: 1.9, diabete: 0, infarctus: 1, afInfarctus: 1, afCancer: 1, smoke: 1, alim: 3, alcohol: 2, physical: 3};

    }

    return resultData;
} */


