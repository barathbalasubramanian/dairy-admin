import React from "react";
import "../static/css/Tickets.css";
import { useGlobalContext } from "../Context";

const Tickets = () => {
  const { TicketCount = {} } = useGlobalContext(); // Fallback to avoid undefined errors

  const items = [
    { title: "Call Centre Executive", value: TicketCount.staffCount || 0 },
    { title: "Live Tickets", value: TicketCount.liveCount || 0 },
    { title: "Pending Approvals", value: TicketCount.pendingCount || 0 },
    {
      title: "Live AI Tickets",
      value:
        (TicketCount.ai?.low || 0) +
        (TicketCount.ai?.mid || 0) +
        (TicketCount.ai?.high || 0),
    },
    {
      title: "Live VET Tickets",
      value:
        (TicketCount.vet?.low || 0) +
        (TicketCount.vet?.mid || 0) +
        (TicketCount.vet?.high || 0),
    },
    { title: "Live Financial Requirement", value: TicketCount.financial || 0 },
    { title: "Live Feed Tickets", value: TicketCount.feed || 0 },
    { title: "Completed", value: TicketCount.completed || 0 },
  ];

  return (
    <div className="tickets">
      {items.map((item) => (
        <div key={item.title} className="ticket-item">
          <div className="ticket-title">{item.title}</div>
          <div className="ticket-value">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
