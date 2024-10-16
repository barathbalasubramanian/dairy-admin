import React, { useState, useEffect } from "react";
import close_button from "../static/img/close-button.svg";
import "../static/css/IndividualDetailsPopup.css";

const IndividualEditPopup = ({ isOpen, onClose, onSave, farmer }) => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    phone: "",
    bmc: "",
  });

  useEffect(() => {
    if (farmer) {
      setFormData(farmer);
    }
  }, [farmer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
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
        <form onSubmit={handleSave}>
          <div className="individual-popup-contents">
            <label>BMC</label>
            <span>:</span>
            <input
              type="text"
              name="bmcName"
              value={formData.bmcName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>RDO Name</label>
            <span>:</span>
            <input
              type="text"
              name="bmcPersonName"
              value={formData.bmcPersonName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Email ID</label>
            <span>:</span>
            <input
              type="email"
              name="bmcEmail"
              value={formData.bmcEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="individual-popup-contents">
            <label>Phone</label>
            <span>:</span>
            <input
              type="text"
              name="bmcPhone"
              value={formData.bmcPhone}
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
