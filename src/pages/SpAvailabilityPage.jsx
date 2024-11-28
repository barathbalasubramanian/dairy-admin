import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import phone_button from "../static/img/phone_button.svg";
import FinanceConnectPopup from "../components/FinanceConnectPopup.jsx";
import "../static/css/SpAvailabilityPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";
import { Mail, Phone } from "lucide-react";

const SpAvailabilityPage = () => {
  const { sp } = useGlobalContext();
  const [tab, setTab] = useState("Available");
  const [isConnectPopupOpen, setIsConnectPopupOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useAuth(() => setIsAuthChecked(true));
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  // Check if sp is defined before accessing its properties
  const availableItems = sp?.Availabe || []; // Use optional chaining and provide a default empty array
  const unavailableItems = sp?.UnAvailable || [];

  const handleConnectClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsConnectPopupOpen(true);
  };

  const handleConnectConfirm = () => {
    console.log(`Confirmed connection with ${selectedFarmer.Name}`);
    setIsConnectPopupOpen(false);
  };

  const handleConnectClosePopup = () => {
    setIsConnectPopupOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const filterItems = (items) => {
    return items.filter((item) => {
      const typeMatch =
        typeFilter === "" ||
        (typeFilter === "VETER" && item.Type === 2) ||
        (typeFilter === "AI" && item.Type === 1) ||
        (typeFilter === "Feed" && item.Type === 3) ||
        (typeFilter === "Insurance" && item.Type === 4) ||
        (typeFilter === "Loan" && item.Type === 5);

      const statusMatch = statusFilter
        ? item.ClusterName === statusFilter
        : true;

      return typeMatch && statusMatch;
    });
  };

  const clearFilters = () => {
    setTypeFilter("");
    setStatusFilter("");
  };

  const renderCard = (data, isAvailable) => (
    <div key={data.Doctor_id} className="sp-card" style={{minWidth:"350px"}}>
      <div className="sp-card-header">
        <div className="sp-card-idname">
          <div className="sp-card-id capitalize">{data.Name}</div>
          <div>{data.Doctor_id}</div>
        </div>
        <div
          className={`sp-status ${isAvailable ? "available" : "unavailable"}`}
        >
          {isAvailable
            ? "Available"
            : `Available On ${formatDate(data.Availableon)}`}
        </div>
      </div>
      <div className="sp-card-subhead">
        <div className="sp-card-subhead-detail">
          <span>Cluster</span>
          {data.ClusterName}
        </div>
        <div className="sp-card-subhead-detail">
          <span>Specialist</span>
          {data.Type === 1 ? " AI" : " Veterinary"}
        </div>
      </div>
      <div className="sp-card-body">
        <div className="sp-card-detail gap-2">
          <Mail size={16} />
          {/* <span>: </span> */}
          {data.Email}
        </div>
        <div className="sp-card-detail gap-2">
          {/* <img src={phone} alt="Phone" /> */}
          {/* <span>: </span> */}
          <Phone size={16} />
          {data.Phno}
        </div>
        {!isAvailable && (
          <div className="sp-card-comment">
            <span>Comment</span>
            <p className="textarea">{data.Reason}</p>
          </div>
        )}
      </div>
      {isAvailable && data.status !== "Unavailable" && (
        <div className="sp-card-footer">
          <button
            className="connect-button"
            onClick={() => handleConnectClick(data)}
            style={{ backgroundColor: "#4695b8" }}
          >
            Connect
            <img src={phone_button} alt="Connect" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="sp-availability-page">
  <div className="flex w-full items-center justify-center">
    <div className="flex w-[85%] items-center justify-center gap-5 m-auto">
      <div className="sp-inputgroup min-w-[18em]">
        <button
          onClick={() => setTab("Available")}
          className={`py-3 px-4 rounded-lg transition-colors duration-200 w-10/12
            ${
              tab === "Available"
                ? "bg-[#3A7327] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
        >
          Available
        </button>
      </div>
      <div className="sp-inputgroup min-w-[18em]">
        <button
          onClick={() => setTab("Unavailable")}
          className={`py-3 px-4 rounded-lg transition-colors duration-200 w-10/12
            ${
              tab === "Unavailable"
                ? "bg-[#C90017] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
        >
          Unavailable
        </button>
      </div>
    </div>
  </div>

      <div className="flex justify-start gap-8 p-10">
        {tab === "Available" &&
          filterItems(availableItems).map((data) => renderCard(data, true))}
        {tab === "Unavailable" &&
          filterItems(unavailableItems).map((data) => renderCard(data, false))}
      </div>

      <FinanceConnectPopup
        isOpen={isConnectPopupOpen}
        onClose={handleConnectClosePopup}
        onConfirm={handleConnectConfirm}
      />
    </div>
  );
};

export default SpAvailabilityPage;
