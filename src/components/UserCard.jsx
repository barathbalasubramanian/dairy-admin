import React from "react";
import active_img from "../static/img/active.svg";
import unactive_img from "../static/img/unactive.svg";

const UserCard = ({ user, onViewMore }) => {
  return (
    <div className="user-card ">
      <div className="user-info p-8">
        <div className="user-contents ">
          <p className="user-text m-2">Name</p> <p className="colon">:</p> <p className="user-values">{user.name}</p>
        </div>
        <div className="user-contents">
          <p className="user-text m-2">User ID</p><p className="colon">:</p>
          <p className="user-values">{user.adminId}</p>
        </div>
        <div className="user-contents m-2">
          <p className="user-text">Status</p> <p className="colon">:</p>
          <p className="user-values">
            {user.user == 0 ? <>Un-Active <img src={unactive_img} alt="" /></> : <>Active <img src={active_img} alt="" /></>}
          </p>
        </div>
      </div>
      <button className="view-more-button" onClick={() => onViewMore(user)}>
        View More
      </button>
    </div>
  );
};

export default UserCard;
