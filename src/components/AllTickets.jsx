import React, { useState } from "react";
import "../static/css/AllTickets.css";
import { useGlobalContext } from "../Context";
import { ArrowLeft } from "react-feather";

const AllTickets = ({ handleBack }) => {
  const { AllTicket = {} } = useGlobalContext(); // Ensure fallback to avoid errors

  const [activeStep, setActiveStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const steps = ["Live", "Pending Approval", "Completed"];
  const stepKeys = ["live", "pendingApproval", "completed"];

  // Filter Logic
  const filteredTickets =
    AllTicket[stepKeys[activeStep - 1]]?.filter((ticket) => {
      const assignedDate = new Date(ticket.assignedDateTime);
      const [filterYear, filterMonth] = selectedDate
        ? selectedDate.split("-")
        : [null, null];

      if (
        filterMonth &&
        filterYear &&
        (assignedDate.getMonth() + 1 !== parseInt(filterMonth) ||
          assignedDate.getFullYear() !== parseInt(filterYear))
      ) {
        return false;
      }
      if (typeFilter && ticket.serviceType !== typeFilter) return false;
      return true;
    }) || [];

  const sortedTickets = [...filteredTickets];
  if (sortOrder === "desc") {
    sortedTickets.reverse();
  }

  const handleClearFilters = () => {
    setSelectedDate("");
    setTypeFilter("");
    setSortOrder("asc");
  };

  return (
    <div className="all-tickets">
      <div className="flex items-center mb-4">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft />
          <span>Back</span>
        </button>
      </div>
      <div className="progress-bar-container w-full">
        <div className="grid grid-cols-3 gap-4 w-full" style={{padding:"0"}}>
          {steps.map((label, index) => (
            <button
              key={index}
              className={`
          py-3 px-4 rounded-lg transition-colors
          ${
            activeStep === index + 1
              ? index === 0
                ? "bg-[#1155CA] text-white"
                : index === 1
                ? "bg-[#EDBD05] text-white"
                : "bg-[#3A7327] text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }
        `}
              onClick={() => setActiveStep(index + 1)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col mb-8">
        <div className="w-full grid grid-cols-4 gap-2 p-4 bg-gray-100 rounded-lg shadow-md">
          <input
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />

          <div className="border border-gray-300 px-2 bg-white">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-2 border-none outline-none rounded-md w-full"
            >
              <option value="">All Types</option>
              <option value="Veterinary">Veterinary</option>
              <option value="AI">AI</option>
              <option value="Feed">Feed</option>
              <option value="Insurance">Insurance</option>
              <option value="Loan">Loan</option>
            </select>
          </div>

          <div className="border border-gray-300 px-2 bg-white">
            <select

              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 rounded-md w-full"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className="py-2 px-4 rounded-md w-full border-[#4695b8] border-2 text-[#4695b8]"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="all-tickets-container">
        <div className="all-tickets-section">
          <h3 className="mb-4">Assigned</h3>
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
              {sortedTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>
                    {sortOrder === "asc"
                      ? index + 1
                      : filteredTickets.length - index}
                  </td>
                  <td>{ticket.ticketNumber}</td>
                  <td>{ticket.formerID}</td>
                  <td>{ticket.serviceType}</td>
                  <td>
                    {new Date(ticket.assignedDateTime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </td>
                  <td>{ticket.assignedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
