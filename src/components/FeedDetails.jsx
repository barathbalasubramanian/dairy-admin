import React, { useState } from "react";
import down_up_arrow from "../static/img/down-up-arrow.svg";
import "../static/css/FeedDetails.css";
import FeedOrderDetailsPopup from "../components/FeedOrderDetailsPopup.jsx";
import { useGlobalContext } from "../Context";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

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
    <div className=" p-6">
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="flex gap-2 items-center"
      >
        <ArrowLeft className="text-black font-medium text-xl" /> Back
      </button>

      <div className="mb-8">
        <div className="flex justify-center gap-12">
          <button
            className={`px-6 py-2  transition-all rounded-lg duration-300 ${
              currentPeriod
                ? "bg-[#4695b8] text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePeriodChange(true)}
          >
            Current Period
          </button>
          <button
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              !currentPeriod
                ? "bg-[#4695b8] text-white shadow-md"
                : "bg-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => handlePeriodChange(false)}
          >
            Previous Period
          </button>
        </div>
      </div>

      {farmersData && farmersData.length > 0 ? (
        <div className="flex justify-center gap-14">
          {farmersData.map((farmer, index) => (
            <div
              key={index}
              className="w-[305px] bg-white rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.35)] p-6"
            >
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[80px]">Farmer ID</span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-900">{farmer.Former_id}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[80px]">Name</span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-900">{farmer.formerName}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[80px]">VLCC</span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-900">{farmer.vlccName}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[80px]">Cluster</span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-900">{farmer.clusterName}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[80px]">Phone</span>
                  <span className="mx-2">:</span>
                  <span className="text-gray-900">{farmer.phno}</span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full flex items-center justify-center gap-2 bg-[#06ad9d] text-white px-4 py-2 rounded-md  transition-colors"
                  onClick={() => handleViewMore(farmer.Former_id)}
                >
                  View More
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-4xl text-gray-400 mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Found</h3>
          <p className="text-gray-500">
            {currentPeriod
              ? "No farmers data available for the current period"
              : "No farmers data available for the previous period"}
          </p>
        </div>
      )}

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