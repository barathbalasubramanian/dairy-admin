import React, { useState } from "react";
import FarmerIdPopup from "../components/FarmerIdPopup.jsx";
import "../static/css/FarmerTicketsTable.css";

const FarmerTicketsTable = (data) => {
  const [selectedSpId, setSelectedSpId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSpIdClick = (FarmerID) => {
    setSelectedSpId(FarmerID);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSpId(null);
  };

  return (
    <div className="farmer-tickets-table-container">
      <table className="farmer-tickets-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Ticket ID</th>
            <th>Ticket Start Date/Time</th>
            <th>Ticket Close Date/Time</th>
            <th>Service charge</th>
            <th>Farmer ID</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((ticket, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{ticket.ticketId}</td>
              <td>{ticket.startDate}</td>
              <td>{ticket.endDate}</td>
              <td>{ticket.treatmentPrice}</td>
              <td onClick={() => handleSpIdClick(ticket.farmerId)}>
                {ticket.farmerId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <FarmerIdPopup
          FarmerId={selectedSpId}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default FarmerTicketsTable;
