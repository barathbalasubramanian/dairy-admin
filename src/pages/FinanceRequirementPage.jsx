import React, { useState } from "react";
import FinanceConnectPopup from "../components/FinanceConnectPopup.jsx";
import FinanceCancelPopup from "../components/FinanceCancelPopup.jsx";
import FinanceCompletePopup from "../components/FinanceCompletePopup.jsx";
import LoanPreviousRequest from "../components/LoanPreviousRequest.jsx";
import InsurancePreviousRequest from "../components/InsurancePreviousRequest.jsx";
import "../static/css/FinanceRequirementPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";

const FinanceRequirementPage = () => {
  const { CurrCost, connect, cancelLoan, finalLoan } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Loan");
  const [isViewingPreviousRequest, setIsViewingPreviousRequest] =
    useState(false);
  const [isConnectPopupOpen, setIsConnectPopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const [isCompletePopupOpen, setIsCompletePopupOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const { loan, setLoan } = useGlobalContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const loanDataToDisplay = CurrCost.loan;
  const insuranceDataToDisplay = CurrCost.insurance;

  const handleViewPreviousRequest = () => {
    setIsViewingPreviousRequest(true);
  };

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

  const handleCancelClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsCancelPopupOpen(true);
  };

  const handleCancelConfirm = async () => {
    await cancelLoan(selectedFarmer.Ticket_id);
    console.log(`${activeTab} Cancelled for ${selectedFarmer.Farmer_Name}`);
    setIsCancelPopupOpen(false);
  };

  const handleCancelClosePopup = () => {
    setIsCancelPopupOpen(false);
  };

  const handleCompleteClick = async (farmer) => {
    await finalLoan(selectedFarmer.Ticket_id);
    setSelectedFarmer(farmer);
    setIsCompletePopupOpen(true);
  };

  const handleCompleteConfirm = () => {
    console.log(`${activeTab} Completed for ${selectedFarmer.Farmer_Name}`);
    setIsCompletePopupOpen(false);
  };

  const handleCompleteClosePopup = () => {
    setIsCompletePopupOpen(false);
  };

  const renderData = (data) => {
    return data.map((item, index) => (
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
          <button
            className="finance-cancel-button"
            onClick={() => handleCancelClick(item)}
          >
            Cancel
          </button>
          <button
            className="finance-completed-button"
            onClick={() => handleCompleteClick(item)}
          >
            Completed
          </button>
        </div>
      </div>
    ));
  };

  useAuth(() => setIsAuthChecked(true));
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isViewingPreviousRequest ? (
        activeTab === "Loan" ? (
          <LoanPreviousRequest />
        ) : (
          <InsurancePreviousRequest />
        )
      ) : (
        <div className="finance-requirement">
          <div className="finance-view-previous-button">
            <button onClick={handleViewPreviousRequest}>
              View Previous request<span>›</span>
            </button>
          </div>
          <div className="finance-requirement-content">
            <div className="finance-tab-container">
              <div
                className={`finance-tab ${
                  activeTab === "Loan" ? "tabactive" : ""
                }`}
                onClick={() => handleTabClick("Loan")}
              >
                Loan
              </div>
              <div
                className={`finance-tab ${
                  activeTab === "Insurance" ? "tabactive" : ""
                }`}
                onClick={() => handleTabClick("Insurance")}
              >
                Insurance
              </div>
            </div>

            <div className="finance-data-container">
              {activeTab === "Loan"
                ? renderData(loanDataToDisplay)
                : renderData(insuranceDataToDisplay)}
            </div>
          </div>
        </div>
      )}
      <FinanceConnectPopup
        isOpen={isConnectPopupOpen}
        onClose={handleConnectClosePopup}
        onConfirm={handleConnectConfirm}
      />
      <FinanceCancelPopup
        isOpen={isCancelPopupOpen}
        onClose={handleCancelClosePopup}
        onConfirm={handleCancelConfirm}
      />
      <FinanceCompletePopup
        isOpen={isCompletePopupOpen}
        onClose={handleCompleteClosePopup}
        onConfirm={handleCompleteConfirm}
      />
    </>
  );
};

export default FinanceRequirementPage;
