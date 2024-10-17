import React, { useEffect, useState } from "react";
import "../static/css/FeedOrder.css";
import { useGlobalContext } from "../Context";
import axios from "axios";

const FeedOrder = () => {
  const { feedOrderdata: globalFeedOrderData } = useGlobalContext();
  const [feedOrderData, setFeedOrderData] = useState(globalFeedOrderData);

  useEffect(() => {
    if (!globalFeedOrderData || !globalFeedOrderData.feeds) {
      const GetFeedOrderData = async () => {
        try {
          const baseURL = "https://test.quindltechnologies.com/";
          const res = await axios.get(`${baseURL}admin/farmers-feeds`);
          setFeedOrderData(res.data);
        } catch (error) {
          console.error("Error fetching feed order data:", error);
        }
      };
      GetFeedOrderData();
    }
  }, [globalFeedOrderData]);

  if (!feedOrderData || !feedOrderData.feeds) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feeds">
      <div className="feed-item">
        <div className="feed-title">Farmer</div>
        <div className="feed-value">{feedOrderData.totalFarmers}</div>
      </div>
      {feedOrderData.feeds.map((item, index) => (
        <div key={index} className="feed-item">
          <div className="feed-title">{item.Name}</div>
          <div className="feed-value">{item.totalQty}</div>
        </div>
      ))}
    </div>
  );
};

export default FeedOrder;
