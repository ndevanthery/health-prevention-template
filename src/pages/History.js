import {collection, doc, Firestore, getDoc, getDocs, limit, query, where} from "firebase/firestore";
import {useEffect, useState} from "react";
import {auth, db} from "../initFirebase";
import {Link, resolvePath} from "react-router-dom";
import icon from "../images/iconHistory.png";

export default function History() {


    const idUser = auth.currentUser.uid;
    /*  let [user, setUser] = useState([]);
 */

    let [myDocs, setMyDocs] = useState([]);
    const myQuery = query(collection(db, "questionnaires"), where("userID", "==", idUser));

    //then is handling the async function
    getMyDocs(myQuery).then(response => setMyDocs(response));

    // return (<div>salut</div>);

    if (myQuery.isLoading) {
        return (<div>loading ...</div>);
    } else {
        return (
            <>
                <h1 className="mainTitleHistory">Your surveys history</h1>
                <div>
                    {myDocs.map((doc, index) => <HistLine infos={doc}/>)
                    }
                </div>
            </>
        );
    }
    ;

}


function HistLine({infos}) {
    let myDate = new Date(null);
    myDate.setSeconds(infos.data.date.seconds);
    let year = myDate.getFullYear().toString().padStart(4, '0');
    let month = myDate.getMonth().toString().padStart(2, '0');
    let day = myDate.getDate().toString().padStart(2, '0');
    let hour = myDate.getHours().toString().padStart(2, '0');
    let minutes = myDate.getMinutes().toString().padStart(2, '0');
    return (
        <>
            <div className="historyList">
                <img className="iconsHistory" src={icon}/>
                <Link className="linksHistory" to={`/history/${infos.id}`} style={{textDecoration: 'none'}}>
                    {"Survey of " + day + "." + month + "." + year + " - " + hour + ":" + minutes}
                </Link>
            </div>
        </>
        
    
    );
}

async function getMyDocs(myQuery) {
    let myList = [];
    const querySnapshot = await getDocs(myQuery);
    querySnapshot.forEach((doc) => {
        let id = doc.id;
        let data = doc.data();
        myList.push({id, data});

    });
    return myList;
}