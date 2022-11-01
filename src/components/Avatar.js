import React, {useEffect, useState} from "react";


export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: "longHair",
            topColor: "auburn",
            facialHair: "none",
            clothes: "blazer",
            clothesColor: "black",
            eyes: "default",
            eyebrow: "default",
            mouth: "default",
            skin: "pale",
            sick: props.sick,
            avatarUrl: ""
        }
    }

    //Testing for the results
    sick = [
        {value: "no", text: "No"},
        {value: "yes", text: "Yes"}
    ];

    top = [
        {value: "longHair", text: "Long Hair"},
        {value: "shortHair", text: "Short Hair"},
        {value: "hijab", text: "Hijab"},
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
    topColor = [
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
    facialHair = [
        {value: "none", text: "No"},
        {value: "medium", text: "Medium"},
        {value: "light", text: "Light"},
        {value: "majestic", text: "Majestic"},
        {value: "fancy", text: "Fancy"},
        {value: "magnum", text: "Magnum"}];
    clothes = [
        {value: "blazer", text: "Blazer"},
        {value: "blazerAndSweater", text: "Blazer and Sweater"},
        {value: "sweater", text: "Sweater"},
        {value: "shirt", text: "Shirt"},
        {value: "shirtCrewNeck", text: "Shirt with Crewneck"},
        {value: "shirtScoopNeck", text: "Shirt with Scoopneck"},
        {value: "shirtVNeck", text: "Shirt with V-Neck"},
        {value: "hoodie", text: "Hoodie"},
        {value: "overall", text: "Overall"}];
    clothesColor = [
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
    eyes = [
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
    eyebrow = [
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
    mouth = [
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
    skin = [
        {value: "pale", text: "Pale"},
        {value: "tanned", text: "Tanned"},
        {value: "yellow", text: "Yellow"},
        {value: "light", text: "Light"},
        {value: "brown", text: "Brown"},
        {value: "darkBrown", text: "Dark Brown"},
        {value: "black", text: "Black"}
    ];

    changeSelection = event => {
        let choice = event.target.value;
        let name = event.target.name;
        this.setState({[name]: choice});
        // console.log("Avatar url ??? " +this.buildApiUrl());
        // this.setState({url: this.buildApiUrl()});
        // //============ test ===============
        // let avatarURL = this.buildApiUrl();
        // this.setState({
        //     avatarUrl: avatarURL
        // });
        // console.log("url for avatar : " +this.buildApiUrl() +" // avatarUrl: " +this.state.avatarUrl);
        // //================================
        return;
    }

    updateURL = (newURL) => {this.setState({avatarUrl: newURL})};

    handleUpdateURL = async (event) => {
            event.preventDefault();

            let newURL = this.buildApiUrl();

            await this.updateURL(newURL);

            console.log("Encore un test d'url... " +this.state.avatarUrl);
    }

    // updateURL = (newURL) => {
    //     // let newURL = this.buildApiUrl();
    //     // let oldURL = this.state.avatarUrl;
    //     this.setState({avatarURL: newURL});
    //     console.log("My new avatar URL: " +this.state.avatarUrl);
    // }

    buildApiUrl()
    {

        let url;
        //Testing for resultpage
        if(this.state.sick === "yes") {
            url = "https://avatars.dicebear.com/api/avataaars/2.svg?top="+this.state.top
                + "&hairColor="+this.state.topColor+ "&clothes=" + this.state.clothes
                + "&clothesColor="+ this.state.clothesColor + "&eyes=cry"
                + "&eyebrow=sad" + "&mouth=sad" + "&skin=" + this.state.skin
                + "&background=red";

            return url;
        }

        url = "https://avatars.dicebear.com/api/avataaars/2.svg?top="+this.state.top
            + "&hairColor="+this.state.topColor+ "&clothes=" + this.state.clothes
            + "&clothesColor="+ this.state.clothesColor + "&eyes=" + this.state.eyes
            + "&eyebrow=" + this.state.eyebrow + "&mouth=" + this.state.mouth
            + "&skin=" + this.state.skin;

        if(this.state.facialHair !== "none")
        {
            url += "&facialHair=" +this.state.facialHair+"&facialHairChance=100&facialHairColor="+this.state.topColor
        }

        if(this.state.top === "hijab") {
            url += "&hatColor=gray"
        }

        return url;
    }

    render() {
        return ( //WebkitJustifyContent:'center'  avatarEditDisplayer
            // <form onSubmit={this.handleUpdateURL}>
            <div className="avatarEditor">

                <div>
                    <img src={this.buildApiUrl()} height= "200px" alt="Sprite" />
                </div>
                    <button className="" onClick={this.handleUpdateURL}>Save Avatar</button>

                    <div className="avatarEditorOptions">
                    <div>
                        <div className='avatarEditorLabel'>Hair</div>
                        <select onChange={this.changeSelection} name="top" id="top">
                            {this.top.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        <div className='avatarEditorLabel'>Hair Color</div>
                        <select onChange={this.changeSelection} name="topColor" id="topColor">
                            {this.topColor.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        <div className='avatarEditorLabel'>Eyes</div>
                        <select onChange={this.changeSelection} name="eyes" id="eyes">
                            {this.eyes.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        <div className='avatarEditorLabel'>Eyebrow</div>
                        <select onChange={this.changeSelection} name="eyebrow" id="eyebrow">
                            {this.eyebrow.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        <div className='avatarEditorLabel'>Mouth</div>
                        <select onChange={this.changeSelection} name="mouth" id="mouth">
                            {this.mouth.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div className='avatarEditorLabel'>Skin Color</div>
                        <select onChange={this.changeSelection} name="skin" id="skin">
                            {this.skin.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        <div className='avatarEditorLabel'>Clothes</div>
                        <select onChange={this.changeSelection} name="clothes" id="clothes">
                            {this.clothes.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        <div className='avatarEditorLabel'>Clothes Color</div>
                        <select onChange={this.changeSelection} name="clothesColor" id="clothesColor">
                            {this.clothesColor.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        <div className='avatarEditorLabel'>Sick</div>
                        <div>(how it would look on the result page)</div>
                        <select onChange={this.changeSelection} name="sick" id="sick">
                            {this.sick.map((option, index) => (
                                <option key={index} value={option.value} name={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <input
                    type="checkbox"
                    onChange={this.toggleSick}
                />

            </div>
            // </form>
        )
    }
}//End of class Avatar


