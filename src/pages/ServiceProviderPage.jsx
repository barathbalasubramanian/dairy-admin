import React, { useState, useEffect } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import arrow from "../static/img/farmer-arrow.svg";
import downarrow from "../static/img/nav/downarrow.svg";
import ViewFarmerDetails from "../components/ViewSpDetails.jsx";
import IndividualDetailsPopup from "../components/AddSpPopup.jsx";
import "../static/css/FarmerPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";

const ServiceProviderPage = () => {
  const { alldoc = [] } = useGlobalContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isIndividualDetailsPopupOpen, setIsIndividualDetailsPopupOpen] =
    useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [farmers, setFarmers] = useState([]); // This state is not used in the current code.

  // Fetch authentication status
  useAuth(() => setIsAuthChecked(true));

  // Check if authentication is complete
  useEffect(() => {
    if (!isAuthChecked) return; // Prevents rendering before auth is checked
  }, [isAuthChecked]);

  const handleAddButtonClick = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown
  };

  const handleDropdownOptionClick = (option) => {
    if (option === "individual") {
      setIsIndividualDetailsPopupOpen(true);
    } else if (option === "Bulk") {
      console.log("Bulk Import selected"); // Implement bulk import functionality
    }
    setIsDropdownOpen(false); // Close dropdown after selection
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
    setSelectedFarmer(null); // Reset selected farmer
  };

  const handleUpdateFarmer = (updatedFarmer) => {
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === updatedFarmer.id ? updatedFarmer : farmer
      )
    );
    setSelectedFarmer(updatedFarmer); // Update selected farmer with the latest details
  };

  const renderCard = (data, index) => (
    <div key={index} className="farmer-card">
      <div className="farmer-card-header">
        <div className="farmer-card-id">{data.doctorId}</div>
        <div className="farmer-card-name">{data.doctorName}</div>
      </div>
      <div className="farmer-card-subhead">
        <div className="farmer-card-subhead-detail">
          <span>Cluster:</span> {data.clusterName}
        </div>
        <div className="farmer-card-subhead-detail">
          <span>Specialist:</span> {data.doctorType}
        </div>
      </div>
      <div className="farmer-card-body">
        <div className="farmer-card-detail">
          <img src={mail} alt="Email" />
          <span>: </span>
          {data.email}
        </div>
        <div className="farmer-card-detail">
          <img src={phone} alt="Phone" />
          <span>: </span>
          {data.phone}
        </div>
        <div className="farmer-card-add-detail">
          <p>Address:</p>
          <span>{data.address}</span>
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

  if (!isAuthChecked) {
    return <div>Loading...</div>; // Show loading state until auth is checked
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
                  Enter Individual Details
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
