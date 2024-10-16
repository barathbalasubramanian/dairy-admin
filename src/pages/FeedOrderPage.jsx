import React, { useState } from "react";
import FeedOrder from "../components/FeedOrder.jsx";
import FeedDetails from "../components/FeedDetails.jsx";
import "../static/css/FeedOrderPage.css"
import { useGlobalContext } from "../Context";

const FeedPage = () => {
  const { feed } = useGlobalContext();
  const [showFarmerDetails, setShowFarmerDetails] = useState(false);

  const handleViewOrder = () => {
    setShowFarmerDetails(true);
  };

  const handleBack = () => {
    setShowFarmerDetails(false);
  };

  return (
    <>
    {!showFarmerDetails && (
      <div className="main-content">
        {!showFarmerDetails && <FeedOrder />}
        {!showFarmerDetails && (
          <div className="button-container">
            <button className="view-order-button" onClick={handleViewOrder}>
              View Order <span className="arrow">›</span>
            </button>
            <button className="export-button">Export</button>
          </div>
        )}
      </div>
    )}
      {showFarmerDetails && <FeedDetails handleBack={handleBack} />}
    </>
  );
};

export default FeedPage;
