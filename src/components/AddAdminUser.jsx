import React, { useState } from "react";
import down_arrow from "../static/img/down-arrow.svg";
import close_button from "../static/img/close-button.svg";

const AddAdminUser = ({ onClose, onsave }) => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [mail, setMail] = useState();
  const [phno, setPhno] = useState();
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-pad">
          <button className="close-button" onClick={onClose}>
            <img src={close_button} />
          </button>
          <div className="popup-info1">
            <label>Name</label>
            <span>:</span>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="popup-info1">
            <label>Type </label>
            <span>:</span>
            <input
              type="text"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
          <div className="popup-info1">
            <label>Email ID </label>
            <span>:</span>
            <input
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
          </div>
          <div className="popup-info1">
            <label>Phone </label>
            <span>:</span>
            <input
              value={phno}
              onChange={(e) => {
                setPhno(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="popup-buttons">
        <button className="user-forget-password-button"  onClick={onClose}>
            close
          </button>
          <button
            className="user-save-button"
            onClick={() => {
              onsave(name, type, mail, phno);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdminUser;
