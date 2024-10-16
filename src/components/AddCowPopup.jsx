import React, { useState } from "react";
import ConfirmationPopup from "../components/AddCowConfirmationPopup.jsx"; // Ensure you have a confirmation popup component
import close_button from "../static/img/close-button.svg";
import "../static/css/AddCowPopup.css";

const AddCowPopup = ({ isOpen, onClose, onAddCow }) => {
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirmAdd = () => {
    const newCow = {
      breed,
      age,
    };
    onAddCow(newCow);
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
    <div className="add-cow-popup-overlay">
      <div className={`add-cow-popup-content ${isClosing ? "slide-out" : ""}`}>
        <button className="close-button" onClick={handleClose}>
          <img src={close_button} alt="Close" />
        </button>
        <form onSubmit={handleAddClick}>
          <div className="add-cow-popup-contents">
            <label>Breed</label>
            <span>:</span>
            <input
              type="text"
              placeholder="Breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
            />
          </div>
          <div className="add-cow-popup-contents">
            <label>Age</label>
            <span>:</span>
            <input
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="add-cow-popup-button-container">
            <button type="submit">Add Cow +</button>
          </div>
        </form>

        {isConfirmOpen && (
          <ConfirmationPopup
            isOpen={isConfirmOpen}
            onConfirm={handleConfirmAdd}
            onClose={handleCancelConfirmation}
          />
        )}
      </div>
    </div>
  );
};

export default AddCowPopup;
