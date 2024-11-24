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
import { MapPin,ArrowRight  } from "react-feather"; 


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
  <div
    key={index}
    className="farmer-card flex flex-col justify-between items-start bg-white shadow-lg rounded-lg  space-y-1 w-[295px] "
    style={{
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.25)", // Increased shadow intensity
    }}
  >
    {/* Header */}
    <div className="farmer-card-header text-start w-full">
      <div className="farmer-card-id text-lg font-semibold text-gray-800">
        {data.doctorId}.{" "}
        <span className="farmer-card-name">{data.doctorName}</span>
      </div>
    </div>

    {/* Subhead */}
    <div className="farmer-card-subhead flex  text-3sm text-gray-700">
      <div className="farmer-card-subhead-detail">
        <span className="font-medium">Cluster:</span> {data.clusterName}
      </div>
      <div className="farmer-card-subhead-detail">
        <span className="font-medium">Specialist:</span> {data.doctorType}
      </div>
    </div>

    {/* Body */}
    <div className="farmer-card-body w-full  ">
      <div className="farmer-card-detail flex items-center text-gray-600 text-3sm ">
        <img src={mail} alt="Email" className="w-5 h-5 mr-2" />
        {data.email}
      </div>
      <div className="farmer-card-detail flex items-center text-gray-600 text-3sm">
        <img src={phone} alt="Phone" className="w-5 h-5 mr-2" />
        {data.phone}
      </div>
      <div className="farmer-card-add-detail flex items-center text-gray-700 text-3sm">
        <MapPin size={16} />
        <span className="ml-3">{data.address}</span>
      </div>
    </div>

    {/* Footer */}
    <div className="farmer-card-footer w-full flex justify-end ">
      <button
        className="connect-button flex items-center bg-[#06ad9d] text-white px-3 py-2 rounded-md hover:bg-[#058d84] transition"
        onClick={() => handleViewMoreClick(data)}
      >
        View More
        <ArrowRight className="w-5 h-5 ml-2" />
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
          <div className="farmer-card-container flex justify-center">{alldoc.map(renderCard)}</div>
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
