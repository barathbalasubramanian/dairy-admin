import React, { useState, useEffect } from "react";
import ConfirmationPopup from "../components/EditConfirmationPopup.jsx";
import close_button from "../static/img/close-button.svg";
import "../static/css/FeedEditPopup.css";

const EditPopup = ({ isOpen, onClose, onEditCard, cardData }) => {
  const [formData, setFormData] = useState({ ...cardData });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    if (cardData) {
      setFormData({
        ...cardData,
        Price: cardData.Price.replace(/^Rs.\s*/, ""),
      });
    }
  }, [cardData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirm = () => {
    onEditCard({ ...formData });
    setIsConfirmationOpen(false);
    onClose();
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="feed-edit-confirmation-popup">
      <div className="feed-edit-confirmation-popup-content">
        <button onClick={onClose} className="feed-edit-close-button">
          <img src={close_button} alt="Close" />
        </button>
        <div className="feed-edit-contents">
          <label>
            {formData.tab === "Feed" ? "Feed Type" : "Supplementary Type"}
          </label>
          <span>:</span>
          <input name="Name" value={formData.Name} onChange={handleChange} />
        </div>
        <div className="feed-edit-contents">
          <label>Manufacturer Name</label>
          <span>:</span>
          <input
            name="Manufacturer"
            value={formData.Manufacturer}
            onChange={handleChange}
          />
        </div>
        <div className="feed-edit-contents">
          <label>Price</label>
          <span>:</span>
          <div className="price-input">
            <span className="currency-prefix">Rs.</span>
            <input
              name="Price"
              value={formData.Price}
              onChange={handleChange}
            />
          </div>
        </div>
        <button onClick={handleSave} className="feed-save-button">
          Save
        </button>
      </div>
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default EditPopup;
