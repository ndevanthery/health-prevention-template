import {useNavigate} from "react-router-dom";
import {RoleContext} from "../../App";
import {auth, db} from "../../initFirebase";
import {Fragment, useContext, useEffect, useState} from "react";
import {collection, getDoc, getDocs, query, where, doc} from "firebase/firestore";
import details from "../../images/details.png";

export default function Questionnaires() {
    const navigate = useNavigate();
    const role = useContext(RoleContext);
    const [questionnaireInfo, setQuestionnaireInfo] = useState([])

    useEffect(() => {
        checkLogin()
        fetchQuestionnaire()
    }, [])

    const checkLogin = () => {
        if (auth.currentUser && role.idRole === 4) {

        } else {
            navigate("/")
        }
    }

    const fetchQuestionnaire = async () => {
        let infos = [];
        setQuestionnaireInfo([])

        try {
            let q = query(collection(db, "doctorAccess"), where("doctorId", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if(doc.get("doctorAccept") === 1)
                {
                    infos = ([...infos, {surveyId: doc.get("surveyId"), userID: doc.get("userID"), date: doc.get("date")}]);
                }


            });
            if(querySnapshot.empty) {
                console.log("Empty")
            }

            for (const inf of infos) {

                let docRef = doc(db, "users", inf.userID);
                let docSnap = await getDoc(docRef);
                let myDate = new Date(null);
                myDate.setSeconds(inf.date.seconds);
                let date = myDate.getDate().toString().padStart(2, '0') + "." + myDate.getMonth().toString().padStart(2, '0') + "." + myDate.getFullYear().toString().padStart(4, '0');
                setQuestionnaireInfo((oldArray => [...oldArray, {
                        surveyId: inf.surveyId,
                        firstName: docSnap.get("firstName"),
                        lastName: docSnap.get("lastName"),
                        date: date
                    }
                ]));
            }


        }catch (error) {
            console.error(error);
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        navigate("/history/"+e.target.id)
    }


    return (
        <div className="mainDiv">
            <h1>Questionnaires from your Patients</h1>
            <h2>Click on one to see Details</h2>

            <table className="user">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Date</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {questionnaireInfo.map((inf, index) => {
                    return (<Fragment>
                            <tr>
                                <td>{inf.firstName}</td>
                                <td>{inf.lastName}</td>
                                <td>{inf.date}</td>
                                <td style={{textAlign: "center"}}>
                                    <button onClick={handleClick}><img id={inf.surveyId} name="check" alt="Check" src={details} style={{height: '28px'}}/></button>
                                </td>
                            </tr>
                        </Fragment>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}