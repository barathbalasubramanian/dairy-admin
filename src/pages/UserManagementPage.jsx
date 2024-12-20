import React, { useState } from "react";
import UserCard from "../components/UserCard.jsx";
import UserDetailPopup from "../components/UserDetailPopup.jsx";
import CreateUserPopup from "../components/CreateUserPopup.jsx";
import AddAdminUser from "../components/AddAdminUser.jsx";
import "../static/css/UserManagementPage.css";
import { useGlobalContext } from "../Context";
import useAuth from "./UseAuth.jsx";

const UserManagementPage = () => {
  const { admin = [], addAdmin } = useGlobalContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateUserPopupOpen, setIsCreateUserPopupOpen] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useAuth(() => setIsAuthChecked(true));

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  const handleViewMore = (user) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  const handleAddUserPopupOff = () => {
    setIsAddUser(false);
  };

  const handleCreateUserClick = () => {
    setIsAddUser(true);
  };

  const handleCloseCreateUserPopup = () => {
    setIsCreateUserPopupOpen(false);
  };

  const handleSaveNewUser = (name, type, mail, phno) => {
    setNewUser({
      name: name,
      type: type,
      mail: mail,
      phno: phno,
    });
    setIsCreateUserPopupOpen(true);
    setIsAddUser(false);
  };

  const handleCreateUser = async (sendEmail) => {
    await addAdmin(
      newUser.name,
      newUser.mail,
      newUser.phno,
      "new",
      newUser.type
    );
    console.log("User created, send email:", sendEmail);
    setIsCreateUserPopupOpen(false);
  };

  return (
    <div className="User-Management">
      <div className=" text-white flex items-end gap-2 justify-end rounded-lg">
        <button onClick={handleCreateUserClick} className="bg-[#4695b8] text-xl font-medium px-4 py-3 w-fit rounded-lg">
          <span>+</span> Create New User
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-8 px-10 py-10">
        {admin.map((user, index) => (
          <UserCard
            key={user.id || index} 
            user={user}
            onViewMore={handleViewMore}
          />
        ))}
      </div>
      {selectedUser && (
        <UserDetailPopup user={selectedUser} onClose={handleClosePopup} />
      )}
      {isAddUser && (
        <AddAdminUser
          onClose={handleAddUserPopupOff}
          onSave={handleSaveNewUser}
        />
      )}
      <CreateUserPopup
        isOpen={isCreateUserPopupOpen}
        onClose={handleCloseCreateUserPopup}
        onCreate={handleCreateUser}
      />
    </div>
  );
};

export default UserManagementPage;
