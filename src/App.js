import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Search from "./components/Search.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import FarmerPage from "./pages/FarmerPage.jsx";
import VLCCPage from "./pages/VLCCPage.jsx";
import BMCPage from "./pages/BMCPage.jsx";
import ClusterPage from "./pages/ClusterPage.jsx";
import CallCentreExecutivePage from "./pages/CallCentreExecutivePage.jsx";
import ServiceProviderPage from "./pages/ServiceProviderPage.jsx";
import FeedOrderPage from "./pages/FeedOrderPage.jsx";
import FeedManagementPage from "./pages/FeedManagementPage.jsx";
import TicketCenterPage from "./pages/TicketCenterPage.jsx";
import FinanceRequirementPage from "./pages/FinanceRequirementPage.jsx";
import UserManagementPage from "./pages/UserManagementPage.jsx";
import SpAvailabilityPage from "./pages/SpAvailabilityPage.jsx";
import "./App.css";
function App() {
  const location = useLocation();

  const hideMainBoxPaths = ["/", "/register"];

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {!hideMainBoxPaths.includes(location.pathname) && (
        <div className="main-box">
          <div className="main-nav">
            <Nav />
          </div>
          <div className="main-search">
            <Search />
          </div>
          <div className="main-contents">
            <Routes>
              <Route path="/FarmerPage" element={<FarmerPage />} />
              <Route path="/VLCCPage" element={<VLCCPage />} />
              <Route path="/BMCPage" element={<BMCPage />} />
              <Route path="/ClusterPage" element={<ClusterPage />} />
              <Route path="/CallCentreExecutivePage" element={<CallCentreExecutivePage />} />
              <Route
                path="/ServiceProviderPage"
                element={<ServiceProviderPage />}
              />
              <Route path="/FeedOrderPage" element={<FeedOrderPage />} />
              <Route
                path="/FeedManagementPage"
                element={<FeedManagementPage />}
              />
              <Route path="/TicketCenterPage" element={<TicketCenterPage />} />
              <Route
                path="/FinanceRequirementPage"
                element={<FinanceRequirementPage />}
              />
              <Route
                path="/UserManagementPage"
                element={<UserManagementPage />}
              />
              <Route
                path="/SpAvailabilityPage"
                element={<SpAvailabilityPage />}
              />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;