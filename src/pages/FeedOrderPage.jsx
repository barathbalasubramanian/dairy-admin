import React, { useState, useEffect } from "react";
import FeedOrder from "../components/FeedOrder.jsx";
import FeedDetails from "../components/FeedDetails.jsx";
import "../static/css/FeedOrderPage.css";
import { useGlobalContext } from "../Context";
import { CSVLink } from "react-csv"; // Import CSVLink from react-csv
import axios from "axios";

const FeedPage = () => {
  const { feedOrderdata } = useGlobalContext();
  const [showFarmerDetails, setShowFarmerDetails] = useState(false);
  const [csvData, setCsvData] = useState([]);

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

  const GettheValue = async () => {
    try {
      const baseURL = "https://test.quindltechnologies.com/";
      const res = await axios.get(baseURL + `admin/farmers-feeds`);
      const data = res.data;
      const csvDataFormatted = [
        { farmer: `Total Farmers: ${data.totalFarmers || 0}`, name: "", quantity: "" },
        ...data.feeds.map((item) => ({
          farmer: "",
          name: item.Name,
          quantity: item.totalQty,
        })),
      ];
      setCsvData(csvDataFormatted); // Update state with the fetched CSV data
    } catch (error) {
      console.error("Error fetching feed order data:", error);
    }
  };

  useEffect(() => {
    if (feedOrderdata && feedOrderdata.feeds) {
      // If feedOrderdata is available from global context, use it to set CSV data
      const csvDataFormatted = [
        { farmer: `Total Farmers: ${feedOrderdata.totalFarmers || 0}`, name: "", quantity: "" },
        ...feedOrderdata.feeds.map((item) => ({
          farmer: "",
          name: item.Name,
          quantity: item.totalQty,
        })),
      ];
      setCsvData(csvDataFormatted);
    } else {
      // Fetch data if not available in global context
      GettheValue();
    }
  }, [feedOrderdata]);

  return (
    <>
      {!showFarmerDetails && (
        <div className="main-content">
          <FeedOrder />
          <div className="button-container">
            <button className="view-order-button" onClick={handleViewOrder}>
              View Order <span className="arrow"> › </span>
            </button>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="feed_order_details.csv"
              className="export-button px-12"
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
