import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { useNavigate } from "react-router-dom";

const AdminRoute = (Component) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
   
    if (user && user.token) {
        setOk(true);
    }else{
      navigate("/login");

    };
  
  }, [user]);

  return ok ? <Component /> : <LoadingToRedirect />;
};

export default AdminRoute;
