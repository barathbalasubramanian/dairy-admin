import React, { useState } from "react";
import FarmerIdPopup from "../components/FarmerIdPopup.jsx";
import "../static/css/FarmerTicketsTable.css";

const FarmerTicketsTable = (data) => {
  const [selectedSpId, setSelectedSpId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const tickets = [
    {
      sNo: 1,
      ticketId: "DJ875GH",
      startDateTime: "May 5th, 2024 10.00 AM",
      closeDateTime: "May 6th, 2024 4.00 PM",
      serviceCharge: 700,
      FarmerId: "DD87JI65",
    },
    {
      sNo: 2,
      ticketId: "HH8740L",
      startDateTime: "Apr 28th, 2024 4.00 PM",
      closeDateTime: "Apr 29th, 2024 11.00 AM",
      serviceCharge: 650,
      FarmerId: "DD8LKO5",
    },
    {
      sNo: 3,
      ticketId: "HKK897K",
      startDateTime: "Mar 19th, 2024 10.00 AM",
      closeDateTime: "Mar 20th, 2024 4.00 PM",
      serviceCharge: 800,
      FarmerId: "DDLJ2301",
    },
    {
      sNo: 4,
      ticketId: "HGB90JH",
      startDateTime: "Feb 14th, 2024 3.00 PM",
      closeDateTime: "Feb 14th, 2024 4.00 PM",
      serviceCharge: 570,
      FarmerId: "DDLJ8765",
    },
  ];

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
          {data.map((ticket, index) => (
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
