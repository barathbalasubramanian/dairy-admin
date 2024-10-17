import React, { useState } from "react";
import "../static/css/AllTickets.css";
import { useGlobalContext } from "../Context";
import { ArrowLeft } from 'react-feather';
const AllTickets = ({ handleBack }) => {
  const { AllTicket } = useGlobalContext();

  const [activeStep, setActiveStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const steps = ["Live", "Pending Approval", "Completed"];
  const stepKeys = ["live", "pendingApproval", "completed"];

  // Filter Logic
  const filteredTickets = AllTicket[stepKeys[activeStep - 1]]
    .filter((ticket) => {
      const assignedDate = new Date(ticket.assignedDateTime);
      const [filterYear, filterMonth] = selectedDate ? selectedDate.split('-') : [null, null];

      if (filterMonth && filterYear &&
        (assignedDate.getMonth() + 1 !== parseInt(filterMonth) ||
          assignedDate.getFullYear() !== parseInt(filterYear))) {
        return false;
      }
      if (typeFilter && ticket.serviceType !== typeFilter) return false;
      return true;
    });

  // Generate S.No based on filtered tickets, sort only the S.No
  const sortedTickets = [...filteredTickets];
  if (sortOrder === 'desc') {
    sortedTickets.reverse();  // Reverse for descending order
  }

  const handleClearFilters = () => {
    setSelectedDate('');
    setTypeFilter('');
    setSortOrder('asc');
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
      <div className="progress-bar-container w-full p-4">
  <div className="progress-bar grid grid-cols-3 gap-4 w-full">
    {steps.map((label, index) => (
      <button
        key={index}
        className={`
          py-3 px-4 rounded-lg transition-colors
          ${activeStep === index + 1
            ? index === 0
              ? "bg-blue-500 text-white"
              : index === 1
              ? "bg-yellow-500 text-white"
              : "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
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
  <div className="font-medium text-lg mb-2">Filter :</div>
  <div className="w-full grid grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
    <input
      type="month"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full"
    />
    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full"
    >
      <option value="">All Types</option>
      <option value="Veterinary">Veterinary</option>
      <option value="AI">AI</option>
      <option value="Feed">Feed</option>
      <option value="Insurance">Insurance</option>
      <option value="Loan">Loan</option>
    </select>
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="p-2 border border-gray-300 rounded-md w-full"
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <button
      onClick={handleClearFilters}
      className="bg-red-500 text-white py-2 px-4 rounded-md w-full"
    >
      Clear Filters
    </button>
  </div>
</div>


      {/* Tickets Table */}
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
              {sortedTickets.map((ticket, index) => (
                <tr key={index}>
                  <td>{sortOrder === 'asc' ? index + 1 : filteredTickets.length - index}</td>
                  <td>{ticket.ticketNumber}</td>
                  <td>{ticket.formerID}</td>
                  <td>{ticket.serviceType}</td>
                  <td>{ticket.assignedDateTime}</td>
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
