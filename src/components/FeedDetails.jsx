import React, { useState } from "react";
import down_up_arrow from "../static/img/down-up-arrow.svg";
import "../static/css/FeedDetails.css";
import FeedOrderDetailsPopup from "../components/FeedOrderDetailsPopup.jsx";
import { useGlobalContext } from "../Context";
import { FaArrowLeft } from "react-icons/fa";

const FeedDetails = ({ handleBack }) => {
  const { currentFeedPeriodData, previousFeedPeriodData } = useGlobalContext();
  const [currentPeriod, setCurrentPeriod] = useState(true);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);

  const farmersData = currentPeriod
    ? currentFeedPeriodData
    : previousFeedPeriodData;

  const handlePeriodChange = (isCurrent) => {
    setCurrentPeriod(isCurrent);
  };

  const handleViewMore = (farmerId) => {
    setSelectedFarmerId(farmerId);
  };

  const handleClosePopup = () => {
    setSelectedFarmerId(null);
  };

  return (
    <div className="farmer-list">
      <button className="back-button" onClick={handleBack} aria-label="Go back">
        <FaArrowLeft size={24} />
      </button>

      <div className="navigation">
        <div className="period-button-container">
          <button
            className={`period-button ${currentPeriod ? "active" : ""}`}
            onClick={() => handlePeriodChange(true)}
          >
            Current Period
          </button>
          <button
            className={`period-button ${!currentPeriod ? "active" : ""}`}
            onClick={() => handlePeriodChange(false)}
          >
            Previous Period
          </button>
        </div>
      </div>

      <div className="cards">
        {farmersData.map((farmer, index) => (
          <div key={index} className="card">
            <div className="card-content">
              <p>
                <span className="label">Farmer ID</span>
                <span className="colon">:</span> {farmer.Former_id}
              </p>
              <p>
                <span className="label">Name</span>
                <span className="colon">:</span> {farmer.formerName}
              </p>
              <p>
                <span className="label">VLCC</span>
                <span className="colon">:</span> {farmer.vlccName}
              </p>
              <p>
                <span className="label">Cluster</span>
                <span className="colon">:</span> {farmer.clusterName}
              </p>
              <p>
                <span className="label">Phone</span>
                <span className="colon">:</span> {farmer.phno}
              </p>
            </div>
            <div>
              <button
                className="feed-view-more-button"
                onClick={() => handleViewMore(farmer.Former_id)}
              >
                View More <img src={down_up_arrow} alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedFarmerId && (
        <FeedOrderDetailsPopup
          farmerId={selectedFarmerId}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default FeedDetails;
