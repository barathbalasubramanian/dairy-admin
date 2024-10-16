import React, { useState } from "react";
import "../static/css/AllTickets.css";
import { useGlobalContext } from "../Context";


const AllTickets = ({ handleBack }) => {
  const { AllTicket } = useGlobalContext();

  const [activeStep, setActiveStep] = useState(1);

  const steps = ["Live", "Pending Approval", "Completed"];

  const stepKeys = ["live", "pendingApproval", "completed"];

  return (
    <>
      <div className="all-tickets">
        <div className="progress-bar-container">
          <div className="progress-bar">
            {steps.map((label, index) => (
              <div
                key={index}
                className={`progress-bar-step ${
                  activeStep === index + 1 ? "progress-bar-active" : ""
                }`}
                onClick={() => setActiveStep(index + 1)}
              >
                <div
                  className={`progress-bar-circle ${
                    activeStep === index + 1 ? "progress-bar-active" : ""
                  }`}
                >
                  {activeStep === index + 1 ? "•" : ""}
                </div>
                <div
                  className={`progress-bar-label ${
                    activeStep === index + 1 ? "progress-bar-active-label" : ""
                  }`}
                >
                  {label}
                </div>
              </div>
            ))}
            <div
              className="progress-bar-indicator"
              style={{
                width: `${40 / steps.length}%`,
                left: `calc(${(activeStep - 1) * (127 / steps.length) - 5}% + ${
                  0 / steps.length + 8 / 2
                }%)`,
              }}
            ></div>
          </div>
          <div className="progress-bar-line"></div>
        </div>
        <div className="all-tickets-container">
          <div className="all-tickets-section">
            <h3>Assigned</h3>
            <table className="all-tickets-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Ticket Number</th>
                  <th>Farmer ID</th>
                  <th>Service Type</th>
                  <th>Assigned Date & Time</th>
                  <th>Assigned By</th>
                </tr>
              </thead>
              <tbody>
                {AllTicket[stepKeys[activeStep - 1]].map(
                  (ticket, index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{ticket.ticketNumber}</td>
                      <td>{ticket.formerID}</td>
                      <td>{ticket.serviceType}</td>
                      <td>{ticket.assignedDateTime}</td>
                      <td>{ticket.assignedBy}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTickets;
