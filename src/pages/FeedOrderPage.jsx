import React, { useState } from "react";
import FeedOrder from "../components/FeedOrder.jsx";
import FeedDetails from "../components/FeedDetails.jsx";
import "../static/css/FeedOrderPage.css";
import { useGlobalContext } from "../Context";
import { jsPDF } from "jspdf"; // Import jsPDF

const FeedPage = () => {
  const { feed } = useGlobalContext();
  const [showFarmerDetails, setShowFarmerDetails] = useState(false);

  const handleViewOrder = () => {
    setShowFarmerDetails(true);
  };

  const handleBack = () => {
    setShowFarmerDetails(false);
  };

  // Function to handle exporting as PDF
  const handleExport = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text("Feed Order Details", 20, 20);
    
    // Assuming 'feed' is an array of feed orders, you can loop through it to add details
    feed.forEach((item, index) => {
      doc.text(`Order ${index + 1}: ${item.name} - ${item.quantity}`, 20, 30 + (index * 10));
    });

    // Save the PDF
    doc.save("feed_order_details.pdf");
  };

  return (
    <>
      {!showFarmerDetails && (
        <div className="main-content">
          <FeedOrder />
          <div className="button-container">
            <button className="view-order-button" onClick={handleViewOrder}>
              View Order <span className="arrow">›</span>
            </button>
            <button className="export-button" onClick={handleExport}>
              Export
            </button>
          </div>
        </div>
      )}
      {showFarmerDetails && <FeedDetails handleBack={handleBack} />}
    </>
  );
};

export default FeedPage;
