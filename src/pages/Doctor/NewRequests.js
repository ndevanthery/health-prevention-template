import {useNavigate} from "react-router-dom";
import {RoleContext} from "../../App";
import {auth, db} from "../../initFirebase";
import {Fragment, useContext, useEffect, useState} from "react";
import check from "../../images/Done.png"
import deny from "../../images/Close.png"
import {collection, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";


export default function NewRequests() {
    const navigate = useNavigate();
    const role = useContext(RoleContext);
    const [questionnaireInfo, setQuestionnaireInfo] = useState([])

    useEffect(() => {
        checkLogin()
        fetchQuestionnaire();
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
                if(doc.get("doctorAccept") === 0)
                {
                    infos = ([...infos, {doctorAcc: doc.id,surveyId: doc.get("surveyId"), userID: doc.get("userID"), date: doc.get("date")}]);
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
                    id: inf.doctorAcc,
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

    const handleClick = async (e) => {
        e.preventDefault()
        let check = -1;
        if (e.target.name === "check") {
            check = 1
        }

        await updateDoc(doc(db, "doctorAccess", e.target.id), {
            doctorAccept: check
        })

        fetchQuestionnaire()
    }


    return (
        <div className="mainDiv">
            <h1>New Requests from Patient</h1>
            <h2>Choose if you want to accept or deny the Request</h2>

            <table className="user">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Date</th>
                    <th>Want to accept?</th>
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
                                    <button onClick={handleClick} style={{marginRight: '20px'}}><img id={inf.id} name="check" alt="Check" src={check} /></button>
                                    <button  onClick={handleClick}><img id={inf.id} name="deny" alt="Deny" src={deny} /></button>
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