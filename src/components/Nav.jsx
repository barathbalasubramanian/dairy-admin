import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../static/img/nav/logo.svg";
import datamanagement from "../static/img/nav/datamanagement.svg";
import feed from "../static/img/nav/feed.svg";
import finance from "../static/img/nav/finance.svg";
import usermanagement from "../static/img/nav/usermanagement.svg";
import ticket from "../static/img/nav/ticket.svg";
import sp from "../static/img/nav/sp.svg";
import settings from "../static/img/nav/settings.svg";
import arrow from "../static/img/nav/downarrow.svg";
import downarrow from "../static/img/nav/downarrow1.svg";
import "../static/css/nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  const dropdownRef = useRef(null);

  const dropdownPaths = {
    Farmer: "/FarmerPage",
    VLCC: "/VLCCPage",
    BMC: "/BMCPage",
    Cluster: "/ClusterPage",
    "Call Centre Executive": "/CallCentreExecutivePage",
    "Service Provider": "/ServiceProviderPage",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemClick = (text) => {
    setSelectedData(text);
    navigate(dropdownPaths[text]);
    setDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const isDataManagementActive = () => {
    return dropdownPaths[selectedData] && isActive(dropdownPaths[selectedData]);
  };

  return (
    <>
      <div className="nav-container">
        <div className="nav-box">
          <div className="nav-head">
            <img className="logoimg" src={logo} alt="Logo" />
          </div>
          <div className="nav-admin">
            <div className="admin-container">
              <div className="admin-content">
                <p className="admin-name">Krishna</p>
                <p className="admin-type">Super Admin</p>
                <p className="admin-id">Emp ID: DD0045</p>
              </div>
              <div
                className="admin-setting"
                onClick={() => navigate("/AdminsettingsPage")}
              >
                <p>
                  <img src={settings} alt="settings" />
                  Manage Profile
                  <img className="downarrow" src={downarrow} alt="" />
                </p>
              </div>
            </div>
          </div>
          <div className="nav-body">
            <ul>
              <li>
                <div
                  className={
                    isActive("/") || isDataManagementActive()
                      ? "nav-ite active"
                      : "nav-ite"
                  }
                  onClick={handleDropdownToggle}
                >
                  <img alt="Data Management" src={datamanagement} />
                  <p>
                    {selectedData || "Data Management"}{" "}
                    <img className="arrow" alt="Arrow" src={arrow} />
                  </p>
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu" ref={dropdownRef}>
                    {Object.keys(dropdownPaths).map((text) => (
                      <li key={text}>
                        <button
                          className={
                            selectedData === text ? "active-dropdown-item" : ""
                          }
                          onClick={() => handleDropdownItemClick(text)}
                        >
                          {text}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <div
                  onClick={() => navigate("/FeedOrderPage")}
                  className={
                    isActive("/FeedOrderPage") ? "nav-ite active" : "nav-ite"
                  }
                >
                  <img alt="Feed Order" src={feed} />
                  <p>Feed Order</p>
                </div>
              </li>
              <li>
                <div
                  onClick={() => navigate("/FeedManagementPage")}
                  className={
                    isActive("/FeedManagementPage")
                      ? "nav-ite active"
                      : "nav-ite"
                  }
                >
                  <img alt="Feed Management" src={feed} />
                  <p>Feed Management</p>
                </div>
              </li>
              <li>
                <div
                  onClick={() => navigate("/TicketCenterPage")}
                  className={
                    isActive("/TicketCenterPage") ? "nav-ite active" : "nav-ite"
                  }
                >
                  <img alt="Ticket Center" src={ticket} />
                  <p>Ticket Center</p>
                </div>
              </li>
              <li>
                <div
                  onClick={() => navigate("/FinanceRequirementPage")}
                  className={
                    isActive("/FinanceRequirementPage")
                      ? "nav-ite active"
                      : "nav-ite"
                  }
                >
                  <img alt="Finance Requirement" src={finance} />
                  <p>Finance Requirement</p>
                </div>
              </li>
              <li>
                <div
                  onClick={() => navigate("/UserManagementPage")}
                  className={
                    isActive("/UserManagementPage")
                      ? "nav-ite active"
                      : "nav-ite"
                  }
                >
                  <img alt="User Management" src={usermanagement} />
                  <p>User Management</p>
                </div>
              </li>
              <li>
                <div
                  onClick={() => navigate("/SpAvailabilityPage")}
                  className={
                    isActive("/SpAvailabilityPage")
                      ? "nav-ite active"
                      : "nav-ite"
                  }
                >
                  <img alt="SP Availability" src={sp} />
                  <p>SP Availability</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
