import {useNavigate} from "react-router-dom";
import {doc, getDoc, setDoc } from "firebase/firestore";
import {auth, db} from "../initFirebase";
import {useEffect, useState} from "react";


export default function NormalValues() {
    const navigate = useNavigate();

    const [nValues, setNValues] = useState({})


    useEffect(() => {
        fetchValues();
    },[])

    const fetchValues = async () => {
        try {
            const docRef = doc(db, "normalValues", "normalValuesDoc");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setNValues({ ...docSnap.data() })
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange= (e) => {
        const field = e.target.name;
        const value = e.target.value;

        console.log(e.target.value)
        e.target.setAttribute("value",e.target.value)

        setNValues({[field]: value});
        console.log("Change")
    }


    const handleSubmit =  async (e) => {
        e.preventDefault();

        await setDoc(doc(db, "normalValues", "normalValuesDoc"), {
            infarctusAge: e.target[0].value,
            infarctusGender: e.target[1].value,
            infarctusSmoking: e.target[2].value,
            infarctusSyst: e.target[3].value,
            infarctusDM: e.target[4].value,
            infarctusINF: e.target[5].value,
            infarctusCHOL: e.target[6].value,
            infarctusHDL: e.target[7].value,
            infarctusCHOL0: e.target[8].value,
            infarctusEGRF: e.target[9].value,
            infarctusCRP: e.target[10].value,

            diabeteMAge45: e.target[11].value,
            diabeteMAge4555: e.target[12].value,
            diabeteMAge55: e.target[13].value,
            diabeteMBmi2027: e.target[14].value,
            diabeteMBmi2730: e.target[15].value,
            diabeteMBmi30: e.target[16].value,
            diabeteMAdditionalWaistCoefficient: e.target[17].value,
            diabeteMHypertension: e.target[18].value,
            diabeteMHighBloodSugar: e.target[19].value,
            diabeteMSport: e.target[20].value,
            diabeteMAlim: e.target[21].value,

            diabeteWAge45: e.target[22].value,
            diabeteWAge4555: e.target[23].value,
            diabeteWAge55: e.target[24].value,
            diabeteWBmi2027: e.target[25].value,
            diabeteWBmi2730: e.target[26].value,
            diabeteWBmi30: e.target[27].value,
            diabeteWAdditionalWaistCoefficient: e.target[28].value,
            diabeteWHypertension: e.target[29].value,
            diabeteWHighBloodSugar: e.target[30].value,
            diabeteWSport: e.target[31].value,
            diabeteWAlim: e.target[32].value
        })

        console.log("Submit")
    };

    return (
        <div>
            <h1>Edit Normal Values</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Infarct Values</h2>
                    <label>Age </label>
                    <input type="number" min="30" max="90" value={nValues.infarctusAge} name="infarctusAge" onChange={handleChange}/>

                    <label>Gender </label>
                    <input type="number" min="0" max="1" value={nValues.infarctusGender} name="infarctusGender" onChange={handleChange}/>

                    <label>Smoking </label>
                    <input type="number" min="0" max="1" value={nValues.infarctusSmoking} name="infarctusSmoking" onChange={handleChange}/>

                    <label>Systolic mmHg </label>
                    <input type="number" min="90" max="200" value={nValues.infarctusSyst} name="infarctusSyst" onChange={handleChange}/><br/>

                    <label>Diabetes </label>
                    <input type="number" min="0" max="1" value={nValues.infarctusDM} name="infarctusDM" onChange={handleChange}/>

                    <label>Infarct </label>
                    <input type="number" min="0" max="1" value={nValues.infarctusINF} name="infarctusINF" onChange={handleChange}/>

                    <label>Cholesterol mmol/l </label>
                    <input type="number" min="2.5" max="8" step="0.1" value={nValues.infarctusCHOL} name="infarctusCHOL" onChange={handleChange}/>

                    <label>HDL mmol/l </label>
                    <input type="number" min="0.1" max="2.5" step="0.1" value={nValues.infarctusHDL} name="infarctusHDL" onChange={handleChange}/><br/>

                    <label>Cholesterol mmol/l 2 </label>
                    <input type="number" step="0.1" value={nValues.infarctusCHOL0} name="infarctusCHOL0" onChange={handleChange}/>

                    <label>eGRF ml/min </label>
                    <input type="number" step="0.1" value={nValues.infarctusEGRF} name="infarctusEGRF" onChange={handleChange}/>

                    <label>CRP mg/l </label>
                    <input type="number" step="0.1" value={nValues.infarctusCRP} name="infarctusCRP" onChange={handleChange}/>

                    <h2>Diabetes Values Men</h2>

                    <label>Age under 45 </label>
                    <input type="number" value={nValues.diabeteMAge45} name="diabeteMAge45" onChange={handleChange}/>

                    <label>Age 45-55 </label>
                    <input type="number"  value={nValues.diabeteMAge4555} name="diabeteMAge4555" onChange={handleChange}/>

                    <label>Age over 55 </label>
                    <input type="number" value={nValues.diabeteMAge55} name="diabeteMAge55" onChange={handleChange}/>

                    <label>BMI 20-27 </label>
                    <input type="number" value={nValues.diabeteMBmi2027} name="diabeteMBmi2027" onChange={handleChange}/>

                    <label>BMI 27-30 </label>
                    <input type="number" value={nValues.diabeteMBmi2730} name="diabeteMBmi2730" onChange={handleChange}/>

                    <label>BMI over 30 </label>
                    <input type="number" value={nValues.diabeteMBmi30} name="diabeteMBmi30" onChange={handleChange}/>

                    <label>Additional Waist Coefficient  </label>
                    <input type="number" value={nValues.diabeteMAdditionalWaistCoefficient} name="diabeteMAdditionalWaistCoefficient" onChange={handleChange}/>

                    <label>Hypertension </label>
                    <input type="number" value={nValues.diabeteMHypertension} name="diabeteMHypertension" onChange={handleChange}/>

                    <label>High Blood Sugar </label>
                    <input type="number" value={nValues.diabeteMHighBloodSugar} name="diabeteMHighBloodSugar" onChange={handleChange}/>

                    <label>Sport </label>
                    <input type="number" value={nValues.diabeteMSport} name="diabeteMSport" onChange={handleChange}/>

                    <label>Alimentation </label>
                    <input type="number" step="0.1" value={nValues.diabeteMAlim} name="diabeteMAlim" onChange={handleChange}/>

                    <h2>Diabetes Values Woman</h2>

                    <label>Age under 45 </label>
                    <input type="number" value={nValues.diabeteWAge45} name="diabeteWAge45" onChange={handleChange}/>

                    <label>Age 45-55 </label>
                    <input type="number"  value={nValues.diabeteWAge4555} name="diabeteWAge4555" onChange={handleChange}/>

                    <label>Age over 55 </label>
                    <input type="number" value={nValues.diabeteWAge55} name="diabeteWAge55" onChange={handleChange}/>

                    <label>BMI 20-27 </label>
                    <input type="number" value={nValues.diabeteWBmi2027} name="diabeteWBmi2027" onChange={handleChange}/>

                    <label>BMI 27-30 </label>
                    <input type="number" value={nValues.diabeteWBmi2730} name="diabeteWBmi2730" onChange={handleChange}/>

                    <label>BMI over 30 </label>
                    <input type="number" value={nValues.diabeteWBmi30} name="diabeteWBmi30" onChange={handleChange}/>

                    <label>Additional Waist Coefficient  </label>
                    <input type="number" value={nValues.diabeteWAdditionalWaistCoefficient} name="diabeteWAdditionalWaistCoefficient" onChange={handleChange}/>

                    <label>Hypertension </label>
                    <input type="number" value={nValues.diabeteWHypertension} name="diabeteWHypertension" onChange={handleChange}/>

                    <label>High Blood Sugar </label>
                    <input type="number" value={nValues.diabeteWHighBloodSugar} name="diabeteWHighBloodSugar" onChange={handleChange}/>

                    <label>Sport </label>
                    <input type="number" value={nValues.diabeteWSport} name="diabeteWSport" onChange={handleChange}/>

                    <label>Alimentation </label>
                    <input type="number" step="0.1" value={nValues.diabeteWAlim} name="diabeteWAlim" onChange={handleChange}/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>

        </div>
    )
}