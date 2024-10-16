import React from "react";
import mail from "../static/img/email.svg";
import phone from "../static/img/phone.svg";
import close_button from "../static/img/close-button.svg";
import "../static/css/SpIdPopup.css";
import { useGlobalContext } from "../Context";
import { all } from "axios";

const SpIdPopup = ({ spId, onClose }) => {
  console.log(spId)
  const { alldoc } = useGlobalContext();
  console.log(alldoc)

  const data = alldoc.filter(doc => doc.doctorId == spId);
  console.log(data)

  const spDetails = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9835194630",
    vlcc: "VLCC123",
  };

  return (
    <div className="sp-id-popup">
      <div className="sp-id-popup-content">
        <button className="sp-id-popup-close-button" onClick={onClose}>
          <img src={close_button} alt="" />
        </button>
        <div className="sp-id-popup-body">
          <div className="sp-id-popup-header">
            <div className="sp-id-popup-row">{spId}</div>
            <div className="sp-id-popup-row">{data[0].doctorName}</div>
          </div>
          <div className="sp-id-popup-subheader">
            <div className="sp-id-popup-row">
              <img src={mail} alt="" />
              <span>: </span> {data[0].email}
            </div>
            <div className="sp-id-popup-row">
              <img src={phone} alt="" />
              <span>: </span> {data[0].phone}
            </div>
            <div className="sp-id-popup-row">
              <p>VLCC</p>
              <span>:</span> {data[0].vlccPersonName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpIdPopup;
