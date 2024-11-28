import React, { useState } from "react";
import FinanceConnectPopup from "../components/FinanceConnectPopup.jsx";
import "../static/css/FinancePreviousRequest.css";
import { useGlobalContext } from "../Context";
import { ArrowLeft } from "lucide-react";

const LoanPreviousRequest = ({handleBack}) => {
  const { preloan, connect } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Processed");
  const [isConnectPopupOpen, setIsConnectPopupOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const getCurrentPageData = () => {
    if (preloan === undefined) {
      return [];
    }
    return preloan.filter((item) => item.status === activeTab);
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
        <div className="finance-data-info border-2 p-2">
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
    <div className="finance-previous-request" style={{marginTop:"1em"}}>

      <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft />
          <span>Back</span>
        </button>

      <div className="w-full flex items-center justify-center gap-10">
        <div
          className={`min-w-[16em] text-center px-4 py-2 rounded-md ${
            activeTab === "Processed" ? "bg-[#4695b8] text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handleTabClick("Processed")}
        >
          Processed
        </div>
        <div
          className={`min-w-[16em] text-center px-4 py-2 rounded-md ${
            activeTab === "Cancelled" ? "bg-[#4695b8] text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
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
  );
};

export default LoanPreviousRequest;
