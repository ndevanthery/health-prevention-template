import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image1 from '../images/questionnaire.jpg'

import { Cancer } from "../components/Cancer";
import { Infarctus } from "../components/Infarctus";
import {Diabete} from "../components/Diabete";
import {NonInfarctus} from "../components/NonInfarctus";
import "../Results.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Avatar from "../components/Avatar";
import { CheckBox } from "react-native-web";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../initFirebase";

/* export default function Survey() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Take a survey and test your health!</h1>
            <img src={image1} style={{ width: "40%" }} />
        </div>
    );
} */

export default function Results() {
    //input from questionnary page

    const location = useLocation()
    const { infos } = location.state;
    let [user, setUser] = useState([]);

    const idUser = auth.currentUser.uid;


    const fetchUser = async() => {
        const docRef = doc(db, "users", idUser);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(await docSnap.data())

        } 
    }

    useEffect( () => {
        fetchUser();
        
    } , [])

   // var infos = { sex: 0, age: 40, weight: 80, height: 180, systolic: true, chol: 3.5, glyc: 3.5, hdl: 1.9, diabete: 0, infarctus: 1, afInfarctus: 1, afCancer: 1, smoke: 1, alim: 3, alcohol: 2, physical: 3};


    

    const [myInfos_modified, setInfos] = useState(infos);

    let myInfarctus = new Infarctus({ ...infos });
    let myInfarctus_2 = new Infarctus({ ...myInfos_modified });

    let myCancer = new Cancer({ ...infos });
    let myCancer_2 = new Cancer({ ...myInfos_modified });

    let myDiabete = new Diabete({ ...infos });
    let myDiabete_2 = new Diabete({ ...myInfos_modified });


    let setHabitsFunc = ({ smoke, alim, physical, alcohol }) => {
        setInfos({ ...myInfos_modified, smoke: smoke, alim: alim, physical: physical, alcohol: alcohol });
    };
    const myAvatarSick = new Avatar({sick:"yes"});
    const myAvatar = new Avatar({sick:"no"});
    


    
    



    return (
        <div className="App">

            <div className="result-line">
                <ResultContainer title="your result" infarctus={myInfarctus.resultCalc()} cancer={myCancer.resultCalc()} diabete={myDiabete.resultCalc()} urlHealthy={myAvatar.buildApiUrl()} urlSick={myAvatarSick.buildApiUrl()} />
                <ChangeHabits habits={myInfos_modified} setHabits={setHabitsFunc} />
                <ResultContainer title="your future results" infarctus={myInfarctus_2.resultCalc()} cancer={myCancer_2.resultCalc()} diabete={myDiabete_2.resultCalc()} urlHealthy={myAvatar.buildApiUrl()} urlSick={myAvatarSick.buildApiUrl()} />

            </div>
        </div>

    );
}


function ResultContainer({ title, infarctus, cancer, diabete ,urlHealthy , urlSick}) {
    let url = urlHealthy
    if(infarctus + cancer + diabete >= 120)
    {
        url = urlSick;
    }
    else{
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