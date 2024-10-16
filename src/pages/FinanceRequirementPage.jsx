import React, { useState } from "react";
import FinanceConnectPopup from "../components/FinanceConnectPopup.jsx";
import FinanceCancelPopup from "../components/FinanceCancelPopup.jsx";
import FinanceCompletePopup from "../components/FinanceCompletePopup.jsx";
import LoanPreviousRequest from "../components/LoanPreviousRequest.jsx";
import InsurancePreviousRequest from "../components/InsurancePreviousRequest.jsx";
import "../static/css/FinanceRequirementPage.css";
import { useGlobalContext } from "../Context";

const FinanceRequirementPage = () => {
  const { CurrCost, connect, cancelLoan, finalLoan } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Loan");
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewingPreviousRequest, setIsViewingPreviousRequest] =
    useState(false);
  const [isConnectPopupOpen, setIsConnectPopupOpen] = useState(false);
  const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false);
  const [isCompletePopupOpen, setIsCompletePopupOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const itemsPerPage = 3;

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const getCurrentPageData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const loanDataToDisplay = getCurrentPageData(CurrCost.loan);
  const insuranceDataToDisplay = getCurrentPageData(CurrCost.insurance);

  const handleViewPreviousRequest = () => {
    setIsViewingPreviousRequest(true);
  };

  const handleConnectClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsConnectPopupOpen(true);
  };

  const handleConnectConfirm = async () => {
    await connect(selectedFarmer.Ticket_id)
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
    console.log(`${activeTab} Cancelled for ${selectedFarmer.farmerName}`);
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
    console.log(`${activeTab} Completed for ${selectedFarmer.farmerName}`);
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

  const pageCount = Math.ceil(
    (activeTab === "Loan" ? CurrCost.loan.length : CurrCost.insurance.length) /
      itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            <div className="pagination">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                {"<<"}
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              {[...Array(pageCount).keys()].map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number + 1)}
                  className={currentPage === number + 1 ? "active" : ""}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
              >
                {">"}
              </button>
              <button
                onClick={() => handlePageChange(pageCount)}
                disabled={currentPage === pageCount}
              >
                {">>"}
              </button>
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
