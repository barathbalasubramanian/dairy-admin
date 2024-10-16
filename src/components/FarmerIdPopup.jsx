import React from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import close_button from "../static/img/close-button.svg";
import "../static/css/SpIdPopup.css";

const SpIdPopup = ({ FarmerId, onClose }) => {
  const spDetails = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9835194630",
    vlcc: "VLCC123",
  };

  return (
    <div className="sp-id-popup">
      <div className="sp-id-popup-content">
        <button className="sp-id-popup-close-button" onClick={onClose}>
          <img src={close_button} alt="" />
        </button>
        <div className="sp-id-popup-body">
          <div className="sp-id-popup-header">
            <div className="sp-id-popup-row">{FarmerId}</div>
            <div className="sp-id-popup-row">{spDetails.name}</div>
          </div>
          <div className="sp-id-popup-subheader">
            <div className="sp-id-popup-row">
              <img src={mail} alt="" />
              <span>: </span> {spDetails.email}
            </div>
            <div className="sp-id-popup-row">
              <img src={phone} alt="" />
              <span>: </span> {spDetails.phone}
            </div>
            <div className="sp-id-popup-row">
              <p>VLCC</p>
              <span>:</span> {spDetails.vlcc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpIdPopup;
