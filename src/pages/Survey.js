import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getDocs, query, where} from "firebase/firestore";
import imgSurvey from "../images/Survey.jpg";

import {auth, db} from "../initFirebase";
import "../Stylesheets/Survey.css";
import {collection, addDoc} from "firebase/firestore";
import swal from "sweetalert";
import {surveySchema} from "../Validation/SurveyValidation";
import {useFormik} from "formik";
import {isEmpty} from "@firebase/util";

export const type = {
    numeric: 0,
    boolean: 1,
    sex: 2,
    sport: 3,
    alcohol: 4,
    alim: 5,
};

export default function Survey() {
    const navigate = useNavigate();
    var idUser = null;
    try {
        idUser = auth.currentUser.uid;
    } catch (error) {
        idUser = null;
    }

    const [survey, setSurvey] = useState(
        {
             sex: "0",
            age: 40,
            weight: 80,
            height: 180,
            systolic: "1",
            chol: "1",
            glyc: 3.5,
            hdl: 1.9,
            diabete: "0",
            infarctus: "1",
            afInfarctus: "1",
            afCancer: "1",
            smoke: "1",
            alim: "3",
            alcohol: "2",
            physical: "3", 
        },
        []
    );

    useEffect(() => {
        getMyDoc(idUser).then((response) => setSurvey({...response}));
   // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (values, {validate}) => {
        //validate(values);
        //alert(JSON.stringify(values, null, 2));

        var idUser = null;
        try {
            idUser = auth.currentUser.uid;
        } catch (error) {
            idUser = null;
        }
        let date = new Date();
        var surveyUser = {userID: idUser, date: date, ...values};
        const docRef = await addDoc(collection(db, "questionnaires"), surveyUser);


        // Add success pop up
        swal(
            "We receive your infos!",
            "Thanks for completing the survey, please have a look at your result",
            "success"
        );
        navigate(`/results/${docRef.id}`);
    };

    const questYouList = [
        {text: "What is your sex?", var: "sex", type: type.sex},
        {text: "How old are you?", var: "age", type: type.numeric},
        {
            text: "How much do you weight? (in kg)",
            var: "weight",
            type: type.numeric,
        },
        {text: "How tall are you? (in cm)", var: "height", type: type.numeric},
        {
            text: "Are you known for high Blood Pressure ?",
            var: "systolic",
            type: type.boolean,
        },
        {
            text: "Are you known for high Cholesterol ?",
            var: "chol",
            type: type.boolean,
        },
        {text: "What is your glyc level ?", var: "glyc", type: type.numeric},
        {text: "What is your hdl level ?", var: "hdl", type: type.numeric},

        {text: "Are you diabetic ?", var: "diabete", type: type.boolean},
        {
            text: "Have you ever had an Infarctus ?",
            var: "infarctus",
            type: type.boolean,
        },
        //{ text: "have you ever had a cerebral attack ?", var: "AVC", type: type.boolean },
    ];

    let [position, setPosition] = useState(0);

    const questFamilyList = [
        {
            text: "Has one of your Parents ever had an Infarctus (Dad before 55 and Mom before 65)?",
            var: "afInfarctus",
            type: type.boolean,
        },
        {
            text: "Do you have a close Relative who had Cancer?",
            var: "afCancer",
            type: type.boolean,
        },
    ];

    const questHabitsList = [
        {
            text: "Have you ever smoked regularly?",
            var: "smoke",
            type: type.boolean,
        },
        {
            text: "How often do you eat Fruits, Olive oil, Nuts, fat Fishes, less Meat, less Cream, less Charcute?",
            var: "alim",
            type: type.alim,
        },
        {text: "How often are you physically active?", var: "physical", type: type.sport},
        {text: "How often do you drink alcohol?", var: "alcohol", type: type.alcohol},
    ];

    const formik = useFormik({
        initialValues: survey,
        validationSchema: surveySchema,

        /*  onSubmit: values => {

                 alert(JSON.stringify(values, null, 2));

               }, */
        onSubmit: onSubmit,
    });

    const nextPage = (event) => {
        event.preventDefault();
        setPosition(position + 1);
    }

    const backPage = (event) => {
        event.preventDefault();
        setPosition(position - 1);
    }

    const displayQuest = () => {
        if (position === 0) { // questions about you
            return (
                <>
                    <tr>
                        <td colSpan="2">
                            <h2 className="titleSurvey">Questions about you</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br></br>
                        </td>
                    </tr>
                    {questYouList.map((question) => (
                        <Question
                            key={question.var}
                            question={question}
                            onInputChange={formik.handleChange}
                            survey={formik.values}
                            errors={formik.errors}
                        />
                    ))}
                    <tr>
                        <td>
                            <br></br>
                        </td>
                    </tr>
                </>
            );
        }
        if (position === 1) {
            return (
                <>
                    <tr>
                        <td colSpan="2">
                            <h2 className="titleSurvey">Questions about your family</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br></br>
                        </td>
                    </tr>

                    {questFamilyList.map((question) => (
                        <Question
                            key={question.var}
                            question={question}
                            onInputChange={formik.handleChange}
                            survey={formik.values}
                            errors={formik.errors}
                        />
                    ))}
                    <tr>
                        <td>
                            <br></br>
                        </td>
                    </tr>
                </>
            );
        }
        if (position === 2) {
            return (
                <>
                    <tr>
                        <td colSpan="2">
                            <h2 className="titleSurvey">Questions about your habits</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br></br>
                        </td>
                    </tr>

                    {questHabitsList.map((question) => (
                        <Question
                            key={question.var}

                            question={question}
                            onInputChange={formik.handleChange}
                            survey={formik.values}
                            errors={formik.errors}
                        />
                    ))}
                </>
            );
        }
    };

    return (
        <>
            <h1 className="mainTitleSurvey">
                Fill this survey to get your healt result!{" "}
            </h1>
            <hr></hr>
            <div className="survey">
                <form onSubmit={formik.handleSubmit}>
                    <table className="table">
                        <tbody>
                        {displayQuest(position)}

                        </tbody>


                    </table>

                    <img
                        src={imgSurvey}
                        className="imageSurvey"
                        alt="imageSurvey"
                        style={{width: "30%"}}
                    />

                    <br></br>
                    <br/>

                    <div className="btn-group">
                        <button
                            className="buttonSurvey"
                            disabled={position === 0}
                            onClick={backPage}

                        >back
                        </button>
                        <span> </span>
                        <button
                            className="buttonSurvey"
                            hidden={position === 2}
                            onClick={nextPage}

                        >Next page
                        </button>
                        <span> </span>
                        <button
                            type="submit"

                            className="buttonSurvey2"
                            disabled={
                                formik.isSubmitting || !isEmpty(formik.errors) || !formik.dirty
                            }
                            hidden={position !== 2}
                        >
                            calculate results
                        </button>

                    </div>
                </form>
                <br/>

            </div>
        </>
    );
}


async function getMyDoc(idUser) {
    const myQuery = query(
        collection(db, "questionnaires"),
        where("userID", "==", idUser)
    );

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
        resultData = {
             sex: 0,
            age: 40,
            weight: 80,
            height: 180,
            systolic: true,
            chol: 3.5,
            glyc: 3.5,
            hdl: 1.9,
            diabete: 0,
            infarctus: 1,
            afInfarctus: 1,
            afCancer: 1,
            smoke: 1,
            alim: 3,
            alcohol: 2,
            physical: 3, 
        };
    }

    return resultData;
}

function Question({question, onInputChange, survey, errors}) {
    let value = survey[question.var];
    let error = errors[question.var];
    return (
        <tr className="row-question">
            <td className="column-table">{question.text}</td>
            <td>
                <Answer
                    id={question.var}
                    typeAnswer={question.type}
                    inputChange={onInputChange}
                    value={value}
                    error={error}
                />
            </td>
        </tr>
    );
}

function Answer({id, typeAnswer, inputChange, value, error}) {
    switch (typeAnswer) {
        case type.numeric:
            return (
                <>
                    <input
                        className={error ? "input-error" : "selectionSurvey"}
                        onChange={inputChange}
                        id={id}
                        name={id}
                        type="number"
                        value={value}
                    ></input>
                    {error && <p className="error">{error}</p>}
                </>
            );

        case type.boolean:
            return (
                <>
                    <select
                        className={error ? "input-error" : "selectionSurvey"}
                        name={id}
                        id={id}
                        onChange={inputChange}
                        value={value}
                    >
                        <option value="none" selected disabled hidden>
                            Select an Option
                        </option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                    {error && <p className="error">{error}</p>}
                </>
            );
        case type.sex:
            return (
                <>
                    <select
                        className={error ? "input-error" : "selectionSurvey"}
                        name={id}
                        id={id}
                        onChange={inputChange}
                        value={value}
                    >
                        <option value="none" selected disabled hidden>
                            Select an Option
                        </option>
                        <option value="0">Female</option>
                        <option value="1">Male</option>
                    </select>
                    {error && <p className="error">{error}</p>}
                </>
            );
        case type.sport:
            return (
                <>
                    <select
                        className={error ? "input-error" : "selectionSurvey"}
                        name={id}
                        id={id}
                        onChange={inputChange}
                        value={value}
                    >
                        <option value="none" selected disabled hidden>
                            Select an Option
                        </option>
                        <option value="0">I don't move a lot</option>
                        <option value="1">Half an hour 2-3 days a week</option>
                        <option value="2">Half an hour 5 days a week</option>
                        <option value="3">More than 2 hours a week</option>
                    </select>
                    {error && <p className="error">{error}</p>}
                </>
            );
        case type.alcohol:
            return (
                <>
                    <select
                        className={error ? "input-error" : "selectionSurvey"}
                        name={id}
                        id={id}
                        onChange={inputChange}
                        value={value}
                    >
                        <option value="none" selected disabled hidden>
                            Select an Option
                        </option>
                        <option value="0">Every day</option>
                        <option value="1">3 to 6 days a week</option>
                        <option value="2">1 to 2 days a week</option>
                        <option value="3">Less than once a week</option>
                        <option value="4">I don't drink</option>
                    </select>
                    {error && <p className="error">{error}</p>}
                </>
            );

        case type.alim:
            return (
                <>
                    <select
                        className={error ? "input-error" : "selectionSurvey"}
                        name={id}
                        id={id}
                        onChange={inputChange}
                        value={value}
                    >
                        <option value="none" selected disabled hidden>
                            Select an Option
                        </option>
                        <option value="0">Never</option>
                        <option value="1">Some times</option>
                        <option value="2">Frequently</option>
                        <option value="3">Most of the time</option>
                    </select>
                    {error && <p className="error">{error}</p>}
                </>
            );

        default :
            return (
                <>
                    <input
                        className={error ? "input-error" : "selectionSurvey"}
                        onChange={inputChange}
                        id={id}
                        name={id}
                        type="number"
                        value={value}
                    ></input>
                    {error && <p className="error">{error}</p>}
                </>
            );
    }
}
