import React, { useState } from "react";
import SpIdPopup from "../components/SpIdPopup.jsx";
import "../static/css/FarmerTicketsTable.css";
import { useGlobalContext } from "../Context";

const FarmerTicketsTable = (farmer) => {
  console.log(farmer);
  const [selectedSpId, setSelectedSpId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSpIdClick = (spId) => {
    setSelectedSpId(spId);
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
            <th>Service Type</th>
            <th>SP ID</th>
          </tr>
        </thead>
        <tbody>
          { farmer.farmer.Tickets.length > 0 ? (
            farmer.farmer.Tickets.map((tickets, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{tickets.Ticket_id}</td>
                <td>
                  {tickets.Service_Start_date} {tickets.Service_Start_time}
                </td>
                <td>
                  {tickets.Service_End_date} {tickets.Service_End_time}
                </td>
                <td>{tickets.Type}</td>
                <td onClick={() => handleSpIdClick(tickets.SP_Id)}>
                  {tickets.SP_Id}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No tickets available</td>
            </tr>
          )}
        </tbody>
      </table>

      {showPopup && (
        <SpIdPopup spId={selectedSpId} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default FarmerTicketsTable;
