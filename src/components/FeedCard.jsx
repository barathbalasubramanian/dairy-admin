import React from "react";
import edit from "../static/img/edit-img.svg";

const FeedCard = ({ title, Manufacturer, price, onEdit }) => {
  return (
    <div className="feed-card text-center w-[295px]">
      <div className="card-content ">
        <p className="text-center font-bold">{title}</p>
        <p className="text-center font-bold ">{Manufacturer}</p>
        <p className="flex justify-center">{price}</p>
      </div>
      <div className="card-footer text-center">
        <button className="edit-button flex items-center justify-center" onClick={onEdit}>
          Edit <img src={edit} className="edit-icon ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FeedCard;