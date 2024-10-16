import React, { useState } from "react";
import UserCard from "../components/UserCard.jsx";
import UserDetailPopup from "../components/UserDetailPopup.jsx";
import CreateUserPopup from "../components/CreateUserPopup.jsx";
import AddAdminUser from "../components/AddAdminUser.jsx";
import active_img from "../static/img/active.svg";
import unactive_img from "../static/img/unactive.svg";
import "../static/css/UserManagementPage.css";
import { useGlobalContext } from "../Context"; 


const UserManagementPage = () => {
  const { admin,addAdmin} = useGlobalContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateUserPopupOpen, setIsCreateUserPopupOpen] = useState(false);
  const [isAddUser,setISAddUser] = useState(false);
  const [newUser,setNewUser] = useState(); 
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const handleViewMore = (user) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const handleAdduserpopupoff = () => {
    setISAddUser(false);
  }

  const handleCreateUserClick = () => {
    setISAddUser(true);
  };

  const handleCloseCreateUserPopup = () => {
    setIsCreateUserPopupOpen(false);
  };

  const handlesavenewuser = (name, type, mail, phno) =>{
    setNewUser({
      name:name,
      type:type,
      mail:mail,
      phno:phno
    })
    setIsCreateUserPopupOpen(true)
    setISAddUser(false)
  }

  const handleCreateUser = async (sendEmail) => {
    await addAdmin(newUser.name, newUser.mail, newUser.phno, "new", newUser.type);
    console.log("User created, send email:", sendEmail);
    setIsCreateUserPopupOpen(false);
  };

  const pageCount = Math.ceil(admin.length / usersPerPage);

  const currentUsers = admin.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="User-Management">
        <div className="user-add-button">
          <button onClick={handleCreateUserClick}>
            <span>+</span>Create New User
          </button>
        </div>
        <div className="user-cards">
          {currentUsers.map((user, index) => (
            <UserCard key={index} user={user} onViewMore={handleViewMore} />
          ))}
        </div>
        {selectedUser && (
          <UserDetailPopup user={selectedUser} onClose={handleClosePopup} />
        )}
        {isAddUser && (
          <AddAdminUser onClose={handleAdduserpopupoff} onsave={handlesavenewuser}/>
        )}
        <CreateUserPopup
          isOpen={isCreateUserPopupOpen}
          onClose={handleCloseCreateUserPopup}
          onCreate={handleCreateUser}
        />
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

export default UserManagementPage;
