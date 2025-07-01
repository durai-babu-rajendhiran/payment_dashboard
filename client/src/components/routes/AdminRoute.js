import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { useNavigate ,useLocation} from "react-router-dom";

const AdminRoute = (Component) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
   
    if (user && user.token) {
        setOk(true);
    }else if(location.pathname != "/register"){
      navigate("/login");
    };
  }, [user]);

  return ok ? <Component /> : <LoadingToRedirect />;
};

export default AdminRoute;
