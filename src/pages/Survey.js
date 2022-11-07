import React, {useEffect, useState} from "react";
import { Form,Link, useNavigate} from "react-router-dom";
import { doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import { Textbox } from "react-inputs-validation";
import imgSurvey from '../images/Survey.jpg'

import { auth, db } from "../initFirebase";
import "../Survey.css"
import {collection, addDoc} from "firebase/firestore";
import Avatar from "../components/Avatar";
import swal from "sweetalert";
import { surveySchema } from '../Validation/SurveyValidation';
import { isEmptyArray, useFormik } from "formik";
import { isEmpty } from "@firebase/util";
const type = {
    numeric: 0,
    boolean: 1,
    sex: 2,
    sport: 3,
    alcohol: 4,
    alim: 5,
}

export default function Survey() {

    const navigate = useNavigate();
    const idUser = auth.currentUser.uid;




    const [survey, setSurvey] = useState({ sex: "0", age: 40, weight: 80, height: 180, systolic: "1", chol: "1", glyc: 3.5, hdl: 1.9, diabete: "0", infarctus: "1", afInfarctus: "1", afCancer: "1", smoke: "1", alim: "3", alcohol: "2", physical: "3" }, []);

    useEffect(() => {
        getMyDoc(idUser).then(response => setSurvey({...response}));

        getMyDoc(idUser).then(response => setSurvey({ ...response }));


    }, []);


    const onSubmit = async (values,{ validate }) => {
        //validate(values);
        //alert(JSON.stringify(values, null, 2));


        var idUser = null
        try {
            idUser = auth.currentUser.uid;

        }
        catch (error) {
            idUser = null;
        }
        let date = new Date();
        console.log(values);
        var surveyUser = { userID: idUser, date: date, ...values };
        const docRef = await addDoc(collection(db, "questionnaires"), surveyUser);

    
        console.log("Document written with ID: ", docRef.id);


        // Add success pop up
        swal("We receive your infos!", "Thanks for completing the survey, please have a look at your result"
            , "success");
        navigate(`/results/${docRef.id}`);


    }






    const questYouList = [
        {text: "what is your sex?", var: "sex", type: type.sex},
        {text: "how old are you?", var: "age", type: type.numeric},
        {text: "how much do you weight? (in kg)", var: "weight", type: type.numeric},
        {text: "how tall are you? (in cm)", var: "height", type: type.numeric},
        {text: "are you known for high blood pressure ?", var: "systolic", type: type.boolean},
        {text: "are you known for high cholesterol ?", var: "chol", type: type.boolean},
        { text: "what is your glyc level ?", var: "glyc", type: type.numeric },
        { text: "what is your hdl level ?", var: "hdl", type: type.numeric },

        {text: "are you diabetic ?", var: "diabete", type: type.boolean},
        {text: "have you ever had an infarctus ?", var: "infarctus", type: type.boolean},
        //{ text: "have you ever had a cerebral attack ?", var: "AVC", type: type.boolean },
    ];

    const questFamilyList = [
        {
            text: "has one of your parent ever had an infarctus (dad before 55 and mom before 65?)",
            var: "afInfarctus",
            type: type.boolean
        },
        {text: "do you have a close relative who had cancer", var: "afCancer", type: type.boolean},
    ];

    const questHabitsList = [
        {text: "have you ever smoked regularly? ", var: "smoke", type: type.boolean},
        {
            text: "how often do you eat fruits, olive oil, nuts, fat fishes, less meat, less cream, less charcute  ",
            var: "alim",
            type: type.alim
        },
        {text: "my physical activ is :", var: "physical", type: type.sport},
        {text: "my alcohol consumption is :", var: "alcohol", type: type.alcohol},

    ];


    const formik = useFormik({
        initialValues: survey,
        validationSchema: surveySchema,
        
        /*  onSubmit: values => {
             
             alert(JSON.stringify(values, null, 2));
      
           }, */
        onSubmit: onSubmit,


    });
    

    return (

        <div className="survey">
            <form onSubmit={formik.handleSubmit}>
                <table className="table">
                    <tr><td colspan="2"><h2>Questions about you</h2></td></tr>
                    <tr><td><br></br></td></tr>
                    {questYouList.map(question => <Question question={question} onInputChange={formik.handleChange} survey={formik.values} errors={formik.errors} />)}
                    <tr><td><br></br></td></tr>

                    <tr><td colspan="2"><h2>Questions about your family</h2></td></tr>
                    <tr><td><br></br></td></tr>

                    {questFamilyList.map(question => <Question question={question} onInputChange={formik.handleChange} survey={formik.values} errors={formik.errors} />)}
                    <tr><td><br></br></td></tr>

                    <tr><td colspan="2"><h2>Questions about your habits</h2></td></tr>
                    <tr><td><br></br></td></tr>

                    {questHabitsList.map(question => <Question question={question} onInputChange={formik.handleChange} survey={formik.values} errors={formik.errors} />)}
                </table>
                <br />
                <button type="submit" disabled={formik.isSubmitting || !isEmpty(formik.errors) || !formik.dirty}>calculate results</button>

            </form>
            <br />



            {/*             <Link to="/results" state={{ infos: survey }} >
                <button onClick={onClickButton}>calculate results</button>
            </Link> */}

            </div>
        
    );
}

async function getMyDoc(idUser) {
    const myQuery = query(collection(db, "questionnaires"), where("userID", "==", idUser));

    let latestseconds = 0;
    let resultData = null;
    const querySnapshot = await getDocs(myQuery);

    querySnapshot.forEach((doc) => {
        let data = doc.data();
        if (data.date.seconds > latestseconds) {
            latestseconds = data.date.seconds;
            resultData = data;
        }


    });
    if (resultData === null) {
        resultData = { sex: 0, age: 40, weight: 80, height: 180, systolic: true, chol: 3.5, glyc: 3.5, hdl: 1.9, diabete: 0, infarctus: 1, afInfarctus: 1, afCancer: 1, smoke: 1, alim: 3, alcohol: 2, physical: 3 };

    }

    return resultData;
}

function Question({ question, onInputChange, survey, errors }) {
    let value = survey[question.var];
    let error = errors[question.var];
    return (

        <tr className="row-question">
            <td className="column-table">
                {question.text}
            </td>
            <td>
                <Answer id={question.var} typeAnswer={question.type} inputChange={onInputChange} value={value} error={error} />
            </td>
        </tr>

    );
}

function Answer({ id, typeAnswer, inputChange, value, error }) {
    switch (typeAnswer) {
        case type.numeric:
            return (
                <>
                    <input className={error ? "input-error" : ""} onChange={inputChange} id={id} name={id} type="number" value={value}></input>
                    {error && <p className="error">{error}</p>}
                </>

            );

            break;
        case type.boolean:
            return (
                <>
                    <select className={error ? "input-error" : ""} name={id} id={id} onChange={inputChange} value={value}>
                        <option value="none" selected disabled hidden>Select an Option</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>

                    </select>
                    {error && <p className="error">{error}</p>}
                </>

            );
            break;
        case type.sex:
            return (
                <>
                    <select className={error ? "input-error" : ""} name={id} id={id} onChange={inputChange} value={value}>
                        <option value="none" selected disabled hidden>Select an Option</option>
                        <option value="0">Female</option>
                        <option value="1">Male</option>

                    </select>{error && <p className="error">{error}</p>}
                </>);
            break;
        case type.sport:
            return (
                <>
                    <select className={error ? "input-error" : ""} name={id} id={id} onChange={inputChange} value={value}>
                        <option value="none" selected disabled hidden>Select an Option</option>
                        <option value="0">i don't move a lot</option>
                        <option value="1">half an hour 2-3 days a week</option>
                        <option value="2">half an hour 5 days a week</option>
                        <option value="3">more than 2 hours a week</option>

                    </select>
                    {error && <p className="error">{error}</p>}
                </>
            );
            break;
        case type.alcohol:
            return (
                <>
                    <select className={error ? "input-error" : ""} name={id} id={id} onChange={inputChange} value={value}>
                        <option value="none" selected disabled hidden>Select an Option</option>
                        <option value="0">every day</option>
                        <option value="1">3 to 6 days a week</option>
                        <option value="2">1 to 2 days a week</option>
                        <option value="3">less than once a week</option>
                        <option value="4">i don't drink</option>

                    </select>
                    {error && <p className="error">{error}</p>}
                </>);
            break;

        case type.alim:
            return (
                <>
                    <select className={error ? "input-error" : ""} name={id} id={id} onChange={inputChange} value={value}>
                        <option value="none" selected disabled hidden>Select an Option</option>
                        <option value="0">never</option>
                        <option value="1">some times</option>
                        <option value="2">frequently</option>
                        <option value="3">most of the time</option>

                    </select>
                    {error && <p className="error">{error}</p>}
                </>);
            break;

    }
}
