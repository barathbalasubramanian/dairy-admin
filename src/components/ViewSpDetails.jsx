import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import FarmerTicketsTable from "../components/SpTicketsTable.jsx";
import IndividualEditPopup from "../components/EditSpPopup.jsx";
import "../static/css/ViewFarmerDetails.css";

const ViewFarmerDetails = ({ farmer, onBack, onUpdateFarmer }) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleSave = (updatedFarmer) => {
    onUpdateFarmer(updatedFarmer);
  };

  return (
    <div className="view-farmer-details">
      <div className="view-farmer-details-buttons">
        <div className="farmer-edit-button">
          <button onClick={handleEditClick}>Edit</button>
        </div>
      </div>
      <div className="view-farmer-details-content">
        <div className="farmer-details">
          <div className="farmer-details-1">
            <div className="farmer-details-id">
              <span>{farmer.doctorId}</span>
            </div>
            <div className="farmer-details-name">
              <span>{farmer.doctorName}</span>
            </div>
          </div>
          <div className="farmer-details-2">
            <div className="farmer-details-subhead">
              <div className="farmer-details-subhead-detail">
                <span>cluster</span>
                {farmer.clusterName}
              </div>
              <div className="farmer-details-subhead-detail">
                <span>specialist</span>
                {farmer.doctorType}
              </div>
            </div>
            <div className="farmer-details-row">
              <img src={mail} alt="" />
              <span>: </span>
              {farmer.email}
            </div>
            <div className="farmer-details-row">
              <img src={phone} alt="" />
              <span>: </span>
              {farmer.phone}
            </div>
          </div>
          <div className="farmer-details-3">
            <div className="farmer-details-row">
              <p> Address</p>
              <span>:</span>
              {farmer.address}
            </div>
            <div className="farmer-details-row">
              <p>VSP </p>
              <span>:</span>
              {farmer.vlccPersonName}
            </div>
          </div>
          <div className="farmer-details-4">
            <div className="farmer-details-row">
              <p>Manager </p>
              <span>:</span>
              {farmer.managerName}
            </div>
            <div className="farmer-details-row">
              <img src={phone} alt="" />
              <span>:</span>
              {farmer.managerPhno}
            </div>
          </div>
        </div>
        <div className="farmer-tickets-table">
          <FarmerTicketsTable 
          data={farmer.tickets}/>
        </div>
      </div>
      <IndividualEditPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onSave={handleSave}
        farmer={farmer}
      />
    </div>
  );
};

export default ViewFarmerDetails;
