import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import downarrow from "../static/img/nav/cowdownarrow.svg";
import FarmerTicketsTable from "../components/FarmerTicketsTable.jsx";
import IndividualEditPopup from "../components/EditIndividualFarmerPopup.jsx";
import CowManagementPopup from "../components/CowManagementPopup.jsx";
import AddCowPopup from "../components/AddCowPopup.jsx";
import "../static/css/ViewFarmerDetails.css";
import { useGlobalContext } from "../Context";
import { Phone } from "lucide-react";

const ViewFarmerDetails = ({ farmer, onBack, onUpdateFarmer }) => {
  const { getcowbyid, cow, addcow } = useGlobalContext();

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCowManagementPopupOpen, setIsCowManagementPopupOpen] =
    useState(false);
  const [isAddCowPopupOpen, setIsAddCowPopupOpen] = useState(false);

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
      getcowbyid(farmer.Former_id);
      setIsCowManagementPopupOpen(true);
    } else if (option === "Add Cow") {
      setIsAddCowPopupOpen(true);
    }
    setIsDropdownOpen(false);
  };

  const handleCowManagementPopupClose = () => {
    setIsCowManagementPopupOpen(false);
  };

  const handleAddCowPopupClose = (data) => {
    addcow(farmer.Former_id, data.breed, data.age, 0);
    setIsAddCowPopupOpen(false);
  };

  const cowList = farmer.cowList || [];

  return (
    <div className="view-farmer-details">
      <div className="view-farmer-details-buttons mt-4">
        <div className="farmer-edit-button">
          <button onClick={handleEditClick}>Edit</button>
        </div>
        <div className="farmer-cow-button">
          <button onClick={handleDropdownClick} className="flex gap-4 items-center justify-center">
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
        <div className="bg-white p-6 rounded-md shadow-md flex justify-between items-start">

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <div className="text-sm font-semibold text-gray-700">Farmer ID</div>
                <span className="text-lg text-gray-900">{farmer.Former_id}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700">Farmer Name</div>
                <span className="text-lg text-gray-900">{farmer.Name}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">VLCC</p>
                <span className="text-gray-900">{farmer.VLCC.Name}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-700">BMC</p>
                <span className="text-gray-900">{farmer.BMC}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Cluster</p>
                <span className="text-gray-900">{farmer.Cluster}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Cows</p>
                <span className="text-gray-900">{farmer.TotalCows}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <Phone size={16} />
              <span className="text-gray-700">{farmer.phno}</span>
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Address:</p>
              <p>{farmer.Address.Address_line1}</p>
              <p>{farmer.Address.Address_line2}</p>
              <p>{farmer.Address.Address_line3}</p>
            </div>
          </div>
        </div>


        <div className="farmer-tickets-table">
          <FarmerTicketsTable farmer={farmer} />
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
