import React, { useState } from "react";
import FeedManagement from "../components/FeedCard.jsx";
import EditPopup from "../components/FeedEditPopup.jsx";
import AddPopup from "../components/FeedAddPopup.jsx"; 
import "../static/css/FeedManagementPage.css";
import { useGlobalContext } from "../Context";

const FeedManagementPage = () => {
  const { feed, editFeed, addFeed } = useGlobalContext();
  
  const [activeTab, setActiveTab] = useState("Feed");
  const [feedCardsData,setFeedCardsData] = useState(feed.filter(
    (item) => item.Type === 0
  ));
  const [supplementaryCardsData, setSupplementaryCardsData] = useState(feed.filter(
    (item) => item.Type === 1
  ));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const pageCount = Math.ceil(
    (activeTab === "Feed"
      ? feedCardsData.length
      : supplementaryCardsData.length) / itemsPerPage
  );
  const [editingCard, setEditingCard] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleAddCard = (newCard) => {
    if (activeTab === "Feed") {
      addFeed(newCard.title,newCard.price,0,newCard.Manufacturer);
      setFeedCardsData([...feedCardsData, newCard]);
    } else {
      addFeed(newCard.title,newCard.price,1,newCard.Manufacturer);
      setSupplementaryCardsData([...supplementaryCardsData, newCard]);
    }
  };

  const handleEditCard = (updatedCard) => {
    editFeed(updatedCard.Feed_id,updatedCard.Name,updatedCard.Price,updatedCard.Type,updatedCard.Manufacturer)
    if (activeTab === "Feed") {
      setFeedCardsData(
        feedCardsData.map((card) =>
          card.Feed_id === updatedCard.Feed_id ? updatedCard : card
        )
      );
    } else {
      setSupplementaryCardsData(
        supplementaryCardsData.map((card) =>
          card.Feed_id === updatedCard.Feed_id ? updatedCard : card
        )
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openEditModal = (card) => {
    setEditingCard(card);
    setIsEditModalOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    activeTab === "Feed"
      ? feedCardsData.slice(indexOfFirstItem, indexOfLastItem)
      : supplementaryCardsData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="feed-management">
        <div className="add-button">
          <button
            className="add-button"
            onClick={() => setIsAddModalOpen(true)}
          >
            <span>+</span>Add
          </button>
        </div>
        <div className="feed-tab-container">
          <div
            className={`feed-tab ${
              activeTab === "Feed" ? "feed-tabactive" : ""
            }`}
            onClick={() => handleTabClick("Feed")}
          >
            Feed
          </div>
          <div
            className={`feed-tab ${
              activeTab === "Supplementary" ? "feed-tabactive" : ""
            }`}
            onClick={() => handleTabClick("Supplementary")}
          >
            Supplementary
          </div>
        </div>
        <AddPopup
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddCard={handleAddCard}
          tab={activeTab}
        />
        <EditPopup
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEditCard={handleEditCard}
          cardData={editingCard}
        />
        <div className="feeds-card">
          {currentItems.map((card, index) => (
            <FeedManagement
              key={card.Feed_id}
              title={card.Name}
              Manufacturer={card.Manufacturer}
              price={card.Price}
              onEdit={() => openEditModal(card)}
            />
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {[...Array(pageCount).keys()].map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number + 1)}
              className={currentPage === number + 1 ? "active" : ""}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(pageCount)}
            disabled={currentPage === pageCount}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedManagementPage;
