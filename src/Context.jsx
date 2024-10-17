import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();
// https://test.quindltechnologies.com/admin/farmers-feed-orders
const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const baseURL = "https://test.quindltechnologies.com/";
  const [user, setUser] = useState({ userid: -1 });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedOrderdata, setfeedOrderData] = useState();
  const [currentFeedPeriodData, setcurrentFeedPeriodData] = useState();
  const [previousFeedPeriodData, setpreviousFeedPeriodData] = useState();
  const [detailFarmerhis, setdetailFarmerhis] = useState();
  const [feed, setFeed] = useState();
  const [TicketCount, SetTicketCount] = useState();
  const [AllTicket, setAllTicket] = useState();
  const [CurrCost, setCurrCost] = useState();
  const [preloan, setPreloan] = useState();
  const [prein, setPrein] = useState();
  const [admin, setAdmin] = useState();
  const [sp, setSp] = useState();
  const [Farmer, setFarmer] = useState();
  const [Vlcc, SetVlcc] = useState();
  const [bmc, setBmc] = useState();
  const [cluster, setCluster] = useState();
  const [staff, setStaff] = useState();
  const [alldoc, setAllDoc] = useState();
  const [cow, setCow] = useState();

  const getAllData = async () => {
    await feedOrder();
    await getFarmerorder();
    await getAllfarmerOrder();
    await getFeed();
    await ticketCount();
    await allTicket();
    await currCost();
    await precost();
    await getadmin();
    await getAllDoc();
    await getALlFarmer();
    await getAllVlcc();
    await getAllBmc();
    await getAllCluster();
    await getallstaff();
    await getalldoc();
  };

  const Login = async (username, password) => {
    try {
      const res = await axios.post(baseURL + `admin/login`, {
        email: username,
        password: password,
      });
      console.log(res.data);
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      await feedOrder();
      await getFarmerorder();
      await getAllfarmerOrder();
      await getFeed();
      await ticketCount();
      await allTicket();
      await currCost();
      await precost();
      await getadmin();
      await getAllDoc();
      await getALlFarmer();
      await getAllVlcc();
      await getAllBmc();
      await getAllCluster();
      await getallstaff();
      await getalldoc();
      navigate("/FeedOrderPage");
    } catch (error) {
      console.log(error);
    }
  };

  const CheckToken = async (token) => {
    try {
      const res = await axios.post(baseURL + "admin/checktoken", {
        token: token,
      });
      setUser(res.data.user);
      await feedOrder();
      await getFarmerorder();
      await getAllfarmerOrder();
      await getFeed();
      await ticketCount();
      await allTicket();
      await currCost();
      await precost();
      await getadmin();
      await getAllDoc();
      await getALlFarmer();
      await getAllVlcc();
      await getAllBmc();
      await getAllCluster();
      await getallstaff();
      await getalldoc();
      navigate("/FeedOrderPage");
    } catch (error) {
      console.log(error);
    }
  };

  const feedOrder = async () => {
    try {
      const res = await axios.get(baseURL + `admin/farmers-feeds`);
      console.log(res.data);
      setfeedOrderData(res.data);
    } catch (error) {}
  };

  const getFarmerorder = async () => {
    try {
      const res1 = await axios.get(baseURL + `admin/farmers-order/0`);
      setcurrentFeedPeriodData(res1.data.farmers);
    } catch (error) {
      setcurrentFeedPeriodData([]);
    }
    try {
      const res2 = await axios.get(baseURL + `admin/farmers-order/1`);
      setpreviousFeedPeriodData(res2.data.farmers);
    } catch (error) {
      setpreviousFeedPeriodData([]);
    }
  };

  const getAllfarmerOrder = async () => {
    try {
      const res = await axios.get(baseURL + `admin/farmers-feed-orders`);
      setdetailFarmerhis(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFeed = async () => {
    try {
      const res = await axios.get(baseURL + `admin/feed`);
      setFeed(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editFeed = async (id, Name, Price, Type, Manufacturer) => {
    try {
      const res = await axios.post(baseURL + `admin/editfeed/` + id, {
        Name: Name,
        Price: Price,
        Type: Type,
        Manufacturer: Manufacturer,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addFeed = async (Name, Price, Type, Manufacturer) => {
    try {
      const res = await axios.post(baseURL + `admin/addfeed`, {
        Name: Name,
        Price: Price,
        Type: Type,
        Manufacturer: Manufacturer,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ticketCount = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getticketdetails`);
      SetTicketCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const allTicket = async () => {
    try {
      const res = await axios.get(baseURL + `admin/allticket`);
      setAllTicket(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const currCost = async () => {
    try {
      const res = await axios.get(baseURL + `admin/cost-ticket/1`);
      setCurrCost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const connect = async (id) => {
    try {
      const res1 = await axios.post(
        baseURL + `ticket/updateApprovalStatus/` + id,
        {
          SP_Approval_status: true,
        }
      );
      const res2 = await axios.post(
        baseURL + `ticket/updateStartstatus/` + id,
        {
          Service_Start_status: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const cancelLoan = async (id) => {
    try {
      const res1 = await axios.post(
        baseURL + `ticket/updateApprovalStatus/` + id,
        {
          SP_Approval_status: false,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const finalLoan = async (id) => {
    try {
      const res1 = await axios.post(baseURL + `ticket/updateEndstatus/` + id, {
        Service_End_status: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const precost = async () => {
    try {
      const res1 = await axios.get(baseURL + `admin/cost-ticket/0`);
      const res3 = await axios.get(baseURL + `admin/cost-ticket/3`);

      const loan = [];
      const ins = [];

      if (res1.data.loan) {
        res1.data.loan.forEach((item) => {
          loan.push({ ...item, status: "Processed" });
        });
      }

      if (res3.data.loan) {
        res3.data.loan.forEach((item) => {
          loan.push({ ...item, status: "Cancelled" });
        });
      }

      setPreloan(loan);

      if (res1.data.insurance) {
        res1.data.loan.forEach((item) => {
          ins.push({ ...item, status: "Processed" });
        });
      }

      if (res3.data.insurance) {
        res3.data.loan.forEach((item) => {
          ins.push({ ...item, status: "Cancelled" });
        });
      }

      setPrein(ins);
    } catch (error) {
      console.log(error);
    }
  };

  const getadmin = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getadmin`);
      setAdmin(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAdmin = async (name, email, phno, password, type) => {
    try {
      const res = await axios.post(baseURL + `admin/addadmin`, {
        name: name,
        email: email,
        phno: phno,
        password: password,
        type: type,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDoc = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getdocdetails`);
      setSp(res.data);
    } catch (error) {}
  };

  const getALlFarmer = async () => {
    try {
      const res = await axios.get(baseURL + `admin`);
      setFarmer(res.data);
    } catch (error) {}
  };

  const getAllVlcc = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getvlcc`);
      SetVlcc(res.data);
    } catch (error) {}
  };

  const getAllBmc = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getbmc`);
      setBmc(res.data);
    } catch (error) {}
  };

  const getAllCluster = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getallcluster`);
      setCluster(res.data);
    } catch (error) {}
  };

  const getallstaff = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getallstaff`);
      setStaff(res.data);
    } catch (error) {}
  };

  const getalldoc = async () => {
    try {
      const res = await axios.get(baseURL + `admin/getalldoc`);
      setAllDoc(res.data);
    } catch (error) {}
  };

  const addfarmer = async (
    name,
    mobile1,
    mobile2,
    address_line1,
    address_line2,
    address_line3,
    VLCC_id
  ) => {
    try {
      const res = await axios.post(baseURL + `admin/addfarmer`, {
        name,
        mobile1,
        mobile2,
        address_line1,
        address_line2,
        address_line3,
        VLCC_id,
      });
    } catch (error) {}
  };

  const addcow = async (farmer_id, breed, cow_age_year, cow_age_month) => {
    try {
      const res = await axios.get(baseURL + `admin/addcow`, {
        farmer_id,
        breed,
        cow_age_year,
        cow_age_month,
      });
      setAllDoc(res.data);
    } catch (error) {}
  };

  const addvlcc = async (name, personname, email, phno, BMCid) => {
    try {
      const res = await axios.get(baseURL + `admin/addvlcc`, {
        name,
        personname,
        email,
        phno,
        BMCid,
      });
    } catch (error) {}
  };

  const addbmc = async (name, personname, email, phno, clusterid) => {
    try {
      const res = await axios.get(baseURL + `admin/addbmc`, {
        name,
        personname,
        email,
        phno,
        clusterid,
      });
    } catch (error) {}
  };

  const addcluster = async (name, personname, email, phno) => {
    try {
      const res = await axios.get(baseURL + `admin/addcluster`, {
        name,
        personname,
        email,
        phno,
      });
    } catch (error) {}
  };

  const addstaff = async (userName, password, email, phno) => {
    try {
      const res = await axios.get(baseURL + `admin/addstaff`, {
        userName,
        password,
        email,
        phno,
      });
    } catch (error) {}
  };

  const adddoc = async (
    name,
    location,
    manager,
    managerPhno,
    email,
    phno,
    password,
    type,
    address,
    clusterid
  ) => {
    try {
      const res = await axios.get(baseURL + `admin/adddoc`, {
        name,
        location,
        manager,
        managerPhno,
        email,
        phno,
        password,
        type,
        address,
        clusterid,
      });
    } catch (error) {}
  };
  const getcowbyid = async (id) => {
    try {
      const res = await axios.get(baseURL + `admin/getcow/` + id);
      console.log(res.data);
      setCow(res.data);
    } catch (error) {}
  };

  const editVlcc = async (id, name, personname, email, phno) => {
    try {
      const res = await axios.post(baseURL + `admin/editvlcc` + id, {
        name,
        personname,
        email,
        phno,
      });
    } catch (error) {}
  };

  const editCluster = async (id, name, personname, email, phno) => {
    try {
      const res = await axios.post(baseURL + `admin/editcluster` + id, {
        name,
        personname,
        email,
        phno,
      });
    } catch (error) {}
  };

  const addbulk = async (selectedFile, link) => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(baseURL + link, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        feedOrderdata,
        currentFeedPeriodData,
        previousFeedPeriodData,
        detailFarmerhis,
        feed,
        TicketCount,
        AllTicket,
        CurrCost,
        preloan,
        prein,
        admin,
        sp,
        Farmer,
        Vlcc,
        bmc,
        cluster,
        staff,
        alldoc,
        cow,
        CheckToken,
        editCluster,
        editVlcc,
        getcowbyid,
        feedOrder,
        Login,
        editFeed,
        addFeed,
        connect,
        cancelLoan,
        finalLoan,
        addAdmin,
        addfarmer,
        addcow,
        addvlcc,
        addbmc,
        addcluster,
        addstaff,
        adddoc,
        getAllData,
        addbulk,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
