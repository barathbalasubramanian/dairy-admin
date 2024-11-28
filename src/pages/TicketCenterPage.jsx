import React, { useState } from "react";
import Tickets from "../components/Tickets.jsx";
import AllTickets from "../components/AllTickets.jsx";
import "../static/css/TicketCenterPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";
import { ArrowRight, MoveRight } from "lucide-react";

const TicketCenterPage = () => {
  const { TicketCount = 0 } = useGlobalContext();

  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useAuth(() => setIsAuthChecked(true));

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  const handleViewOrder = () => setShowTicketDetails(true);
  const handleBack = () => setShowTicketDetails(false);

  return (
    <div className="ticket-center">
      {!showTicketDetails ? (
        <div className="ticket-center-content">
          <Tickets />
          <div className="view-button">
            <button className="view-all-button" onClick={handleViewOrder} style={{backgroundColor:"#4695b8"}} >
              View All Tickets <span className="arrow"> <ArrowRight/> </span>
            </button>
          </div>
        </div>
      ) : (
        <AllTickets handleBack={handleBack} />
      )}
    </div>
  );
};

export default TicketCenterPage;
