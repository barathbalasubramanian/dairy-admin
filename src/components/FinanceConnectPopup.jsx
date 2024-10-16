import React from "react";
import Connect from "../static/img/connect.gif";

const FinanceConnectPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-Popup">
      <div className="confirmation-popup-content">
        <div className="confirmation-popup-text">
          <img src={Connect} alt="" />
          <p>Are you sure! Want to <span className="connect">Connect</span> with Farmer?</p>
        </div>
        <div className="confirmation-buttons">
          <button className="cancel-button" onClick={onClose}>
           No
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceConnectPopup;