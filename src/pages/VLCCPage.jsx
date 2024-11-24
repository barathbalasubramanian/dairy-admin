import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import downarrow from "../static/img/nav/downarrow.svg";
import IndividualDetailsPopup from "../components/AddVlccPopup.jsx";
import IndividualEditPopup from "../components/EditVlccPopup.jsx";
import edit_img from "../static/img/edit-img.svg";
import "../static/css/FarmerPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";

const VLCCPage = () => {
  const { Vlcc = [], addvlcc, editVlcc } = useGlobalContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [farmers, setFarmers] = useState([
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      farmers: "5",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      farmers: "5",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      farmers: "6",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      farmers: "6",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      farmers: "6",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ77",
      name: "Saran",
      vlcc: "Cbe",
      farmers: "6",
      email: "example@example.com",
      phone: "9876543210",
    },
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isIndividualDetailsPopupOpen, setIsIndividualDetailsPopupOpen] =
    useState(false);
  const [isIndividualEditPopupOpen, setIsIndividualEditPopupOpen] =
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

  const handleIndividualEditClose = () => {
    setIsIndividualEditPopupOpen(false);
  };

  const handleAddNewFarmer = (newFarmer) => {
    addvlcc(
      newFarmer.vlcc,
      newFarmer.name,
      newFarmer.email,
      newFarmer.phone,
      newFarmer.vlcc
    );
    setFarmers((prevFarmers) => [...prevFarmers, newFarmer]);
    setIsIndividualDetailsPopupOpen(false);
  };

  const handleViewMoreClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsIndividualEditPopupOpen(true);
  };

  const handleUpdateFarmer = (updatedFarmer) => {
    editVlcc(
      updatedFarmer.id,
      updatedFarmer.vlcc,
      updatedFarmer.name,
      updatedFarmer.email,
      updatedFarmer.phone
    );
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === updatedFarmer.id ? updatedFarmer : farmer
      )
    );
    setIsIndividualEditPopupOpen(false);
  };

const renderCard = (data, index) => (
  <div
    key={index}
    className="farmer-card-1"
    style={{
      width: "25%",
      margin: "10px", // Adds small spacing between cards
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      // alignItems: "center",
    }}
  >
    <div className="farmer-card-header mb-2">
      <div className="farmer-card-id">
        {data.VLCC_id}. <span className="farmer-card-name text-black">{data.VLCC_name}</span>
      </div>
    </div>
    <div className="farmer-card-body">
      <div className="farmer-card-add-detail mb-2">
        <p>VSP Name</p>
        <span>:</span>
        {data.VLCC_personname}
      </div>
      <div className="farmer-card-detail">
        <img src={mail} alt="email icon" style={{ width: "25px", height: "25px", marginRight: "5px" }} />
        {data.VLCC_email}
      </div>
      <div className="farmer-card-detail">
        <img src={phone} alt="phone icon" style={{ width: "25px", height: "25px", marginRight: "5px" }} />
        {data.VLCC_phno}
      </div>
    </div>
    <div className="farmer-card-subhead mt-2">
      <div className="farmer-card-subhead-detail" style={{ width: "70%" }}>
        <span>farmers</span>
        {data.total_farmers}
      </div>
    </div>
    <div className="farmer-card-footer mt-4">
      <button
        className="connect-button"
        onClick={() => handleViewMoreClick(data)}
      >
        Edit
        <img src={edit_img} alt="edit icon" style={{ width: "24px", height: "24px", marginLeft: "5px" }} />
      </button>
    </div>
  </div>
);

const CardContainer = ({ dataList }) => (
  <div
    className="card-container flex flex-wrap justify-between"
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between", // Space between the cards
      alignItems: "flex-start",
      gap: "10px", // Optional: Add gap if `justify-between` is insufficient
    }}
  >
    {dataList.map((data, index) => renderCard(data, index))}
  </div>
);



  useAuth(() => setIsAuthChecked(true));
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div className="farmer-availability-page ">
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
        <div className="farmer-card-container flex justify-center">{Vlcc.map(renderCard)}</div>
      </>
      <IndividualDetailsPopup
        isOpen={isIndividualDetailsPopupOpen}
        onClose={handleIndividualDetailsClose}
        onAddFarmer={handleAddNewFarmer}
      />
      <IndividualEditPopup
        isOpen={isIndividualEditPopupOpen}
        onClose={handleIndividualEditClose}
        farmer={selectedFarmer}
        onSave={handleUpdateFarmer}
      />
    </div>
  );
};

export default VLCCPage;
