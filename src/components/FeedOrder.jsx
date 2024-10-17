import React from "react";
import "../static/css/FeedOrder.css";
import { useGlobalContext } from "../Context";

const FeedOrder = () => {
  const { feedOrderdata } = useGlobalContext();

  return (
    <>
      <div className="feeds">
        <div className="feed-item">
          <div className="feed-title">Farmer</div>
          <div className="feed-value">{feedOrderdata.totalFarmers}</div>
        </div>
        {feedOrderdata.feeds.map((item, index) => (
          <div key={index} className="feed-item">
            <div className="feed-title">{item.Name}</div>
            <div className="feed-value">{item.totalQty}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeedOrder;
