import React, { useState } from "react";
import FinanceConnectPopup from "../components/FinanceConnectPopup.jsx";
import { useGlobalContext } from "../Context";

const InsurancePreviousRequest = () => {
  const { prein,connect } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Processed");
  const [currentPage, setCurrentPage] = useState(1);
  const [isConnectPopupOpen, setIsConnectPopupOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const itemsPerPage = 3;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const getCurrentPageData = () => {
    if(prein === undefined){
      return []
    }
    const filteredData = prein.filter((item) => item.status === activeTab);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const currentData = getCurrentPageData();


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleConnectClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsConnectPopupOpen(true);
  };

  const handleConnectConfirm = async () => {
    await connect(selectedFarmer.Ticket_id);
    console.log(`Confirmed connection for ${selectedFarmer.farmerName}`);
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
            <p className="finance-data-value">
              {item.Address}
            </p>
          </div>
          <div className="finance-data-div">
            <p className="finance-data-name"> Cow's Count</p> <span>:</span>{" "}
            <p className="finance-data-value">{item.Cow_count}</p>
          </div>
          <div className="finance-data-div">
            <p className="finance-data-name"> VLCC </p>
            <span>:</span> <p className="finance-data-value">{item.VLCC_Name}</p>
          </div>
          <div className="finance-data-div">
            <p className="finance-data-name"> Cluster</p>
            <span>:</span> <p className="finance-data-value">{item.Cluster_Name}</p>
          </div>
        </div>
        <div className="finance-data-info">
          <div className="finance-data-info-name">Information:</div>
          <textarea readOnly value={item.Comments}></textarea>
        </div>
        <div className="finance-data-actions">
          {activeTab === "Processed" ? (
            <button
              className="finance-completed-button"
              onClick={() => handleConnectClick(item)}
            >
              Connect
            </button>
          ) : (
            <div className="insurance-cancelled">
              Cancelled <span className="cancel-icon">✖</span>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="finance-previous-request">
      <div className="finance-previous-tab-container">
        <div
          className={`finance-previous-tab ${
            activeTab === "Processed" ? "tabactive" : ""
          }`}
          onClick={() => handleTabClick("Processed")}
        >
          Processed
        </div>
        <div
          className={`finance-previous-tab ${
            activeTab === "Cancelled" ? "tabactive" : ""
          }`}
          onClick={() => handleTabClick("Cancelled")}
        >
          Cancelled
        </div>
      </div>
      <div className="finance-previous-data-container">{renderData()}</div>
     
      <FinanceConnectPopup
        isOpen={isConnectPopupOpen}
        onClose={handleConnectClosePopup}
        onConfirm={handleConnectConfirm}
      />
    </div>
  );
};

export default InsurancePreviousRequest;
