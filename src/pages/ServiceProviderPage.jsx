import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import arrow from "../static/img/farmer-arrow.svg";
import downarrow from "../static/img/nav/downarrow.svg";
import ViewFarmerDetails from "../components/ViewSpDetails.jsx";
import IndividualDetailsPopup from "../components/AddSpPopup.jsx";
import "../static/css/FarmerPage.css";
import { useGlobalContext } from "../Context";

const ServiceProviderPage = () => {
  const { alldoc } = useGlobalContext();
  console.log(alldoc)
  const [farmers, setFarmers] = useState([
    {
      id: "579HJ77",
      name: "Saran",
      cluster: "Cbe",
      specialist: "5",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      cluster: "Cbe",
      specialist: "5",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      cluster: "Cbe",
      specialist: "6",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      cluster: "Cbe",
      specialist: "6",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      cluster: "Cbe",
      specialist: "6",
      email: "example@example.com",
      phone: "9876543210",
      address: "NO:04, ABC Street, Pollachi, Cbe Tamil Nadu, TN-636 000",
    },
    {
      id: "579HJ77",
      name: "Saran",
      cluster: "Cbe",
      specialist: "6",
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
        <div className="farmer-card-id">{data.doctorId}</div>
        <div className="farmer-card-name">{data.doctorName}</div>
      </div>
      <div className="farmer-card-subhead">
        <div className="farmer-card-subhead-detail">
          <span>cluster</span>
          {data.clusterName}
        </div>
        <div className="farmer-card-subhead-detail">
          <span>specialist</span>
          {data.doctorType}
        </div>
      </div>
      <div className="farmer-card-body">
        <div className="farmer-card-detail">
          <img src={mail} alt="" />
          <span>: </span>
          {data.email}
        </div>
        <div className="farmer-card-detail">
          <img src={phone} alt="" />
          <span>: </span>
          {data.phone}
        </div>
        <div className="farmer-card-add-detail">
          <p>Address</p>
          <span>:</span>
          {data.address}
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
          <div className="farmer-card-container">{alldoc.map(renderCard)}</div>
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

export default ServiceProviderPage;
