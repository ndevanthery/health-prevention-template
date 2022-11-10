import {doc, getDoc} from "firebase/firestore";
import {useState} from "react";
import {useParams} from "react-router-dom"
import {db} from "../initFirebase";
import { type } from "./Survey";

export default function HistoryDetails() {

    let params = useParams();

    let [data, setData] = useState([]);

    const fetchUser = async () => {
        const docRef = doc(db, "questionnaires", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setData(await docSnap.data())
        }
    }

    fetchUser();

    const questYouList = [
        {text: "what is your sex?", answer: data.sex , type : type.sex},
        {text: "how old are you?", answer: data.age , type : type.numeric},
        {text: "how much do you weight?", answer: data.weight , type : type.numeric},
        {text: "how tall are you?", answer: data.height , type : type.numeric},
        {text: "are you known for high blood pressure ?", answer: data.systolic , type :type.boolean},
        {text: "are you known for high cholesterol ?", answer: data.chol , type : type.boolean},
        {text: "are you diabetic ?", answer: data.diabete ,type : type.boolean},
        {text: "have you ever had an infarctus ?", answer: data.infarctus , type: type.boolean},
        //{ text: "have you ever had a cerebral attack ?", var: "AVC", type: type.boolean },
    ];

    const questFamilyList = [

        {
            text: "has one of your parent ever had an infarctus (dad before 55 and mom before 65?)",
            answer: data.afInfarctus,
            type: type.boolean
        },
        {text: "do you have a close relative who had cancer", answer: data.afCancer,
        type: type.boolean},
    ];

    const questHabitsList = [
        {text: "have you ever smoked regularly? ", answer: data.smoke,type: type.boolean},
        {
            text: "how often do you eat fruits, olive oil, nuts, fat fishes, less meat, less cream, less charcute  ",
            answer: data.alim,
            type: type.boolean
        },
        {text: "my physical activ is :", answer: data.physical,type: type.boolean},
        {text: "my alcohol consumption is :", answer: data.alcohol,type: type.boolean},
    ];

    return (
        <div className="history">
            <table className="table">
                <tr>
                    <td colspan="2"><h2>Questions about you</h2></td>
                </tr>
                <tr>
                    <td><br></br></td>
                </tr>
                {questYouList.map(question => <Line question={question} answer={0}/>)}
                <tr>
                    <td><br></br></td>
                </tr>

                <tr>
                    <td colspan="2"><h2>Questions about your family</h2></td>
                </tr>
                <tr>
                    <td><br></br></td>
                </tr>

                {questFamilyList.map(question => <Line question={question} answer={0}/>)}
                <tr>
                    <td><br></br></td>
                </tr>

                <tr>
                    <td colspan="2"><h2>Questions about your habits</h2></td>
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
          
            <input
              type="number"
              value={value}
              disabled={true}
            ></input>
          
        );
  
        break;
      case type.boolean:
        return (
          
            <select
              value={value}
              disabled={true}

            >
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          
        );
        break;
      case type.sex:
        return (
          
            <select
            disabled={true}

              value={value}
            >
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              <option value="0">Female</option>
              <option value="1">Male</option>
            </select>
          
        );
        break;
      case type.sport:
        return (
          
            <select
            disabled={true}

              
              value={value}
            >
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              <option value="0">i don't move a lot</option>
              <option value="1">half an hour 2-3 days a week</option>
              <option value="2">half an hour 5 days a week</option>
              <option value="3">more than 2 hours a week</option>
            </select>
            
          
        );
        break;
      case type.alcohol:
        return (
          
            <select
            disabled={true}

              value={value}
            >
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              <option value="0">every day</option>
              <option value="1">3 to 6 days a week</option>
              <option value="2">1 to 2 days a week</option>
              <option value="3">less than once a week</option>
              <option value="4">i don't drink</option>
            </select>
        
        );
        break;
  
      case type.alim:
        return (
          
            <select
            disabled={true}

              value={value}
            >
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              <option value="0">never</option>
              <option value="1">some times</option>
              <option value="2">frequently</option>
              <option value="3">most of the time</option>
            </select>
            
        );
        break;
    }
  }
