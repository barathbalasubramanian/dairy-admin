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
        <form  onSubmit={handleAddClick}  className="w-full bg-white p-6 " >
          <div className="mb-4 flex items-center">
            <label className=" w-[50%] block font-medium text-gray-700 text-xl">
              {tab === "Feed" ? "Feed Type" : "Supplementary Type"}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Enter ${tab === "Feed" ? "Feed" : "Supplementary"} type`}
              required
              className="mt-1 block w-[50%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-[50%] block font-medium text-gray-700 text-xl">
              Manufacturer Name
            </label>
            <input
              type="text"
              value={Manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="Enter Name"
              required
              className="mt-1 block w-[50%] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="w-[50%] block font-medium text-gray-700 text-xl">Price</label>
            <div className="relative mt-1 w-[50%]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                Rs.
              </span>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
                required
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="w-full text-center items-center justify-between mt-6">
            <button
              type="submit"
              className="w-fit m-auto text-center px-10 py-2 bg-[#4695b8] text-white text-xl font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add +
            </button>
          </div>
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
