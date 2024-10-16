import React, { useState } from "react";
import phone from "../static/img/phone.svg";
import arrow from "../static/img/farmer-arrow.svg";
import downarrow from "../static/img/nav/downarrow.svg";
import ViewFarmerDetails from "../components/ViewFarmerDetails.jsx";
import IndividualDetailsPopup from "../components/AddIndividualFarmerPopup.jsx";
import "../static/css/FarmerPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";

const FarmerPage = () => {
  const { Farmer, addfarmer } = useGlobalContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isIndividualDetailsPopupOpen, setIsIndividualDetailsPopupOpen] =
    useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const handleAddButtonClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === "individual") {
      setIsIndividualDetailsPopupOpen(true);
    } else if (option === "Bulk") {
      console.log("Bulk Import selected");
    }
    setIsDropdownOpen(false);
  };

  const handleAddNewFarmer = (newFarmer) => {
    addfarmer(
      newFarmer.name,
      newFarmer.phone,
      newFarmer.id,
      newFarmer.address,
      "",
      "",
      newFarmer.vlcc
    );
    setIsIndividualDetailsPopupOpen(false);
  };

  const handleViewMoreClick = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const handleBackToList = () => {
    setSelectedFarmer(null);
  };

  const handleUpdateFarmer = (updatedFarmer) => {
    setSelectedFarmer(updatedFarmer);
  };

  const renderCard = (data) => (
    <div key={data.Former_id} className="farmer-card">
      <div className="farmer-card-header">
        <div className="farmer-card-id">{data.Former_id}</div>
        <div className="farmer-card-name">{data.Name}</div>
      </div>
      <div className="farmer-card-subhead">
        <div className="farmer-card-subhead-detail">
          <span>VLCC</span>
          {data.VLCC?.Name || "N/A"}
        </div>
        <div className="farmer-card-subhead-detail">
          <span>Tot Cows</span>
          {data.TotalCows || "N/A"}
        </div>
      </div>
      <div className="farmer-card-body">
        <div className="farmer-card-detail">
          <img src={phone} alt="Phone" />
          <span>: </span>
          {data.phno || "N/A"}
        </div>
        <div className="farmer-card-add-detail">
          <p>Address</p>
          <span>:</span>
          {data.Address?.Address_line1 || "N/A"}
        </div>
      </div>
      <div className="farmer-card-footer">
        <button
          className="connect-button"
          onClick={() => handleViewMoreClick(data)}
        >
          View More
          <img src={arrow} alt="View More" />
        </button>
      </div>
    </div>
  );

  useAuth(() => setIsAuthChecked(true));

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div className="farmer-availability-page">
      {selectedFarmer ? (
        <ViewFarmerDetails
          farmer={selectedFarmer}
          onBack={handleBackToList}
          onUpdateFarmer={handleUpdateFarmer}
        />
      ) : (
        <>
          <div className="farmer-add-button">
            <button onClick={handleAddButtonClick}>
              <span>+</span>Add
              <img src={downarrow} alt="Dropdown" />
            </button>
            {isDropdownOpen && (
              <div className="farmer-add-dropdown-menu">
                <button onClick={() => handleDropdownOptionClick("individual")}>
                  Enter Individual Detail
                </button>
                <button onClick={() => handleDropdownOptionClick("Bulk")}>
                  Bulk Import
                </button>
              </div>
            )}
          </div>
          <div className="farmer-card-container">
            {Farmer && Farmer.map(renderCard)}
          </div>
        </>
      )}
      <IndividualDetailsPopup
        isOpen={isIndividualDetailsPopupOpen}
        onClose={() => setIsIndividualDetailsPopupOpen(false)}
        onAddFarmer={handleAddNewFarmer}
      />
    </div>
  );
};

export default FarmerPage;
