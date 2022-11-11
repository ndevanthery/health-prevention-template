import {doc, getDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../initFirebase";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import {RoleContext} from "../App";
import "../Stylesheets/AvatarEditor.css";

export default function AvatarEditor() {
    const navigate = useNavigate();
    const role = useContext(RoleContext);
    let [user, setUser] = useState([]);
    let [settings, setSettings] = useState({
        top: "longHair",
        hairColor: "auburn",
        clothes: "blazer",
        clothesColor: "black",
        eyes: "default",
        eyebrow: "default",
        mouth: "default",
        skin: "pale"
    })


    useEffect(() => {
        checkLogin()
        fetchSettings()
    }, [])

    const checkLogin = () => {
        if (auth.currentUser && (role.idRole === 2 || role.idRole === 4)) {

        } else {
            navigate("/")
        }
    }

    const fetchSettings = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUser(await docSnap.data())

            let allSettings = docSnap.data().avatarUrl.split("?")
            console.log(allSettings[1])
            let settings = allSettings[1].split("&")
            for (let i = 0; i < settings.length; i++) {
                let oneSetting = settings[i].split("=")
                let name = oneSetting[0]
                console.log()
                setSettings(prevState => ({...prevState, [name]: oneSetting[1]}));
            }
        }
    }

    let top = [
        {value: "longHair", text: "Long Hair"},
        {value: "shortHair", text: "Short Hair"},
        {value: "bigHair", text: "No"},
        {value: "bob", text: "Bob"},
        {value: "bun", text: "Bun"},
        {value: "curly", text: "Curly Hair"},
        {value: "curvy", text: "Curvy Hair"},
        {value: "dreads", text: "Dreads"},
        {value: "frida", text: "Frida"},
        {value: "fro", text: "Fro"},
        {value: "froAndBand", text: "No"},
        {value: "miaWallace", text: "Mia Wallace"},
        {value: "longButNotTooLong", text: "Not too Long"},
        {value: "shavedSides", text: "Shaved Sides"},
        {value: "straight01", text: "Straight"},
        {value: "frizzle", text: "Frizzle"},
        {value: "shaggy", text: "Shaggy"},
        {value: "shaggyMullet", text: "Mullet"},
        {value: "shortCurly", text: "Short Curly"},
        {value: "shortFlat", text: "Short Flat"},
        {value: "shortRound", text: "Short Round"},
        {value: "shortWaved", text: "Short Waved"},
        {value: "sides", text: "Sides"},
        {value: "theCaesar", text: "The Caesar"}];
    let topColor = [
        {value: "auburn", text: "Auburn"},
        {value: "black", text: "Black"},
        {value: "blonde", text: "Blonde"},
        {value: "blondeGolden", text: "Golden"},
        {value: "brown", text: "Brown"},
        {value: "brownDark", text: "Dark Brown"},
        {value: "pastel", text: "Pastel"},
        {value: "platinum", text: "Platinum"},
        {value: "red", text: "Red"},
        {value: "gray", text: "Gray"}];
    let clothes = [
        {value: "blazer", text: "Blazer"},
        {value: "blazerAndSweater", text: "Blazer and Sweater"},
        {value: "sweater", text: "Sweater"},
        {value: "shirt", text: "Shirt"},
        {value: "shirtCrewNeck", text: "Shirt with Crewneck"},
        {value: "shirtScoopNeck", text: "Shirt with Scoopneck"},
        {value: "shirtVNeck", text: "Shirt with V-Neck"},
        {value: "hoodie", text: "Hoodie"},
        {value: "overall", text: "Overall"}];
    let clothesColor = [
        {value: "black", text: "Black"},
        {value: "blue01", text: "Blue 01"},
        {value: "blue02", text: "Blue 02"},
        {value: "blue03", text: "Blue 03"},
        {value: "gray01", text: "Gray 01"},
        {value: "gray02", text: "Gray 02"},
        {value: "heather", text: "Heather"},
        {value: "pastel", text: "Pastel"},
        {value: "pastelBlue", text: "Pastel Blue"},
        {value: "pastelGreen", text: "Pastel Green"},
        {value: "pastelOrange", text: "Pastel Orange"},
        {value: "pastelRed", text: "Pastel Red"},
        {value: "pastelYellow", text: "Pastel Yellow"},
        {value: "pink", text: "Pink"},
        {value: "red", text: "Red"},
        {value: "white", text: "White"}];
    let eyes = [
        {value: "default", text: "Default"},
        {value: "closed", text: "Closed"},
        {value: "cry", text: "Cry"},
        {value: "xDizzy", text: "Dizzy"},
        {value: "eyeRoll", text: "Eye Roll"},
        {value: "happy", text: "Happy"},
        {value: "hearts", text: "Hearts"},
        {value: "side", text: "Side"},
        {value: "squint", text: "Squint"},
        {value: "surprised", text: "Surprised"},
        {value: "wink", text: "Wink"},
        {value: "winkWacky", text: "Wink Wacky"}
    ];
    let eyebrow = [
        {value: "default", text: "Default"},
        {value: "angry", text: "Angry"},
        {value: "flat", text: "Flat"},
        {value: "raised", text: "Raised"},
        {value: "raisedExcited", text: "Raised Excited"},
        {value: "sad", text: "Sad"},
        {value: "sadConcerned", text: "Sad Concerned"},
        {value: "unibrow", text: "Unibrow"},
        {value: "up", text: "Up"},
        {value: "upDown", text: "Up Down"},
        {value: "frown", text: "Frown"}
    ];
    let mouth = [
        {value: "default", text: "Default"},
        {value: "concerned", text: "Concerned"},
        {value: "disbelief", text: "Disbelief"},
        {value: "eating", text: "Eating"},
        {value: "grimace", text: "Grimace"},
        {value: "sad", text: "Sad"},
        {value: "scream", text: "Scream"},
        {value: "serious", text: "Serious"},
        {value: "smile", text: "Smile"},
        {value: "tongue", text: "Tongue Out"},
        {value: "twinkle", text: "Twinkle"},
        {value: "vomit", text: "Vomit"}
    ];
    let skin = [
        {value: "pale", text: "Pale"},
        {value: "tanned", text: "Tanned"},
        {value: "yellow", text: "Yellow"},
        {value: "light", text: "Light"},
        {value: "brown", text: "Brown"},
        {value: "darkBrown", text: "Dark Brown"},
        {value: "black", text: "Black"}
    ];

    const changeSelection = (event) => {
        let choice = event.target.value;
        let name = event.target.name;
        setSettings(prevState => ({...prevState,[name]: choice}));

    }

    const buildApiUrl = () =>
    {
        let url;

        url = "https://avatars.dicebear.com/api/avataaars/2.svg?top="+settings.top
            + "&hairColor="+settings.hairColor+ "&clothes=" + settings.clothes
            + "&clothesColor="+ settings.clothesColor + "&eyes=" + settings.eyes
            + "&eyebrow=" + settings.eyebrow + "&mouth=" + settings.mouth
            + "&skin=" + settings.skin;

        return url;
    }

    const saveChanges = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {avatarUrl: buildApiUrl()}).then(await swal(
            "Changes saved!",
            "All your changes has been saved",
            "success"
        ))
    }

    const backToProfil = () => {
        navigate("/account")
    }

    return (
        <div className="avatarEditorContainer"  >
            <div className="avatarEditorImg">
                <img src={buildApiUrl()} height= "500px" alt="Sprite"/>
            </div>
            <div>
                <div>
                    <div className="avatarEditorParam" >
                        <div className="avatarEditorSelectorCol_1">
                            <h2>Hair</h2>
                            <select onChange={changeSelection} name="top" id="top" value={settings.top}>
                                {top.map((option, index) => (
                                    <option key={index} value={option.value} name={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            <h2>Hair Color</h2>
                            <select onChange={changeSelection} name="hairColor" id="hairColor" value={settings.hairColor}>
                                {topColor.map((option, index) => (
                                    <option key={index} value={option.value} name={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            <h2>Eyes</h2>
                            <select onChange={changeSelection} name="eyes" id="eyes" value={settings.eyes}>
                                {eyes.map((option, index) => (
                                    <option key={index} value={option.value} name={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            <h2>Eyebrow</h2>
                            <select onChange={changeSelection} name="eyebrow" id="eyebrow" value={settings.eyebrow}>
                                {eyebrow.map((option, index) => (
                                    <option key={index} value={option.value} name={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="avatarEditorSelectorCol_2" style={{marginLeft: "50px"}}>
                            <h2>Mouth</h2>
                            <select onChange={changeSelection} name="mouth" id="mouth" value={settings.mouth}>
                                {mouth.map((option, index) => (
                                    <option key={index} value={option.value} name={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            <h2>Skin Color</h2>
                            <select onChange={changeSelection} name="skin" id="skin" value={settings.skin}>
                                {skin.map((option, index) => (
                                    <option key={index} value={option.value} name={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            <h2>Clothes</h2>
                            <select onChange={changeSelection} name="clothes" id="clothes" value={settings.clothes}>
                                {clothes.map((option, index) => (
                                    <option key={index} value={option.value} name={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                            <h2>Clothes Color</h2>
                            <select onChange={changeSelection} name="clothesColor" id="clothesColor" value={settings.clothesColor}>
                                {clothesColor.map((option, index) => (
                                    <option key={index} value={option.value} name={option.text}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div style={{display:'inherit', alignItems:'left', WebkitJustifyContent:'left', marginTop: "20px"}}>
                    <button className="btn btn-primary" onClick={backToProfil} style={{marginRight: "80px"}}>Back to Profil</button>
                    <button className="btn btn-primary" onClick={saveChanges}>Save Avatar</button>
                </div>
            </div>
        </div>
    )
}