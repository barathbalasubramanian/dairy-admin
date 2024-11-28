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
          {/* <span>:</span> */}
          <input name="Name" value={formData.Name} onChange={handleChange} />
        </div>
        <div className="feed-edit-contents">
          <label>Manufacturer Name</label>
          {/* <span>:</span> */}
          <input
            name="Manufacturer"
            value={formData.Manufacturer}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex items-center">
            <label className="w-[41%] block font-semibold text-black text-xl">Price</label>
            <div className="relative mt-1 w-[59%]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                Rs.
              </span>
              <input
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                className="pl-10 block w-full outline-none px-3 py-3 border border-gray-300 rounded-md shadow-sm"
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
