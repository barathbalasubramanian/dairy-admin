import React, { useState } from "react";
import "../static/css/FeedAddPopup.css";
import ConfirmationPopup from "../components/ConfirmationPopup.jsx";
import close_button from "../static/img/close-button.svg";

const AddPopup = ({ isOpen, onClose, onAddCard, tab }) => {
  const [title, setTitle] = useState("");
  const [Manufacturer, setManufacturer] = useState("");
  const [price, setPrice] = useState("");
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    onAddCard({ title, Manufacturer, price });
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

  if (!isOpen && !isClosing) return null;

  return (
    <div className="modal-overlay flex justify-center">
      <div className={`modal-content ${isClosing ? "slide-out" : ""}`}>
        <button className="close-button" onClick={handleClose}>
          <img src={close_button} alt="Close" />
        </button>
        <form onSubmit={handleAddClick}>
          <div className="contents">
            <label>{tab === "Feed" ? "Feed Type" : "Supplementary Type"}</label>
        
            <input className=""
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Enter ${tab === "Feed" ? "Feed" : "Supplementary"} type`}
              required
            />
          </div>
          <div className="contents mt-4">
            <label>Manufacturer Name</label>
            <input className="mt-4"
              type="text"
              value={Manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="contents mt-2">
            <label>Price</label>
            <div className="price-input ">
              <span className="currency-prefix">Rs.</span>
              <input className=""
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
                required
              />
            </div>
          </div>
          <button type="submit" className="add_button">
            Add +
          </button>
        </form>
        <ConfirmationPopup
          isOpen={isConfirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
};

export default AddPopup;
