import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import downarrow from "../static/img/nav/downarrow.svg";
import IndividualDetailsPopup from "../components/AddClusterPopup.jsx";
import IndividualEditPopup from "../components/EditClusterPopup.jsx";
import edit_img from "../static/img/edit-img.svg";
import "../static/css/FarmerPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";
import { Mail, Phone } from "lucide-react";

const ClusterPage = () => {
  const { cluster = [], addcluster, editCluster } = useGlobalContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [farmers, setFarmers] = useState([

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
    addcluster(
      newFarmer.cluster,
      newFarmer.name,
      newFarmer.email,
      newFarmer.phone
    );
    setFarmers((prevFarmers) => [...prevFarmers, newFarmer]);
    setIsIndividualDetailsPopupOpen(false);
  };

  const handleViewMoreClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsIndividualEditPopupOpen(true);
  };

  const handleUpdateFarmer = (updatedFarmer) => {
    editCluster(
      updatedFarmer.id,
      updatedFarmer.cluster,
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
    <div key={index} className="farmer-card-1 min-w-[350px]">
      <div className="farmer-card-header">
        <div className="farmer-card-id"><span className="farmer-card-name capitalize">{data.clusterName}</span></div>
        {data.clusterId}
      </div>
      <div className="farmer-card-body">
        <div className="farmer-card-add-detail mb-1">
          <p>CP Name</p>
          <span>:</span>
          <span className="capitalize"> 
            {data.clusterPersonName}
          </span>
        </div>
        <div className="farmer-card-detail gap-2">
          <Mail size={16} />
          {data.clusterEmail}
        </div>
        <div className="farmer-card-detail gap-2">
          <Phone size={16} />
          {data.clusterPhone}
        </div>
      </div>
      <div className="farmer-card-subhead">
        <div className="farmer-card-subhead-detail-1">
          <span>farmers</span>
          {data.totalFarmers}
        </div>
        <div className="farmer-card-subhead-detail-1">
          <span>VLCC</span>
          {data.totalVLCCs}
        </div>
        <div className="farmer-card-subhead-detail-1">
          <span>BMC</span>
          {data.totalBMCs}
        </div>
      </div>
      <div className="farmer-card-footer">
        <button
          className="connect-button"
          onClick={() => handleViewMoreClick(data)}
          style={{ backgroundColor: "#4695b8", marginTop: "20px" }}
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
        <div className="flex flex-wrap justify-start px-6 py-10 gap-8">{cluster.map(renderCard)}{cluster.map(renderCard)}</div>
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

export default ClusterPage;
