import { auth } from "../initFirebase";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";


/* this class defined :
    - const uid
    And methods :
    - create question
    - modify question
    - create user
    - modify user (done by 


 */

//const auth is defined in initFirebase class

//Observer that reacts to a logout or a change of user logging in
export const uid = onAuthStateChanged(auth, (user) => {
    if (user) {
        this.uid = user.uid;
    } else {
        this.uid = null;
        //and go to login page ?
    }
});


export







