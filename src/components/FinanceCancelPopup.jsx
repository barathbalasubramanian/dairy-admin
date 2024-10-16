import React from "react";
import Cancel from "../static/img/cancel.gif";

const FinanceCancelPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-Popup">
      <div className="confirmation-popup-content">
        <div className="confirmation-popup-text">
          <img src={Cancel} alt="" />
          <p>
            Are you sure! Want to <span className="cancel"> Cancel</span> this
            ticket?
          </p>
        </div>
        <div className="confirmation-buttons">
          <button className="cancel-button" onClick={onClose}>
            No
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceCancelPopup;
