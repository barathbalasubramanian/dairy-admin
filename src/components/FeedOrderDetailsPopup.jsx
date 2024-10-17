import React from "react";
import close_button from "../static/img/close-button.svg";
import "../static/css/FeedOrderDetailsPopup.css";
import { useGlobalContext } from "../Context";

const FeedOrderDetailsPopup = ({ farmerId, onClose }) => {
  const { detailFarmerhis } = useGlobalContext();
  const farmerData = detailFarmerhis.find((item) => item.farmerId === farmerId);
  const status0Orders = farmerData.feedOrders.filter(
    (order) => order.Status === 0
  );
  const status1Orders = farmerData.feedOrders.filter(
    (order) => order.Status === 1
  );

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  };

  const formatOrderData = (orders) => {
    return orders.map((order) => ({
      date: formatDate(order.orderDate),
      products: order.items.map(
        (item) => `${item.itemName} x ${item.quantity}`
      ),
      vlccLocation: farmerData.vlccName,
      totalPrice: `Rs. ${order.totalPrice}`,
      isCurrent: order.Status === 0,
    }));
  };

  const formattedStatus0Orders = formatOrderData(status0Orders);
  const formattedStatus1Orders = formatOrderData(status1Orders);

  return (
    <div className="feed-order-details-popup">
      <div className="feed-order-details-content">
        <button className="feed-close-button" onClick={onClose}>
          <img src={close_button} />
        </button>
        <p className="formerid">#{farmerId}</p>
        <div className="feed-order-section">
          <h3>Current Order</h3>
          <div className="feed-order-scrollable">
            {" "}
            {/* Added scrollable div */}
            {formattedStatus0Orders.map((orders, index) => (
              <div className="feed-order-card" key={index}>
                <div className="feed-order-date">
                  <p>{orders.date}</p>
                </div>
                <div className="feed-order-info">
                  <p className="feed-products">
                    <strong>Products</strong>
                    {orders.products.map((product, index) => (
                      <span key={index}>{product}</span>
                    ))}
                  </p>
                  <p className="feed-vlcc-location">
                    <strong>VLCC Location</strong> <br />
                    <span>{orders.vlccLocation}</span>
                  </p>
                  <p className="feed-tot-price">
                    <strong>Total Price</strong> <br />
                    <span>{orders.totalPrice}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="feed-order-section">
          <h3>Previous Orders</h3>
          <div className="feed-order-scrollable">
            {formattedStatus1Orders.map((order, index) => (
              <div key={index} className="feed-order-card">
                <div className="feed-order-date">
                  <p>{order.date}</p>
                </div>
                <div className="feed-order-info">
                  <p className="feed-products">
                    <strong>Products</strong>
                    <br />
                    {order.products.map((product, i) => (
                      <span key={i}>{product}</span>
                    ))}
                  </p>
                  <p className="feed-vlcc-location">
                    <strong>VLCC Location</strong>
                    <br /> <span>{order.vlccLocation}</span>
                  </p>
                  <p className="feed-tot-price">
                    <strong>Total Price</strong>
                    <br /> <span>{order.totalPrice}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedOrderDetailsPopup;
