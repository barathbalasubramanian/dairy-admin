import React, { useState } from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import phone_button from "../static/img/phone_button.svg";
import FinanceConnectPopup from "../components/FinanceConnectPopup.jsx";
import "../static/css/SpAvailabilityPage.css";
import { useGlobalContext } from "../Context";

const SpAvailabilityPage = () => {
  const { sp } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("Available");
  const [isConnectPopupOpen, setIsConnectPopupOpen] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  const handleConnectClick = (farmer) => {
    setIsConnectPopupOpen(true);
  };

  const handleConnectConfirm = () => {
    console.log(`Confirmed connection`);
    setIsConnectPopupOpen(false);
  };

  const handleConnectClosePopup = () => {
    setIsConnectPopupOpen(false);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderCard1 = (data, index) => (
    <div key={index} className="sp-card">
      <div className="sp-card-header">
        <div className="sp-card-idname">
          <div className="sp-card-id">{data.Doctor_id}</div>
          <div className="sp-card-name">{data.Name}</div>
        </div>
        <div className="sp-status available">Available</div>
      </div>
      <div className="sp-card-subhead">
        <div className="sp-card-subhead-detail">
          <span>Cluster</span>
          {data.ClusterName}
        </div>
        {data.Type === 1 ? (
          <div className="sp-card-subhead-detail">
            <span>Specialist</span>AI
          </div>
        ) : (
          <div className="sp-card-subhead-detail">
            <span>Specialist</span>Veterinary
          </div>
        )}
      </div>
      <div className="sp-card-body">
        <div className="sp-card-detail">
          <img src={mail} alt="" />
          <span>: </span>
          {data.Email}
        </div>
        <div className="sp-card-detail">
          <img src={phone} alt="" />
          <span>: </span>
          {data.Phno}
        </div>
      </div>
      {data.status !== "Unavailable" && (
        <div className="sp-card-footer">
          <button
            className="connect-button"
            onClick={() => handleConnectClick()}
          >
            Connect
            <img src={phone_button} alt="" />
          </button>
        </div>
      )}
    </div>
  );

  const renderCard2 = (data, index) => (
    <div key={index} className="sp-card">
      <div className="sp-card-header">
        <div className="sp-card-idname">
          <div className="sp-card-id">{data.Doctor_id}</div>
          <div className="sp-card-name">{data.Name}</div>
        </div>
        <div className="sp-status unavailable">
          Available On {formatDate(data.Availableon)}
        </div>
      </div>
      <div className="sp-card-subhead">
        <div className="sp-card-subhead-detail">
          <span>Cluster</span>
          {data.ClusterName}
        </div>
        {data.Type === 1 ? (
          <div className="sp-card-subhead-detail">
            <span>Specialist</span>AI
          </div>
        ) : (
          <div className="sp-card-subhead-detail">
            <span>Specialist</span>Veterinary
          </div>
        )}
      </div>
      <div className="sp-card-body">
        <div className="sp-card-detail">
          <img src={mail} alt="" />
          <span>: </span>
          {data.Email}
        </div>
        <div className="sp-card-detail">
          <img src={phone} alt="" />
          <span>: </span>
          {data.Phno}
        </div>
        <div className="sp-card-comment">
          <span>Comment</span>
          <p className="textarea">{data.Reason}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="sp-availability-page">
      <div className="sp-tab-container">
        <div
          className={`sp-tab ${activeTab === "Available" ? "spactive" : ""}`}
          onClick={() => handleTabClick("Available")}
        >
          Available
        </div>
        <div
          className={`sp-tab ${activeTab === "Unavailable" ? "spactive" : ""}`}
          onClick={() => handleTabClick("Unavailable")}
        >
          Unavailable
        </div>
      </div>

      <div className="sp-card-container">
        {activeTab === "Available" && sp.Availabe.map(renderCard1)}
        {activeTab === "Unavailable" && sp.UnAvailable.map(renderCard2)}
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
