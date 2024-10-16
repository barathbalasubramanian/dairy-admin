import React, { useEffect } from "react";
import close_button from "../static/img/close-button.svg";
import "../static/css/CowManagementPopup.css";
import { useGlobalContext } from "../Context";

const CowManagementPopup = ({ isOpen, onClose, cowList = [] }) => {
  const { getcowbyid,cow } = useGlobalContext();
  if(cow===undefined){
    return <div></div>
  }
  if (!isOpen) return null;

  

  const handleShowCow = (cow) => {
    console.log(`Viewing service for cow ${cow.id}`);
  };

  return (
    <div className="cow-management-popup-overlay">
      <div className="cow-management-popup-content">
        <button className="close-button" onClick={onClose}>
        <img src={close_button} alt="Close" />
        </button>
        <div className="formerdetail-cow">
          <table>
            <thead>
              <tr>
                <th>Cow ID</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Service</th>
              </tr>
            </thead>
            <tbody>
              {cow.length > 0 ? (
                cow.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Cow_id}</td>
                    <td>{item.Breed}</td>
                    <td>
                      {item.Cow_age_year} Year, {item.Cow_age_month} Month
                    </td>
                    <td>
                      <button onClick={() => handleShowCow(item)}>
                        View Service
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No cows available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CowManagementPopup;
