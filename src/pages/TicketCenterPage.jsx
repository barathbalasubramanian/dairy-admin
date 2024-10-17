import React, { useState } from "react";
import Tickets from "../components/Tickets.jsx";
import AllTickets from "../components/AllTickets.jsx";
import "../static/css/TicketCenterPage.css";
import { useGlobalContext } from "../Context";

const TicketCenterPage = () => {
  const { TicketCount } = useGlobalContext();

  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const handleViewOrder = () => {
    setShowTicketDetails(true);
  };

  const handleBack = () => {
    setShowTicketDetails(false);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
      <div className="ticket-center">
        <div className="call-center">
          
        </div>
        {!showTicketDetails && (
          <div className="ticket-center-content">
            <Tickets />
            <div className="view-button">
              <button className="view-all-button" onClick={handleViewOrder}>
                View All Tickets <span className="arrow">›</span>
              </button>
            </div>
          </div>
        )}
        {showTicketDetails && <AllTickets handleBack={handleBack} />}
      </div>
    </>
  );
};

export default TicketCenterPage;
