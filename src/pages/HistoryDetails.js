import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../initFirebase";

export default  function HistoryDetails() {

      let params = useParams();

    let [data, setData] = useState([]);


    const fetchUser = async() => {
        const docRef = doc(db, "questionnaires", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setData(await docSnap.data())

        } 
    }

    fetchUser();

    const questYouList = [
        { text: "what is your sex?", answer : data.sex},
        { text: "how old are you?", answer : data.age },
        { text: "how much do you weight?", answer : data.weight },
        { text: "how tall are you?", answer : data.height },
        { text: "are you known for high blood pressure ?", answer : data.systolic },
        { text: "are you known for high cholesterol ?", answer : data.chol},
        { text: "are you diabetic ?", answer : data.diabete },
        { text: "have you ever had an infarctus ?", answer : data.infarctus},
        //{ text: "have you ever had a cerebral attack ?", var: "AVC", type: type.boolean },
    ];

    const questFamilyList = [

        { text: "has one of your parent ever had an infarctus (dad before 55 and mom before 65?)",answer : data.afInfarctus},
        { text: "do you have a close relative who had cancer", answer : data.afCancer},
    ];

    const questHabitsList = [
        { text: "have you ever smoked regularly? ", answer:data.smoke},
        { text: "how often do you eat fruits, olive oil, nuts, fat fishes, less meat, less cream, less charcute  ",  answer:data.alim},
        { text: "my physical activ is :",  answer:data.physical },
        { text: "my alcohol consumption is :",  answer:data.alcohol },

    ];


    return(

        <div className="history">
            <table className="table">
                <tr><td colspan="2"><h2>Questions about you</h2></td></tr>
                <tr><td><br></br></td></tr>
                {questYouList.map(question => <Line question={question} answer={0} />)}
                <tr><td><br></br></td></tr>

                <tr><td colspan="2"><h2>Questions about your family</h2></td></tr>
                <tr><td><br></br></td></tr>

                {questFamilyList.map(question => <Line question={question} answer={0} />)}
                <tr><td><br></br></td></tr>

                <tr><td colspan="2"><h2>Questions about your habits</h2></td></tr>
                <tr><td><br></br></td></tr>

                {questHabitsList.map(question => <Line question={question} answer={0}/>)}
            </table>

            
            <br/>
            




        </div>
    );

     
}

function Line({question , answer})
{
    return (

        <tr className="row-question">
            <td className="column-table">
                {question.text}
            </td>
            <td>
                {question.answer}
            </td>
        </tr>


    );
}
