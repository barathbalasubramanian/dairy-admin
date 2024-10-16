import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import arrow from "../static/img/farmer-arrow.svg";
import downarrow from "../static/img/nav/downarrow.svg";
import ViewFarmerDetails from "../components/ViewFarmerDetails.jsx";
import IndividualDetailsPopup from "../components/AddIndividualFarmerPopup.jsx";
import "../static/css/FarmerPage.css";
import { useGlobalContext } from "../Context";

const FarmerPage = () => {
  const { Farmer,addfarmer } = useGlobalContext();
  const [farmers, setFarmers] = useState([
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      cows: "5",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      cows: "5",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      cows: "6",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      cows: "6",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      cows: "6",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      cows: "6",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isIndividualDetailsPopupOpen, setIsIndividualDetailsPopupOpen] =
    useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const handleAddButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === "individual") {
      setIsIndividualDetailsPopupOpen(true);
    } else if (option === "Bulk") {
      console.log("Bulk Import selected");
    }
    setIsDropdownOpen(false);
  };

  const handleIndividualDetailsClose = () => {
    setIsIndividualDetailsPopupOpen(false);
  };

  const handleAddNewFarmer = (newFarmer) => {
    addfarmer(newFarmer.name,newFarmer.phone,newFarmer.id,newFarmer.address,"","",newFarmer.vlcc);
    setFarmers((prevFarmers) => [...prevFarmers, newFarmer]);
    setIsIndividualDetailsPopupOpen(false);
  };

  const handleViewMoreClick = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const handleBackToList = () => {
    setSelectedFarmer(null);
  };

  const handleUpdateFarmer = (updatedFarmer) => {
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === updatedFarmer.id ? updatedFarmer : farmer
      )
    );
    setSelectedFarmer(updatedFarmer);
  };

  const renderCard = (data, index) => (
    <div key={index} className="farmer-card">
      <div className="farmer-card-header">
        <div className="farmer-card-id">{data.Former_id}</div>
        <div className="farmer-card-name">{data.Name}</div>
      </div>
      <div className="farmer-card-subhead">
        <div className="farmer-card-subhead-detail">
          <span>VLCC</span>
          {data.VLCC.Name}
        </div>
        <div className="farmer-card-subhead-detail">
          <span>Tot Cows</span>
          {data.TotalCows}
        </div>
      </div>
      <div className="farmer-card-body">
        <div className="farmer-card-detail">
          <img src={phone} alt="" />
          <span>: </span>
          {data.phno}
        </div>
        <div className="farmer-card-add-detail">
          <p>Address</p>
          <span>:</span>
          {data.Address.Address_line1}{data.Address.Address_line2}{data.Address.Address_line3}
        </div>
      </div>
      <div className="farmer-card-footer">
        <button
          className="connect-button"
          onClick={() => handleViewMoreClick(data)}
        >
          View More
          <img src={arrow} alt="" />
        </button>
      </div>
    </div>
  );

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
                  Enter Individual detail
                </button>
                <button onClick={() => handleDropdownOptionClick("Bulk")}>
                  Bulk Import
                </button>
              </div>
            )}
          </div>
          <div className="farmer-card-container">{Farmer.map(renderCard)}</div>
        </>
      )}
      <IndividualDetailsPopup
        isOpen={isIndividualDetailsPopupOpen}
        onClose={handleIndividualDetailsClose}
        onAddFarmer={handleAddNewFarmer}
      />
    </div>
  );
};

export default FarmerPage;
