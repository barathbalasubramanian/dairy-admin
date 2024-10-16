import React from "react";
import Complete from "../static/img/completed.gif";

const FinanceCompletePopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-Popup">
      <div className="confirmation-popup-content">
        <div className="confirmation-popup-text complete">
          <img src={Complete} alt="" />
          <p>
            Are you sure! Want to <span className="complete">Complete </span>
            this ticket?
          </p>
          <p className="sub-p">Contacted HDFC Person</p>
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

export default FinanceCompletePopup;
