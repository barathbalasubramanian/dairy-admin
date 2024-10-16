import React, { useState } from "react";
import ConfirmationPopup from "../components/AddVLCCConfirmationPopup.jsx";
import close_button from "../static/img/close-button.svg";
import "../static/css/IndividualDetailsPopup.css";

const IndividualDetailsPopup = ({ isOpen, onClose, onAddFarmer }) => {
  const [name, setName] = useState("");
  const [userId, ] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vlcc, setcluster] = useState("");

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirmAdd = () => {
    const newFarmer = {
      id: userId,
      vlcc,
      name,
      farmers: "0",
      email,
      phone,
    };
    onAddFarmer(newFarmer);
    setConfirmOpen(false);
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  const handleCancelConfirmation = () => {
    setConfirmOpen(false);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className="individual-popup-overlay">
      <div className={`individual-popup-content`}>
        <button className="close-button" onClick={handleClose}>
          <img src={close_button} alt="Close" />
        </button>
        <form onSubmit={handleAddClick}>
          <div className="individual-popup-contents">
            <label>VLCC</label>
            <span>:</span>
            <input
              type="text"
              placeholder="VLCC"
              value={vlcc}
              onChange={(e) => setcluster(e.target.value)}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>VSP Name</label>
            <span>:</span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Email ID</label>
            <span>:</span>
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Phone 1</label>
            <span>:</span>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="individual-popup-add_button">
            Add +
          </button>
        </form>
      </div>

      {isConfirmOpen && (
        <ConfirmationPopup
          isOpen={isConfirmOpen}
          onConfirm={handleConfirmAdd}
          onClose={handleCancelConfirmation}
        />
      )}
    </div>
  );
};

export default IndividualDetailsPopup;
