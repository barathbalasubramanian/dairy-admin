import React, { useState } from "react";
import FeedOrder from "../components/FeedOrder.jsx";
import FeedDetails from "../components/FeedDetails.jsx";
import "../static/css/FeedOrderPage.css";
import { useGlobalContext } from "../Context";
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv

const FeedPage = () => {
  const { feedOrderdata } = useGlobalContext();
  const [showFarmerDetails, setShowFarmerDetails] = useState(false);

  const handleViewOrder = () => {
    setShowFarmerDetails(true);
  };

  const handleBack = () => {
    setShowFarmerDetails(false);
  };

  // Prepare CSV data and headers
  const csvHeaders = [
    { label: "Farmer", key: "farmer" },
    { label: "Feed Name", key: "name" },
    { label: "Quantity", key: "quantity" }
  ];

  // CSV data structure including total farmers and each feed item
  const csvData = [
    { farmer: `Total Farmers: ${feedOrderdata.totalFarmers}`, name: "", quantity: "" }, // Total farmers
    ...feedOrderdata.feeds.map((item, index) => ({
      farmer: "",
      name: item.Name,
      quantity: item.totalQty,
    })),
  ];

  return (
    <>
      {!showFarmerDetails && (
        <div className="main-content">
          <FeedOrder />
          <div className="button-container">
            <button className="view-order-button" onClick={handleViewOrder}>
              View Order <span className="arrow">›</span>
            </button>
            
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="feed_order_details.csv"
              className="export-button px-12 "
            >
              Export as CSV
            </CSVLink>
          </div>
        </div>
      )}
      {showFarmerDetails && <FeedDetails handleBack={handleBack} />}
    </>
  );
};

export default FeedPage;
