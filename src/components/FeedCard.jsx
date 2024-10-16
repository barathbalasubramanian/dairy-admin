import React from "react";
import edit from "../static/img/edit-img.svg";

const FeedCard = ({ title, Manufacturer, price, onEdit }) => {
  return (
    <div className="feed-card">
      <div className="card-content">
        <p>{title}</p>
        <p>{Manufacturer}</p>
        <p>{price}</p>
      </div>
      <div className="card-footer">
        <button className="edit-button" onClick={onEdit}>
          Edit <img src={edit} className="edit-icon" />
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
