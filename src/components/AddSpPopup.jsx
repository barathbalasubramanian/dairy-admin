import React, { useState } from "react";
import ConfirmationPopup from "../components/AddspConfirmationPopup.jsx";
import close_button from "../static/img/close-button.svg";
import "../static/css/IndividualDetailsPopup.css";

const IndividualDetailsPopup = ({ isOpen, onClose, onAddFarmer }) => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cluster, setcluster] = useState("");
  const [address, setAddress] = useState("");

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirmAdd = () => {
    const newFarmer = {
      id: userId,
      name,
      cluster,
      specialist:"",
      email,
      phone,
      address,
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
      <div
        className={`individual-popup-content ${isClosing ? "slide-out" : ""}`}
      >
        <button className="close-button" onClick={handleClose}>
          <img src={close_button} alt="Close" />
        </button>
        <form onSubmit={handleAddClick}>
          <div className="individual-popup-contents">
            <label>Name</label>
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
          <div className="individual-popup-contents">
            <label>
              Phone 2{"("}optional{")"}
            </label>
            <span>:</span>
            <input
              type="text"
              placeholder="Phone"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="individual-popup-contents">
            <label>cluster</label>
            <span>:</span>
            <input
              type="text"
              placeholder="cluster"
              value={cluster}
              onChange={(e) => setcluster(e.target.value)}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Address</label>
            <span>:</span>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
