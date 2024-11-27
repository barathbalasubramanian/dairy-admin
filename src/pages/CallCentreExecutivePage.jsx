import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import downarrow from "../static/img/nav/downarrow.svg";
import IndividualDetailsPopup from "../components/AddCallCenterPopup.jsx";
import IndividualEditPopup from "../components/EditCallCenterPopup.jsx";
import edit_img from "../static/img/edit-img.svg";
import "../static/css/FarmerPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";
import { Mail, Phone } from "lucide-react";

const VLCCPage = () => {
  const { staff = [], addstaff } = useGlobalContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [farmers, setFarmers] = useState([
    {
      id: "579HJ73",
      name: "Saran",
      created: "13",
      last_login: "5",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ75",
      name: "Saran",
      created: "15",
      last_login: "2",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ72",
      name: "Saran",
      created: "17",
      last_login: "7",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ76",
      name: "Saran",
      created: "11",
      last_login: "1",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ77",
      name: "Saran",
      created: "18",
      last_login: "9",
      email: "example@example.com",
      phone: "9876543210",
    },
    {
      id: "579HJ78",
      name: "Saran",
      created: "15",
      last_login: "5",
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
    addstaff(newFarmer.name, "", newFarmer.email, newFarmer.phone);
    setFarmers((prevFarmers) => [...prevFarmers, newFarmer]);
    setIsIndividualDetailsPopupOpen(false);
  };

  const handleViewMoreClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsIndividualEditPopupOpen(true);
  };

  const handleUpdateFarmer = (updatedFarmer) => {
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === updatedFarmer.id ? updatedFarmer : farmer
      )
    );
    setIsIndividualEditPopupOpen(false);
  };

  const renderCard = (data, index) => (
    <div key={index} className="farmer-card-1 w-3/12 p-4">
      <div className="farmer-card-header">
        <div className="farmer-card-id"><span className="farmer-card-name capitalize">{data.User_Name}</span></div>
        {data.Staff_id}
      </div>
      <div className="farmer-card-subhead">
        <div className="farmer-card-subhead-detail">
          <span>Created</span>
          {data.Email}
        </div>
        
      </div>
      <div className="farmer-card-body">
        <div className="farmer-card-detail gap-2">
          <Mail size={16} />
          <span style={{fontWeight:"500"}}>
          {data.Email}
          </span>
        </div>
        <div className="farmer-card-detail gap-2">
          <Phone size={16} />
          <span style={{fontWeight:"500"}}>
          {data.Phno}
          </span>
        </div>
      </div>
      <div className="farmer-card-footer">
        <button
          className="connect-button"
          onClick={() => handleViewMoreClick(data)}
        >
          Edit
          <img src={edit_img} alt="" />
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
        <div className="farmer-card-container flex justify-center ">{staff.map(renderCard)}</div>
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
