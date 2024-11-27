import React, { useState, useEffect } from "react";
import FeedManagement from "../components/FeedCard.jsx";
import EditPopup from "../components/FeedEditPopup.jsx";
import AddPopup from "../components/FeedAddPopup.jsx";
import "../static/css/FeedManagementPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";

const FeedManagementPage = () => {
  const { feed = [], editFeed, addFeed } = useGlobalContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [activeTab, setActiveTab] = useState("Feed");
  const [feedCardsData, setFeedCardsData] = useState([]);
  const [supplementaryCardsData, setSupplementaryCardsData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    setFeedCardsData(feed.filter((item) => item.Type === 0));
    setSupplementaryCardsData(feed.filter((item) => item.Type === 1));
  }, [feed]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddCard = (newCard) => {
    if (activeTab === "Feed") {
      addFeed(newCard.title, newCard.price, 0, newCard.Manufacturer);
      setFeedCardsData([...feedCardsData, newCard]);
    } else {
      addFeed(newCard.title, newCard.price, 1, newCard.Manufacturer);
      setSupplementaryCardsData([...supplementaryCardsData, newCard]);
    }
  };

  const handleEditCard = (updatedCard) => {
    editFeed(
      updatedCard.Feed_id,
      updatedCard.Name,
      updatedCard.Price,
      updatedCard.Type,
      updatedCard.Manufacturer
    );
    const updateData = (cards) =>
      cards.map((card) =>
        card.Feed_id === updatedCard.Feed_id ? updatedCard : card
      );

    if (activeTab === "Feed") {
      setFeedCardsData(updateData(feedCardsData));
    } else {
      setSupplementaryCardsData(updateData(supplementaryCardsData));
    }
  };

  const openEditModal = (card) => {
    setEditingCard(card);
    setIsEditModalOpen(true);
  };

  useAuth(() => setIsAuthChecked(true));

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feed-management">
      <div className="add-button">
        <button onClick={() => setIsAddModalOpen(true)}>
          <span>+</span>Add
        </button>
      </div>
      <div className="flex gap-10 w-fit m-auto">
        <div
          className={`py-2 px-6 text-center min-w-[14em] cursor-pointer rounded-lg ${
            activeTab === "Feed" ? "bg-[#4695b8] text-white shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => handleTabClick("Feed")}
        >
          Feed
        </div>
        <div
          className={`py-2 px-6 text-center min-w-[14em] cursor-pointer rounded-lg ${
            activeTab === "Supplementary"  ? "bg-[#4695b8] text-white shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-100"
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
      <div className="feeds-card ">
        {(activeTab === "Feed" ? feedCardsData : supplementaryCardsData).map(
          (card) => (
            <FeedManagement
              key={card.Feed_id}
              title={card.Name}
              manufacturer={card.Manufacturer}
              price={card.Price}
              onEdit={() => openEditModal(card)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default FeedManagementPage;
