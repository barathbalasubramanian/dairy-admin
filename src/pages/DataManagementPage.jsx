import React, { useState } from "react";
import FarmerPage from "./FarmerPage";
import CallCentreExecutivePage from "./CallCentreExecutivePage";
import ServiceProviderPage from "./ServiceProviderPage";
import VLCCPage from "./VLCCPage";
import BMCPage from "./BMCPage";
import ClusterPage from "./ClusterPage";

const MainPage = () => {
  const [activePage, setActivePage] = useState("Farmer");

  // Page mappings
  const pageComponents = {
    Farmer: <FarmerPage />,
    "Call Centre Executive": <CallCentreExecutivePage />,
    "Service Provider": <ServiceProviderPage />,
    VLCC: <VLCCPage />,
    BMC: <BMCPage />,
    Cluster: <ClusterPage />,
  };

  const handleToggle = (page) => {
    setActivePage(page);
  };

  return (
    <div className="">
      {/* Toggle Box */}
      <div className=" ">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-2 mt-4">
          {Object.keys(pageComponents).map((page) => (
            <button
              key={page}
              className={`px-3 py-3 text-sm font-medium rounded-md transition duration-200 ${
                activePage === page
                  ? "bg-[#4695b8] text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleToggle(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Render the selected page */}
      <div className=" ">
        {pageComponents[activePage]}
      </div>
    </div>
  );
};

export default MainPage;
