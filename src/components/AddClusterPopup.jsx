import React, { useState } from "react";
import ConfirmationPopup from "../components/AddClusterConfirmationPopup.jsx";
import close_button from "../static/img/close-button.svg";
import "../static/css/IndividualDetailsPopup.css";

const IndividualDetailsPopup = ({ isOpen, onClose, onAddFarmer }) => {
  const [userId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cluster, setcluster] = useState("");

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirmAdd = () => {
    const newFarmer = {
      id: userId,
      cluster,
      name,
      farmers: "0",
      vlcc: "0",
      bmc: "0",
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
            <label>Cluster</label>
            <span>:</span>
            <input
              type="text"
              placeholder="Cluster"
              value={cluster}
              onChange={(e) => setcluster(e.target.value)}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>CP Name</label>
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
            <label>Phone</label>
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
