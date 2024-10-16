import React from "react";
import "../static/css/Tickets.css";
import { useGlobalContext } from "../Context";

const Tickets = () => {
  const { TicketCount } = useGlobalContext();
  const items = [
    { title: "Call Centre Executive", value: TicketCount.staffCount },
    { title: "Live Tickets", value: TicketCount.liveCount },
    { title: "Pending Approvals", value: TicketCount.pendingCount },
    { title: "Live AI Tickets", value: (TicketCount.ai.low+TicketCount.ai.mid+TicketCount.ai.high) },
    { title: "Live VET Tickets", value: (TicketCount.vet.low+TicketCount.vet.mid+TicketCount.vet.high) },
    { title: "Live Financial Requirement", value: TicketCount.financial },
    { title: "Live Feed Tickets", value: TicketCount.feed },
    { title: "Completed", value: TicketCount.completed },
  ];

  return (
    <>
      <div className="tickets">
        {items.map((item, index) => (
          <div key={index} className="ticket-item">
            <div className="ticket-title">{item.title}</div>
            <div className="ticket-value">{item.value}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tickets;
