import React, { useState, useEffect } from "react";
import close_button from "../static/img/close-button.svg";

const IndividualEditPopup = ({ isOpen, onClose, onSave, farmer }) => {
  const [formData, setFormData] = useState({ ...farmer });

  useEffect(() => {
    if (farmer) {
      setFormData(farmer);
    }
  }, [farmer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="individual-popup-overlay">
      <div className="individual-popup-content">
        <button className="close-button" onClick={onClose}>
          <img src={close_button} alt="Close" />
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="individual-popup-contents">
            <label>Name</label>
            <span>:</span>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Phone</label>
            <span>:</span>
            <input
              type="text"
              name="phno"
              value={formData.phno}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>VLCC</label>
            <span>:</span>
            <input
              type="text"
              name="Name"
              value={formData.VLCC.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Address</label>
            <span>:</span>
            <input
              type="text"
              name="Address_line"
              value={formData.Address.Address_line } 
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="individual-popup-add_button">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndividualEditPopup;
