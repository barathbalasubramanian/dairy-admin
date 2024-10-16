import React from "react";
import down_arrow from "../static/img/down-arrow.svg";
import close_button from "../static/img/close-button.svg";

const UserDetailPopup = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-pad">
          <button className="close-button" onClick={onClose}>
            <img src={close_button} />
          </button>
          <div className="popup-info">
            <label>Name</label>
            <span>:</span>
            <input value={user.name} readOnly />
          </div>
          <div className="popup-info">
            <label>User ID</label>
            <span>:</span>
            <input value={user.userId} readOnly />
          </div>
          <div className="popup-info">
            <label>Type </label>
            <span>:</span>
            <lable className="popup-type">
              {user.type} <img src={down_arrow} alt="" />{" "}
            </lable>
          </div>
          <div className="popup-info">
            <label>Email ID </label>
            <span>:</span>
            <input value={user.email} readOnly />
          </div>
          <div className="popup-info">
            <label>Phone </label>
            <span>:</span>
            <input value={user.phone} readOnly />
          </div>
        </div>
        <div className="popup-buttons">
          <button className="user-forget-password-button">
            Forget Password
          </button>
          <button className="user-save-button" disabled>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPopup;
