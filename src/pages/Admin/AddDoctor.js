import {useNavigate} from "react-router-dom";
import {auth, db} from "../../initFirebase";
import '../../Stylesheets/Admin.css';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import doctor from '../../images/updateDoctor.png'
import up from '../../images/CheckButton.png'
import {RoleContext} from "../../App";


export default function AddDoctor() {
    const navigate = useNavigate();
    const role = useContext(RoleContext);


    const [userInfo, setUserInfo] = useState({firstName: "",
        lastName: "",
        email: ""})
    const [imgSrc, SetImgSrc] = useState({src: doctor, name: "doctor"})


    useEffect(() => {
        checkLogin();
    },[])

    const handleChange= (e) => {
        const field = e.target.name;
        const value = e.target.value;
        e.target.setAttribute("value",e.target.value)
    }

    const checkLogin = () => {
        if(auth.currentUser && role.idRole === 5) {

        }else {
            navigate("/")
        }
    }

    const fetchUser = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        try {
            let q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setUserInfo({ ...doc.data(), id: doc.id});
            });
            SetImgSrc({src: doctor, name: "doctor"});
            if(querySnapshot.empty) {
                console.log("Empty")
                setUserInfo({firstName: "",
                lastName: "",
                email: ""})
            }

        }catch (error) {
            console.error(error);
        }
    }

    const updateRole = async (e) => {
        e.preventDefault();
        if (imgSrc.name === "up") {
            return;
        }
        try {
            await updateDoc(doc(db, "users", userInfo.id), {
                idRole: 4
            });
        }catch (e) {
            console.error(e);
        }

        SetImgSrc({src: up, name: "up"});
    }

    return (
        <div className="mainDiv">
            <h1>Create a new Doctor</h1>
            <form onSubmit={fetchUser}>
                <div className="userSearch">
                    <input className="effect" type="text" placeholder="Enter E-Mail Address" onChange={handleChange}/>
                        <span className="focus-border"></span>
                </div>

            <table className="user">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{userInfo.firstName}</td>
                        <td>{userInfo.lastName}</td>
                        <td>{userInfo.email}</td>
                        {userInfo.email !== "" ? <td><button><img src={imgSrc.src} height="30" onClick={updateRole} /></button></td> : <td></td>}
                    </tr>
                </tbody>
            </table>
                <input className="buttonHome" style={{height: "50px"}} type="submit" value="Search User"/>
            </form>
        </div>
    )
}

