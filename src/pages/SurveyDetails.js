import {doc, getDoc} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom"
import {auth, db} from "../initFirebase";
import { type } from "./Survey";
import {RoleContext} from "../App";

export default function SurveyDetails() {
    const navigate = useNavigate();
    const role = useContext(RoleContext);
    let params = useParams();
    let [data, setData] = useState([]);

    useEffect(() => {
        checkLogin()
        fetchQuestionnaire()
    }, [])

    const fetchQuestionnaire = async () => {
        const docRef = doc(db, "questionnaires", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setData(await docSnap.data())
        }
    }

    const checkLogin = () => {
        if (auth.currentUser && (role.idRole === 2 || role.idRole === 4)) {

        } else {
            navigate("/")
        }
    }

    const questYouList = [
        {text: "What is your sex?", answer: data.sex , type : type.sex},
        {text: "How old are you?", answer: data.age + " Years", type : type.numeric},
        {text: "How much do you weight?", answer: data.weight + " kg" , type : type.numeric},
        {text: "How tall are you?", answer: data.height + " cm" , type : type.numeric},
        {text: "Are you known for high Blood Pressure ?", answer: data.systolic , type :type.boolean},
        {text: "Are you known for high Cholesterol ?", answer: data.chol , type : type.boolean},
        {text: "Are you diabetic ?", answer: data.diabete ,type : type.boolean},
        {text: "Have you ever had an Infarctus ?", answer: data.infarctus , type: type.boolean},
        //{ text: "have you ever had a cerebral attack ?", var: "AVC", type: type.boolean },
    ];

    const questFamilyList = [

        {
            text: "Has one of your Parents ever had an Infarctus (Dad before 55 and Mom before 65)?",
            answer: data.afInfarctus,
            type: type.boolean
        },
        {text: "Do you have a close Relative who had Cancer?", answer: data.afCancer,
        type: type.boolean},
    ];

    const questHabitsList = [
        {text: "Have you ever smoked regularly? ", answer: data.smoke,type: type.boolean},
        {
            text: "How often do you eat Fruits, Olive oil, Nuts, fat Fishes, less Meat, less Cream, less Charcute? ",
            answer: data.alim,
            type: type.alim
        },
        {text: "How often are you physically active?", answer: data.physical,type: type.sport},
        {text: "How often do you drink alcohol?", answer: data.alcohol,type: type.alcohol},
    ];

    return (
        <div className="history">
            <table className="table">
                <tr>
                    <td colSpan="2"><h2>Questions about you</h2></td>
                </tr>
                <tr>
                    <td><br></br></td>
                </tr>
                {questYouList.map(question => <Line question={question} answer={0}/>)}
                <tr>
                    <td><br></br></td>
                </tr>

                <tr>
                    <td colSpan="2"><h2>Questions about your family</h2></td>
                </tr>
                <tr>
                    <td><br></br></td>
                </tr>

                {questFamilyList.map(question => <Line question={question} answer={0}/>)}
                <tr>
                    <td><br></br></td>
                </tr>

                <tr>
                    <td colSpan="2"><h2>Questions about your habits</h2></td>
                </tr>
                <tr>
                    <td><br></br></td>
                </tr>

                {questHabitsList.map(question => <Line question={question} answer={0}/>)}
            </table>
            <br/>
        </div>
    );
}

function Line({question}) {

    return (
        <tr className="row-question">
            <td className="column-table">
                {question.text}
            </td>
            <td>
                <AnswerDisplay typeAnswer={question.type} value = {question.answer}></AnswerDisplay>
            </td>
        </tr>
    );
}

function AnswerDisplay({ typeAnswer, value }) {
    switch (typeAnswer) {
      case type.numeric:
        return (
          
            <p>{value}</p>
          
        );
      case type.boolean:
          if(value === "0")
          {
              return (<p>No</p>)
          }
          return (<p>Yes</p>)

      case type.sex:
          if(value === "0")
          {
              return (<p>Female</p>)
          }
          return (<p>Male</p>)

      case type.sport:
          switch (value) {
              case "0":
                  return(<p>I don't move a lot</p>)
              case "1":
                  return(<p>Half an Hour / 2-3 Days a Week</p>)
              case "2":
                  return(<p>Half an Hour / 5 Days a Week</p>)
              case "3":
                  return(<p>More than 2 Hours a Week</p>)
              default:
                  return (<p></p>)
          }

      case type.alcohol:
          switch (value) {
              case "0":
                  return(<p>Every Day</p>)
              case "1":
                  return(<p>3 to 6 Days a Week</p>)
              case "2":
                  return(<p>1 to 2 Days a Week</p>)
              case "3":
                  return(<p>Less than once a Week</p>)
              case "4":
                  return(<p>I don't drink</p>)
              default:
                  return (<p></p>)
          }
  
      case type.alim:
          switch (value) {
              case "0":
                  return(<p>Never</p>)
              case "1":
                  return(<p>Sometimes</p>)
              case "2":
                  return(<p>Frequently</p>)
              case "3":
                  return(<p>Most of the Time</p>)
              default:
                  return (<p></p>)
          }
    }
  }
