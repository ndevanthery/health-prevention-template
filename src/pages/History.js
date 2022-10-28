import { collection, doc, Firestore, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../initFirebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { Link, resolvePath } from "react-router-dom";

export default  function History() {


    const idUser = auth.currentUser.uid;
   /*  let [user, setUser] = useState([]);
*/
    
    let [myDocs, setMyDocs] = useState([]);
    const myQuery = query(collection(db, "questionnaires"), where("userID", "==", idUser));

    //then is handling the async function
    getMyDocs(myQuery).then(response => setMyDocs(response));

   // return (<div>salut</div>);

     if(myQuery.isLoading)
    {
        return (<div>loading ...</div>);
    }
    else
    {
       return( 
       <div >
            {myDocs.map((doc, index) => <HistLine infos={doc}/> )
            }
        </div>

       );
    }; 
    


}


function HistLine({infos}){
    let myDate = new Date(null);
    myDate.setSeconds(infos.data.date.seconds);
    let year = myDate.getFullYear().toString().padStart(4, '0');
    let month = myDate.getMonth().toString().padStart(2, '0');
    let day = myDate.getDate().toString().padStart(2, '0');
    let hour = myDate.getHours().toString().padStart(2, '0');
    let minutes = myDate.getMinutes().toString().padStart(2, '0');
    return (
        <>
        <Link className="links" to={`/history/${infos.id}`} style={{textDecoration: 'none'}}>
                        {day + " " + month + " " + year +" at " + hour + " : " + minutes }

        </Link>
        <br/>

        </>
        
    
    );
}

async function getMyDocs(myQuery) {
    let myList = [];
    const querySnapshot = await getDocs(myQuery);
    querySnapshot.forEach((doc) => {
        let id = doc.id;
        let data =  doc.data();
      myList.push({id,data});

    });
    return myList;
}