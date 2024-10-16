import React, { useState } from "react";
import down_up_arrow from "../static/img/down-up-arrow.svg";
import "../static/css/FeedDetails.css";
import FeedOrderDetailsPopup from "../components/FeedOrderDetailsPopup.jsx";
import { useGlobalContext } from "../Context";

const FeedDetails = ({ handleBack }) => {
  const { currentFeedPeriodData, previousFeedPeriodData } = useGlobalContext();
  const [currentPeriod, setCurrentPeriod] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFarmerId, setSelectedFarmerId] = useState(null);
  const itemsPerPage = 6;

  const farmersData = currentPeriod ? currentFeedPeriodData : previousFeedPeriodData;
  const pageCount = Math.ceil(farmersData.length / itemsPerPage);

  const handlePeriodChange = (isCurrent) => {
    setCurrentPeriod(isCurrent);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = farmersData.slice(indexOfFirstItem, indexOfLastItem);

  const handleViewMore = (farmerId) => {
    setSelectedFarmerId(farmerId);
  };

  const handleClosePopup = () => {
    setSelectedFarmerId(null);
  };

  return (
    <div className="farmer-list">
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
        {currentItems.map((farmer, index) => (
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
