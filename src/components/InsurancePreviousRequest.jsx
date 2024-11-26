import React, { useState } from "react";
import FinanceConnectPopup from "../components/FinanceConnectPopup.jsx";
import "../static/css/FinancePreviousRequest.css";
import { useGlobalContext } from "../Context";
import { ArrowLeft } from "react-feather";

const InsurancePreviousRequest = ({handleBack}) => {
  const { prein, connect } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Processed");
  const [isConnectPopupOpen, setIsConnectPopupOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
 

  const getCurrentPageData = () => {
    if (prein === undefined) {
      return [];
    }
    return prein.filter((item) => item.status === activeTab);
  };

  const currentData = getCurrentPageData();

  const handleConnectClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsConnectPopupOpen(true);
  };

  const handleConnectConfirm = async () => {
    await connect(selectedFarmer.Ticket_id);
    console.log(`Confirmed connection for ${selectedFarmer.Farmer_Name}`);
    setIsConnectPopupOpen(false);
  };

  const handleConnectClosePopup = () => {
    setIsConnectPopupOpen(false);
  };

  const renderData = () => {
    return currentData.map((item, index) => (
      <div key={index} className="finance-data-card">
        <div className="finance-data-details">
          <div className="finance-data-div">
            <p className="finance-data-name">Farmer Name</p> <span>:</span>
            <p className="finance-data-value">{item.Farmer_Name}</p>
          </div>
          <div className="finance-data-div">
            <p className="finance-data-name"> Phone Number</p> <span>:</span>
            <p className="finance-data-value"> {item.Farmer_Phno}</p>
          </div>
          <div className="finance-data-div">
            <p className="finance-data-name"> Address</p> <span>:</span>
            <p className="finance-data-value">{item.Address}</p>
          </div>
          <div className="finance-data-div">
            <p className="finance-data-name"> Cow's Count</p> <span>:</span>{" "}
            <p className="finance-data-value">{item.Cow_count}</p>
          </div>
          <div className="finance-data-div">
            <p className="finance-data-name"> VLCC </p>
            <span>:</span>{" "}
            <p className="finance-data-value">{item.VLCC_Name}</p>
          </div>
          <div className="finance-data-div">
            <p className="finance-data-name"> Cluster</p>
            <span>:</span>{" "}
            <p className="finance-data-value">{item.Cluster_Name}</p>
          </div>
        </div>
        <div className="finance-data-info">
          <div className="finance-data-info-name">Information:</div>
          <textarea readOnly value={item.Comments}></textarea>
        </div>
        <div className="finance-data-actions">
          <button
            className="finance-connect-button"
            onClick={() => handleConnectClick(item)}
          >
            Connect
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div> <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft />
          <span>Back</span>
        </button>
    <div className="finance-previous-request">
      <div className="finance-tab-container">
        <div
          className={`finance-tab ${
            activeTab === "Processed" ? "tabactive" : ""
          }`}
          onClick={() => handleTabClick("Processed")}
        >
          Processed
        </div>
        <div
          className={`finance-tab ${
            activeTab === "Cancelled" ? "tabactive" : ""
          }`}
          onClick={() => handleTabClick("Cancelled")}
        >
          Cancelled
        </div>
      </div>
      <div className="finance-data-container">{renderData()}</div>
      <FinanceConnectPopup
        isOpen={isConnectPopupOpen}
        onClose={handleConnectClosePopup}
        onConfirm={handleConnectConfirm}
      />
      </div>
      </div>
  );
};

export default InsurancePreviousRequest;
