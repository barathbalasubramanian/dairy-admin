import React, { useState, useEffect } from "react";
import close_button from "../static/img/close-button.svg";

const IndividualEditPopup = ({ isOpen, onClose, onSave, farmer }) => {
  const [formData, setFormData] = useState({ ...farmer });
  console.log(farmer);

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
              name="name"
              value={formData.doctorName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Email ID</label>
            <span>:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Phone</label>
            <span>:</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>cluster</label>
            <span>:</span>
            <input
              type="text"
              name="cluster"
              value={formData.clusterName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Address</label>
            <span>:</span>
            <input
              type="text"
              name="address"
              value={formData.address}
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
