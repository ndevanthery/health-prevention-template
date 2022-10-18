// import {auth, db} from "../initFirebase";
// import {useNavigate, useParams} from "react-router-dom";
// import React, {useContext, useEffect, useState} from "react";
// import {collection, doc, getDocs, addDoc} from "firebase/firestore";
// import QuestionForm from "../components/QuestionForm";
//
// class Question extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             questionNum: 0,
//             questionGroup:"",
//             questionText: "",
//             questionAvailability: true
//         };
//     }
//
//     //Make it visible only if user has admin rights
//     handleAvailableClick = async () => {
//         this.props.questionAvailability(this.props.id);
//     };
//
//     render() {
//         //if we want a specific format, code it here
//
//         return (
//             <div className ="Question" >
//
//                 <header className = "Question-header">
//                     <p>{this.props.name}</p>
//
//                 </header>
//             </div>
//         )
//     }
// }
//
//
// // Make it visible only for administrators
// class AddQuestionForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             newQuestion: this.emptyQuestion
//         };
//     }
//     textQuestion = React.createRef(); //useful for getting focus
//     emptyQuestion = { questionNum: 0, questionGroup:"", questionText: "", questionAvailability: true};
//
//     handleSubmit = async (event) => {
//         event.preventDefault();
//
//         /* Saving new question on the server */
//         const ref = await addDoc( collection(db, "questions"), {
//             questionNum: this.state.newQuestion.questionNum,
//             questionGroup: this.state.newQuestion.questionGroup,
//             questionText: this.state.newQuestion.questionText,
//         });
//
//         this.props.addQuestion(this.state.newQuestion);
//
//         this.resetNewQuestion();
//         // this.focusQuestionText();
//
//     };
//
//     resetNewQuestion = () =>{
//         this.setState({newQuestion: this.emptyQuestion});
//     }
//
//     focusQuestionText = () => {
//         this.textQuestion.current.focus();
//     }
//
//     handleChange = event => {
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;
//         this.setState((state) => ({
//             newQuestion: {...state.newQuestion, [name]: value },
//         }));
//     }
//
//     render() {
//         return (
//             <>Add a question :
//                 <p/><form onSubmit={this.handleSubmit}>
//
//                     {/*The number of the question*/}
//                     {/*<FormInput*/}
//                     {/*    type="number"*/}
//                     {/*    name="questionNum"*/}
//                     {/*    value={this.state.newQuestion.questionNum}*/}
//                     {/*    onChange={this.handleChange}*/}
//                     {/*/><p/>*/}
//
//                     <p  align='left' >The group of the question:
//                     <select name="questionGroup" onChange={(e) => this.handleChange(e)}>
//                         <option defaultValue="You">You</option>
//                         <option value="Family">Family</option>
//                         <option value="Habits">Habits</option>
//                     </select> </p>
//                     <p/>
//
//                     <p  align='left' >The question title:
//                     <FormInput
//                         // ref = {this.textQuestion}
//                         type="text"
//                         name="questionText"
//                         value={this.state.newQuestion.questionText}
//                         placeholder={"Question"}
//                         onChange={this.handleChange}
//                     /></p>
//                     <p/>
//
//                     <button type={"submit"}>Add new question</button>
//                 </form>
//             </>
//         )
//     }
//
// }
//
// function FormInput( {type, name, value, placeholder, onChange}) {//{fieldRef, ...props}) {
//         return (
//             <>
//                 <input //ref = {fieldRef ? fieldRef : null} {...props}
//                     type = {type}
//                     name = {name}
//                     value = {value}
//                     placeholder={placeholder}
//                     onChange={onChange}
//                 />
//             </>
//         )
// }
//
//
// function QuestionHelper({ questions, available }) {
//     let params = useParams();
//     return <Question {...questions.find((question) => question.id === +params.id)}
//                         available={available}
//         />
// }
//
// function QuestionsList( {questions}) {
//     let [availableOnly, setAvailable] = useState(true);
//     let list = ( availableOnly ? questions.filter(question => question.questionAvailability === true) : questions )
//
//     const handleAvailableOnly = () => {
//         setAvailable(!availableOnly);
//     };
//
//     return (
//         <>
//             <input /* "available only" 's checkbox */
//                 id={"show-available-only"}
//                 type='checkbox'
//                 checked={availableOnly}
//                 onChange={handleAvailableOnly}
//             />
//             <label htmlFor={"show-available-only"}>Only available questions</label>
//
//             <ul style={{ listStyleType: 'none', padding: 0, fontSize: '14px' }}>
//                 {list.map((question) => (
//                     <li><div><p align='left'> Question about : {question.questionGroup} - Question: {question.questionText} </p></div></li>
//
//                 ))}
//             </ul>
//         </>
//     );
//
// }
//
// // Display questions' screen
// export function Questions() {
//     let [questions, setQuestions] = useState([]);
//
//     useEffect(  () => {
//
//         /* fetching all questions of questionnaire*/
//         async function getQuestions() {
//         const querySnapshot = await getDocs(collection(db, "questions"));
//         querySnapshot.forEach((doc) => {
//             questions.push(doc.data());
//             // console.log(doc.id, "=>", doc.data());
//             })
//         }
//         getQuestions();
//     },[questions] );
//
//     let addQuestion = newQuestion => { setQuestions(prevQuestions => [newQuestion, ...prevQuestions]) };
//
//     let handleToggleAvailable = async (idToToggle) => {
//         //Copy questions
//         let updateQuestions = [...questions];
//         //Find index of question to update
//         let questionIndex = updateQuestions.findIndex((question) => question.id === idToToggle);
//         //Check if question should be available/unavailable
//         let questionToUpdate = updateQuestions[questionIndex];
//         let action = questionToUpdate.questionAvailability ? "unavailable" : "available";
//         //Toggle question status on server
//         let toggleQuestionResponse = await fetch(
//             `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}/${action}/${idToToggle}`,
//             {method: 'POST'}
//         );
//         // Toggle was successful
//         if (toggleQuestionResponse.ok) {
//             //Toggle liked state of book
//             questionToUpdate.questionAvailability = !questionToUpdate.questionAvailability;
//
//             //update questions
//             // setQuestions(updateQuestions);
//         }
//     }
//
//     return (
//         <div className="Questions">
//             <header className="Questions-header" >
//
//                 <AddQuestionForm addQuestion={addQuestion}/><p/>
//
//                 <QuestionsList questions={questions} />
//
//             </header>
//         </div>
//
//     );
//
// }
//
//
//
