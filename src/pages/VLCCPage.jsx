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
import { Mail, Phone } from "lucide-react";

const VLCCPage = () => {
  const { Vlcc = [], addvlcc, editVlcc } = useGlobalContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [farmers, setFarmers] = useState([]);

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
      minWidth: "350px",
      margin: "10px", // Adds small spacing between cards
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "fit-content",
    }}
  >
    <div className="farmer-card-header mb-2">
      <div className="farmer-card-id">
        <span className="farmer-card-name text-black">{data.VLCC_name}</span>
      </div>
      {data.VLCC_id}
    </div>
    <div className="farmer-card-body">
      <div className="farmer-card-add-detail mb-2">
        <p>VSP Name</p>
        <span>:</span>
        <span className="capitalize">
          {data.VLCC_personname}
        </span>
      </div>
      <div className="farmer-card-detail gap-2 font-medium">
        <Mail size={16} />
        {data.VLCC_email}
      </div>
      <div className="farmer-card-detail gap-2 font-medium">
        <Phone size={16} />
        {data.VLCC_phno}
      </div>
    </div>
    <div className="farmer-card-subhead mt-2">
      <div className="farmer-card-subhead-detail" style={{ width: "70%" }}>
        <span className="capitalize">farmers</span>
        {data.total_farmers}
      </div>
    </div>
    <div className="farmer-card-footer mt-4">
      <button
        className="connect-button"
        onClick={() => handleViewMoreClick(data)}
        style={{ backgroundColor: "#4695b8", marginTop: "20px" }}
      >
        Edit
        <img src={edit_img} alt="edit icon" style={{ width: "24px", height: "24px", marginLeft: "5px" }} />
      </button>
    </div>
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
        <div className="flex flex-wrap gap-y-4 justify-start gap-2 py-10 px-6">{Vlcc.map(renderCard)}</div>
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
