import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import downarrow from "../static/img/nav/cowdownarrow.svg";
import FarmerTicketsTable from "../components/FarmerTicketsTable.jsx";
import IndividualEditPopup from "../components/EditIndividualFarmerPopup.jsx";
import CowManagementPopup from "../components/CowManagementPopup.jsx";
import AddCowPopup from "../components/AddCowPopup.jsx"; // Import the AddCowPopup component
import "../static/css/ViewFarmerDetails.css";
import { useGlobalContext } from "../Context";


const ViewFarmerDetails = ({ farmer, onBack, onUpdateFarmer }) => {
  const { getcowbyid,cow,addcow } = useGlobalContext();

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCowManagementPopupOpen, setIsCowManagementPopupOpen] = useState(false);
  const [isAddCowPopupOpen, setIsAddCowPopupOpen] = useState(false); // State for AddCowPopup

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleSave = (updatedFarmer) => {
    onUpdateFarmer(updatedFarmer);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === "Manage Cows") {
      getcowbyid(farmer.Former_id)
      setIsCowManagementPopupOpen(true);
    } else if (option === "Add Cow") {
      setIsAddCowPopupOpen(true); // Open AddCowPopup
    }
    setIsDropdownOpen(false);
  };

  const handleCowManagementPopupClose = () => {
    setIsCowManagementPopupOpen(false);
  };

  const handleAddCowPopupClose = (data) => {
    addcow(farmer.Former_id,data.breed,data.age,0);
    setIsAddCowPopupOpen(false); // Close AddCowPopup
  };

  // Ensure cowList is part of farmer or provide default value
  const cowList = farmer.cowList || [];

  return (
    <div className="view-farmer-details">
      <div className="view-farmer-details-buttons">
        <div className="farmer-edit-button">
          <button onClick={handleEditClick}>Edit</button>
        </div>
        <div className="farmer-cow-button">
          <button onClick={handleDropdownClick}>
            Cow Details
            <img src={downarrow} alt="Dropdown" />
          </button>
          {isDropdownOpen && (
            <div className="cow-details-dropdown-menu">
              <button onClick={() => handleDropdownOptionClick("Manage Cows")}>
                Manage Cows
              </button>
              <button onClick={() => handleDropdownOptionClick("Add Cow")}>
                Add Cow
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="view-farmer-details-content">
        <div className="farmer-details">
          <div className="farmer-details-1">
            <div className="farmer-details-id">
              <span>{farmer.Former_id}</span>
            </div>
            <div className="farmer-details-name">
              <span>{farmer.Name}</span>
            </div>
          </div>
          <div className="farmer-details-2">
            <div className="farmer-details-subhead">
              <div className="farmer-details-subhead-detail">
                <span>VLCC</span>
                {farmer.VLCC.Name}
              </div>
              <div className="farmer-details-subhead-detail">
                <span>Tot Cows</span>
                {farmer.TotalCows}
              </div>
            </div>
            <div className="farmer-details-row">
              <img src={phone} alt="" />
              <span>: </span>
              {farmer.phno}
            </div>
          </div>
          <div className="farmer-details-3">
            <div className="farmer-details-row">
              <p>Address</p>
              <span>:</span>
              {farmer.Address.Address_line1}{farmer.Address.Address_line2}{farmer.Address.Address_line3}
            </div>
            <div className="farmer-details-row">
              <p>VSP</p>
              <span>:</span>
              {farmer.VLCC.Name}
            </div>
          </div>
          <div className="farmer-details-4">
            <div className="farmer-details-row">
              <p>BMC</p>
              <span>:</span>
              {farmer.BMC}
            </div>
            <div className="farmer-details-row">
              <p>Cluster</p>
              <span>:</span>
              {farmer.Cluster}
            </div>
          </div>
        </div>
        <div className="farmer-tickets-table">
          <FarmerTicketsTable 
          farmer={farmer}/>
        </div>
      </div>
      <IndividualEditPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onSave={handleSave}
        farmer={farmer}
      />
      <CowManagementPopup
        isOpen={isCowManagementPopupOpen}
        onClose={handleCowManagementPopupClose}
        cowList={cowList}
      />
      <AddCowPopup
        isOpen={isAddCowPopupOpen}
        onClose={handleAddCowPopupClose}
      />
    </div>
  );
};

export default ViewFarmerDetails;
