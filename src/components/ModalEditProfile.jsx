import React from "react";
import Avatar from "./Avatar";
import { auth } from "../initFirebase";

const ModalEditProfile = ({ open, onClose, user }) => {
  if (!open) return null;

  const idUser = auth.currentUser.uid;
  return (
    <div className="overlayAvatarEdit" onClick={() => onClose()}>
      <div
        className="modalAvatarContainer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modalEditorContainer">
          <Avatar idUser={idUser} onClose ={(avatarURL) => onClose(avatarURL)} />
        </div>
        <div className="modalRight">
          <p className="btnCloseEditAvatar" onClick={event => onClose()}>
            X
          </p>
        </div>
      </div>
    </div>
  );
};

function UpdateAvatarUrl({ user }) {
  console.log("Avatar url from CatchAvatarURL: " + user.avatarURL);
  console.log("Avatar url from Editor: ");
  //getNewUrl
}

export default ModalEditProfile;
