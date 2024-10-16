import React from "react";
import confirmation from "../static/img/confirmation.gif";
import "../static/css/ConfirmationPopup.css";

const ConfirmationPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-Popup">
      <div className="confirmation-popup-content">
        <div className="confirmation-popup-text">
          <img src={confirmation} alt="" />
          <p>Are you sure! Want to Edit this Product?</p>
        </div>
        <div className="confirmation-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
