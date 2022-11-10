import {collection, getDocs, query, where} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import {auth, db} from "../initFirebase";
import {Link, useNavigate} from "react-router-dom";
import icon from "../images/iconHistory.png";
import {RoleContext} from "../App";

export default function History() {
    let [myDocs, setMyDocs] = useState([]);
    const navigate = useNavigate();
    const role = useContext(RoleContext);

    useEffect(() => {
        checkLogin();
        getMyDocs().then(response => setMyDocs(response));
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkLogin = () => {
        if (auth.currentUser && role.idRole === 2) {

        } else {
            navigate("/")
        }
    }

    const getMyDocs = async () => {
        const myQuery = query(collection(db, "questionnaires"), where("userID", "==", auth.currentUser.uid));
        let myList = [];
        const querySnapshot = await getDocs(myQuery);
        querySnapshot.forEach((doc) => {
            let id = doc.id;
            let data = doc.data();
            myList.push({id, data});

        });
        return myList;
    }

    return (
        <>
            <h1 className="mainTitleHistory">Your surveys history</h1>
            <div>
                {myDocs.map((doc, index) => <HistLine key={index} infos={doc} id={index}/>)
                }
            </div>
        </>
    );
}


function HistLine({infos, id}) {
    let myDate = new Date(null);
    myDate.setSeconds(infos.data.date.seconds);
    let year = myDate.getFullYear().toString().padStart(4, '0');
    let month = myDate.getMonth().toString().padStart(2, '0');
    let day = myDate.getDate().toString().padStart(2, '0');
    let hour = myDate.getHours().toString().padStart(2, '0');
    let minutes = myDate.getMinutes().toString().padStart(2, '0');
    return (
        <>
            <div className="historyList" id={id}>
                <img className="iconsHistory" src={icon} alt="icon"/>
                <Link className="linksHistory" to={`/history/${infos.id}`} style={{textDecoration: 'none'}}>
                    {"Survey of " + day + "." + month + "." + year + " - " + hour + ":" + minutes}
                </Link>
            </div>
        </>
        
    
    );
}