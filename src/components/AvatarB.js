// import React, {useEffect, useState} from "react";
//
//
// export default function Avatar() {
//
//     const [settings, setSettings] = useState(
//         {
//                     top: "longHair",
//                     topColor: "auburn",
//                     facialHair: "none",
//                     clothes: "blazer",
//                     clothesColor: "black",
//                     eyes: "default",
//                     eyebrow: "default",
//                     mouth: "default",
//                     skin: "pale",
//                     sick: "no"
//                 }
//     // {top: "longHair"},
//     // {topColor: "auburn"},
//     // {facialHair: "none"},
//     // {clothes: "blazer"},
//     // {clothesColor: "black"},
//     // {eyes: "default"},
//     // {eyebrow: "default"},
//     // {mouth: "default"},
//     // {skin: "pale"},
//     // {sick: "no"}
//
//     );
//
//
//     const urlBase = "https://avatars.dicebear.com/api/avataaars/2.svg?top=" +settings.top
//                     + "&hairColor=" +settings.topColor
//                     + "&clothes=" + settings.clothes
//                     + "&clothesColor="+ settings.clothesColor
//                     + "&eyes=" +settings.eyes
//                     + "&eyebrow=" +settings.eyebrow
//                     + "&mouth=" +settings.mouth
//                     + "&skin=" + settings.skin
//                     ;
//
//     const [url, setUrl] = useState();
//
//
//     //Testing for the results
//     const [sick, setSick] = useState([
//         {value: "no", text: "No"},
//         {value: "yes", text: "Yes"}
//     ]);
//
//     const top = [
//         {value: "longHair", text: "Long Hair"},
//         {value: "shortHair", text: "Short Hair"},
//         {value: "hijab", text: "Hijab"},
//         {value: "bigHair", text: "No"},
//         {value: "bob", text: "Bob"},
//         {value: "bun", text: "Bun"},
//         {value: "curly", text: "Curly Hair"},
//         {value: "curvy", text: "Curvy Hair"},
//         {value: "dreads", text: "Dreads"},
//         {value: "frida", text: "Frida"},
//         {value: "fro", text: "Fro"},
//         {value: "froAndBand", text: "No"},
//         {value: "miaWallace", text: "Mia Wallace"},
//         {value: "longButNotTooLong", text: "Not too Long"},
//         {value: "shavedSides", text: "Shaved Sides"},
//         {value: "straight01", text: "Straight"},
//         {value: "frizzle", text: "Frizzle"},
//         {value: "shaggy", text: "Shaggy"},
//         {value: "shaggyMullet", text: "Mullet"},
//         {value: "shortCurly", text: "Short Curly"},
//         {value: "shortFlat", text: "Short Flat"},
//         {value: "shortRound", text: "Short Round"},
//         {value: "shortWaved", text: "Short Waved"},
//         {value: "sides", text: "Sides"},
//         {value: "theCaesar", text: "The Caesar"}
//         ];
//
//     const topColor = [
//         {value: "auburn", text: "Auburn"},
//         {value: "black", text: "Black"},
//         {value: "blonde", text: "Blonde"},
//         {value: "blondeGolden", text: "Golden"},
//         {value: "brown", text: "Brown"},
//         {value: "brownDark", text: "Dark Brown"},
//         {value: "pastel", text: "Pastel"},
//         {value: "platinum", text: "Platinum"},
//         {value: "red", text: "Red"},
//         {value: "gray", text: "Gray"}];
//     const facialHair = [
//         {value: "none", text: "No"},
//         {value: "medium", text: "Medium"},
//         {value: "light", text: "Light"},
//         {value: "majestic", text: "Majestic"},
//         {value: "fancy", text: "Fancy"},
//         {value: "magnum", text: "Magnum"}];
//     const clothes = [
//         {value: "blazer", text: "Blazer"},
//         {value: "blazerAndSweater", text: "Blazer and Sweater"},
//         {value: "sweater", text: "Sweater"},
//         {value: "shirt", text: "Shirt"},
//         {value: "shirtCrewNeck", text: "Shirt with Crewneck"},
//         {value: "shirtScoopNeck", text: "Shirt with Scoopneck"},
//         {value: "shirtVNeck", text: "Shirt with V-Neck"},
//         {value: "hoodie", text: "Hoodie"},
//         {value: "overall", text: "Overall"}];
//     const clothesColor = [
//         {value: "black", text: "Black"},
//         {value: "blue01", text: "Blue 01"},
//         {value: "blue02", text: "Blue 02"},
//         {value: "blue03", text: "Blue 03"},
//         {value: "gray01", text: "Gray 01"},
//         {value: "gray02", text: "Gray 02"},
//         {value: "heather", text: "Heather"},
//         {value: "pastel", text: "Pastel"},
//         {value: "pastelBlue", text: "Pastel Blue"},
//         {value: "pastelGreen", text: "Pastel Green"},
//         {value: "pastelOrange", text: "Pastel Orange"},
//         {value: "pastelRed", text: "Pastel Red"},
//         {value: "pastelYellow", text: "Pastel Yellow"},
//         {value: "pink", text: "Pink"},
//         {value: "red", text: "Red"},
//         {value: "white", text: "White"}];
//     const eyes = [
//         {value: "default", text: "Default"},
//         {value: "closed", text: "Closed"},
//         {value: "cry", text: "Cry"},
//         {value: "xDizzy", text: "Dizzy"},
//         {value: "eyeRoll", text: "Eye Roll"},
//         {value: "happy", text: "Happy"},
//         {value: "hearts", text: "Hearts"},
//         {value: "side", text: "Side"},
//         {value: "squint", text: "Squint"},
//         {value: "surprised", text: "Surprised"},
//         {value: "wink", text: "Wink"},
//         {value: "winkWacky", text: "Wink Wacky"}
//     ];
//     const eyebrow = [
//         {value: "default", text: "Default"},
//         {value: "angry", text: "Angry"},
//         {value: "flat", text: "Flat"},
//         {value: "raised", text: "Raised"},
//         {value: "raisedExcited", text: "Raised Excited"},
//         {value: "sad", text: "Sad"},
//         {value: "sadConcerned", text: "Sad Concerned"},
//         {value: "unibrow", text: "Unibrow"},
//         {value: "up", text: "Up"},
//         {value: "upDown", text: "Up Down"},
//         {value: "frown", text: "Frown"}
//     ];
//     const mouth = [
//         {value: "default", text: "Default"},
//         {value: "concerned", text: "Concerned"},
//         {value: "disbelief", text: "Disbelief"},
//         {value: "eating", text: "Eating"},
//         {value: "grimace", text: "Grimace"},
//         {value: "sad", text: "Sad"},
//         {value: "scream", text: "Scream"},
//         {value: "serious", text: "Serious"},
//         {value: "smile", text: "Smile"},
//         {value: "tongue", text: "Tongue Out"},
//         {value: "twinkle", text: "Twinkle"},
//         {value: "vomit", text: "Vomit"}
//     ];
//     const skin = [
//         {value: "pale", text: "Pale"},
//         {value: "tanned", text: "Tanned"},
//         {value: "yellow", text: "Yellow"},
//         {value: "light", text: "Light"},
//         {value: "brown", text: "Brown"},
//         {value: "darkBrown", text: "Dark Brown"},
//         {value: "black", text: "Black"}
//     ];
//
//     const ChangeSelection = (event) => {
//         let choice = event.target.value;
//         let name = event.target.name;
//         // let newSettings = async () => await
//         setSettings({...settings, [name]: choice});
//
//         //1. copy settings list
//
//
//         console.log("")
//
//         console.log("CHOICE: " + choice + ", NAME: " + name + ", hair value: " +settings[0].value);
//         // console.log("URL 1: " + url);
//         BuildApiUrl();
//         //
//         // // console.log("URL from buildApi : " + buildApiUrl());
//         // console.log("URL 2: " + url);
//         return;
//     }
//
//     useEffect( () => {
//         console.log("JE passe dans useEffect et l'url est (avant buildApi): " +url)
//             BuildApiUrl();
//         // setUrl(urlBase);
//         console.log("JE passe dans useEffect et l'url est (après buildApi): " +url)
//         }, [url]
//     )
//
//     const BuildApiUrl = () => {
//
//         let newUrl;
//         //Testing for resultpage
//         if (settings.sick === "yes") {
//             newUrl = "https://avatars.dicebear.com/api/avataaars/2.svg?top=" + settings.top
//                 + "&hairColor=" + settings.topColor + "&clothes=" + settings.clothes
//                 + "&clothesColor=" + settings.clothesColor + "&eyes=cry"
//                 + "&eyebrow=sad" + "&mouth=sad" + "&skin=" + settings.skin
//                 + "&background=red";
//             setUrl(newUrl);
//             return;
//         }
//         console.log("build new 1 " +settings.top)
//         newUrl =
//             "https://avatars.dicebear.com/api/avataaars/2.svg?top=" + settings.top
//             + "&hairColor=" + settings.topColor + "&clothes=" + settings.clothes
//             + "&clothesColor=" + settings.clothesColor + "&eyes=" + settings.eyes
//             + "&eyebrow=" + settings.eyebrow + "&mouth=" + settings.mouth
//             + "&skin=" + settings.skin;
//
//         if (settings.facialHair !== "none") {
//             newUrl += "&facialHair=" + settings.facialHair + "&facialHairChance=100&facialHairColor=" + settings.topColor;
//         }
//
//         if (settings.top === "hijab") {
//             newUrl += "&hatColor=gray";
//         }
//         console.log("Dans le buildAPI, avant setURL: " + url);
//         console.log("Et newURL avant ??? " + newUrl);
//         setUrl(newUrl);
//         console.log("Dans le buildAPI, après setURL: " + url);
//         console.log("Et newURL alors ??? " + newUrl);
//     }
//
//     console.log("JUSTE AVANT RETURN : " +url);
//
//     // render() {
//     //     console.log("THIS URL : " + this.state.avatarUrl);
//         return (
//             <div style={{display:'flex', alignItems:'center', WebkitJustifyContent:'center'}}>
//                 <div>
//                     <img src={url} height= "200px" alt="Sprite" />
//                 </div>
//                 {/*<form onSubmit={this.updateURL}>*/}
//                 {/*    <button className="btn_ValidAvatar" type={"Submit"}>Save Avatar</button>*/}
//                 {/*</form>*/}
//                     <div style={{display:'flex', alignItems:'center', WebkitJustifyContent:'center', padding: 0}}>
//                     <div>
//                         <h2>Hair</h2>
//                         <select onChange={ChangeSelection} name="top" id="top">
//                             {top.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                         <h2>Hair Color</h2>
//                         <select onChange={ChangeSelection} name="topColor" id="topColor">
//                             {topColor.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                         <h2>Eyes</h2>
//                         <select onChange={ChangeSelection} name="eyes" id="eyes">
//                             {eyes.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                         <h2>Eyebrow</h2>
//                         <select onChange={ChangeSelection} name="eyebrow" id="eyebrow">
//                             {eyebrow.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                         <h2>Mouth</h2>
//                         <select onChange={ChangeSelection} name="mouth" id="mouth">
//                             {mouth.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div>
//                         <h2>Skin Color</h2>
//                         <select onChange={ChangeSelection} name="skin" id="skin">
//                             {skin.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                         <h2>Clothes</h2>
//                         <select onChange={ChangeSelection} name="clothes" id="clothes">
//                             {clothes.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                         <h2>Clothes Color</h2>
//                         <select onChange={ChangeSelection} name="clothesColor" id="clothesColor">
//                             {clothesColor.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                         <h2>Sick</h2>
//                         <p>(how it would look on the result page)</p>
//                         <select onChange={ChangeSelection} name="sick" id="sick">
//                             {sick.map((option, index) => (
//                                 <option key={index} value={option.value} name={option.text}>
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>
//
//             </div>
//         )
//     // }
// }//End of function Avatar
//
//
