import React, {useEffect, useState} from "react";
import {auth, db} from "../initFirebase";


class Question extends React.Component {
    constructor() {
        super();
        this.state = {
            // answer: this.emptyAnswer
        };
    }
    // emptyAnswer = { group: "", num: 0, variable: "", text: "", repType: null, answerRange:[], unit:"", userAnswer: null };

    render() {
        return (
            <div align='left'>
                <p>{this.props.num} : {this.props.text}
                </p>
            </div>
        )
    }

}

class Answers extends React.Component {
    constructor() {
        super();
        this.state = {
            user: auth.currentUser.uid,
            answers: this.emptyAnswers
        };
    }

    emptyAnswers = { sexe: "", age: "", poids: "", taille: "", syst: "", glyc: "", chol: "", diab: "", inf:"", avc:"",
                    afinf:"", afcancer: "",
                    fume: "", alim: "", sport: "", alcool: "",
                    };


}


export function Questionnaire() {

    const yn = [{value:-1, text: "-- Oui / Non ? --"}, {value:0, text:"Oui"}, {value:1, text:"Non"}] //for boolean answers
    let answers = { sexe: "", age: "", poids: "", taille: "", syst: "", glyc: "", chol: "", diab: "", inf:"", avc:"",
        afinf:"", afcancer: "",
        fume: "", alim: "", sport: "", alcool: "",
    };

    /*
    repType = -1 for answers presented in a list
    repType = -2 for number defined by user (age, size, e.g.)
    repType = -3 for text
    */
    const questYouList =[
        {group: "You", num: 1, variable: "SEXE", text: "homme - femme ?",userAnswer: -1, repType: -1, answerRange:[ {value:-1,text:"-- homme / femme ? --"}, {value:0,text: "homme"}, {value:1,text: "femme"} ] },
        {group: "You", num: 2, variable: "AGE", text: "Votre âge ?",userAnswer: -1 , repType: -2, answerRange:[1,120], unit:"ans"},
        {group: "You", num: 3, variable: "POIDS", text: "Votre poids ?",userAnswer: -1 , repType: -2, answerRange:[20,220], unit:"kg"},
        {group: "You", num: 4, variable: "TAILLE", text: "Votre taille ?",userAnswer: -1 , repType: -2, answerRange:[120,220], unit:"cm"},
        {group: "You", num: 5, variable: "SYST", text: "Etes-vous connu pour une tension élevée ?",userAnswer: -1 , repType: -1, answerRange:yn},
        {group: "You", num: 6, variable: "GLYC", text: "Etes-vous connu pour un sucre sanguin élevé ?",userAnswer: -1 , repType: -1, answerRange:yn},
        {group: "You", num: 7, variable: "CHOL", text: "Etes-vous connu pour un cholestérol élevé ?",userAnswer: -1 , repType: -1, answerRange:yn},
        {group: "You", num: 8, variable: "DIAB", text: "Etes-vous diabétique ?",userAnswer: -1 , repType: -1, answerRange:yn},
        {group: "You", num: 9, variable: "INF", text: "Avez-vous déjà eu un infarctus ?",userAnswer: -1 , repType: -1, answerRange:yn},
        {group: "You", num: 10, variable: "AVC", text: "Avez-vous déjà eu une attaque cérébrale ?",userAnswer: -1 , repType: -1, answerRange:yn},
    ];

    const questFamilyList = [
        {group: "Family", num: 11, variable: "AFINF", text: "Un parent (père avant 55 ans, mère avant 65 ans) avec infarctus ?", repType: -1, answerRange:yn},
        {group: "Family", num: 12, variable: "AFCANCER", text: "Un parent proche (père, mère, frères ou sœurs) avec un cancer ?", repType: -1, answerRange:yn},
    ];

    const questHabitsList = [
        {group: "Habits", num: 13, variable: "FUME", text: "Est-ce que vous avez fumé régulièrement une fois dans votre vie ?", repType: -1, answerRange:yn},
        {group: "Habits", num: 14, variable: "ALIM", text: "Fruits, légumes, huile d'olive, noix, poissons gras, peu de viande, de crème, de charcuterie ?", repType: -1, answerRange:[0,1,2,3,4]},
        {group: "Habits", num: 15, variable: "SPORT", text: "Mon activité physique comprend :", repType: -1, answerRange:[0,1]},
        {group: "Habits", num: 16, variable: "ALCOOL", text: "Ma consommation d'alcool :", repType: -1, answerRange:[0,1]},
    ];

    const handleChange = event => {
        event.preventDefault();
        //gérer l'enregistrement des réponses
        let variable = event.target
        console.log("Variable modified : " +variable);

    }

    return (

            <div className="Questionnaire">
                <header>
                    <h2>Questions sur vous</h2>
                    <ul style={{ listStyleType: "none", padding: 0, fontSize: '14px' }}>
                        {questYouList.map((question) => (
                            <li key={question.num} onChange={handleChange}>
                                <Question {...question} />
                                <AnswerForm question={question} />
                            </li>
                        ))}
                    </ul>
                    <h2>Questions sur votre famille</h2>
                    <ul style={{ listStyleType: "none", padding: 0, fontSize: '14px' }}>
                        {questFamilyList.map((question, index) => (
                            <li key={question.num}>
                                <Question {...question} />
                            </li>
                        ))}
                    </ul>
                    <h2>Questions sur vos habitudes</h2>
                    <ul style={{ listStyleType: "none", padding: 0, fontSize: '14px' }}>
                        {questHabitsList.map((question, index) => (
                            <li key={question.num}>
                                <Question {...question} />
                            </li>
                        ))}
                    </ul>
                </header>
            </div>
    );
}


function AnswerForm( {question} ) {
    //gérer le type de réponse (choix 1,2 ou 1,2,3,4) selon answerRange

    const [answer, setAnswer] = useState(question.userAnswer)

    const [selected, setSelected] = useState(question.answerRange[0].value)
    const handleSelectionChange = event => {
        setSelected(event.target.value);
        setAnswer(answer => event.target.value);
        question.userAnswer = answer;
        console.log(question.userAnswer);
    }

    const handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        // this.setState((state) => ({
        //     answers: {...state.answers, [name]: value },
        // }));
    }




    // Take care: the order of useState values does matter !
    const [value, onChange]=useState();
    useEffect(() => {
        const element = document.querySelector('.buble');
            if(element) {
                element.style.left = `${Number(value /4)}px`;
            }

        })

  if(question.repType === -1) {
      return (
          <select key={question.num} value={selected} onChange={handleSelectionChange}>
              {question.answerRange.map(option => (
                  <option key={option.index} value={option.value}>
                      {option.text}
                  </option>
              ))}
          </select>
      );
  }
  if(question.repType === -2){
      return (
          <div className="buble">
              {value} {question.unit}
              <div className="slider-parent">
                  <input
                      id={question.num}
                      type="range"
                      className="slider"
                      value={value}
                      min={question.answerRange[0]}
                      max={question.answerRange[1]}
                      step="1"
                      onChange={ ({ target: { value:val} }) => {
                          onChange(val);
                      } }
                  />
              </div>
          </div>
      );
  }

}





