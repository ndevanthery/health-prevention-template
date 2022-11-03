import React from 'react';
import Avatar from "./Avatar";
import {useParams} from "react-router-dom";

const ModalEditAvatar = ({open, onClose, user}) => {
    if(!open) return null;


    return (
        <div className='overlayAvatarEdit' onClick={onClose}>
            <div className='modalAvatarContainer' onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className='modalEditorContainer'>
                    <Avatar/>
                    {/*{avatar}*/}
                </div>
                <div className='modalRight'>
                    <p className="btnCloseEditAvatar" onClick={onClose}>X</p>
                    <div className="btnContainer">
                        <button className='btnSubmitAvatar' onClick={() => UpdateAvatarUrl({user})}>
                            <span className='text'>Save</span>
                            <span>Validate your Avatar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


function UpdateAvatarUrl({user}) {


    console.log("Avatar url from CatchAvatarURL: " + user.avatarURL);
    console.log("Avatar url from Editor: ");
    //getNewUrl

}

export default ModalEditAvatar
