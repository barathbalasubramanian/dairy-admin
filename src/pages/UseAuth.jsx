import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { User } from "react-feather";

const useAuth = async (onAuthChecked,path) => {
  const navigate = useNavigate();
  const { CheckToken,user } = useGlobalContext();

  useEffect(() => {
    const authenticate = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        onAuthChecked();
      } else {
        try {
            console.log(User);
          if (user.userid === -1) {
            await CheckToken(token);
          }
          onAuthChecked();
        } catch (error) {
          console.error("Token check failed", error);
          navigate("/");
        }
      }
    };

    authenticate();
  }, [navigate, CheckToken, onAuthChecked]);
};

export default useAuth;
