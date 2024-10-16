import React, { useState } from "react";
import "../static/css/CreateUserPopup.css";

const CreateUserPopup = ({ isOpen, onClose, onCreate }) => {
  const [sendEmail, setSendEmail] = useState(false);

  const handleCheckboxChange = () => {
    setSendEmail(!sendEmail);
  };

  if (!isOpen) return null;

  return (
    <div className="user-confirmation-popup">
      <div className="user-confirmation-popup-content">
        <div className="user-confirmation-popup-text">
          <h2>Are you Sure to Create a New User</h2>
          <label>
            <input
              type="checkbox"
              checked={sendEmail}
              onChange={handleCheckboxChange}
            />
            Send the generated password to the user Email
          </label>
        </div>
        <div className="user-confirmation-buttons">
          <button
            onClick={onClose}
            className={`user-cancel-button ${sendEmail ? "checked" : "unchecked"}`}
          >
            Cancel
          </button>
          <button
            onClick={() => onCreate(sendEmail)}
            className={`user-create-button ${sendEmail ? "enabled" : "disabled"}`}
            disabled={!sendEmail}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPopup;
