import React, { useState,useEffect } from 'react';
import QuickSummary from './QuickSummary';
import AdminNav from "../../components/nav/AdminNav";
import {
  listDashboard
} from "../../utils/ApiRoute";
const Dashboard = () => {
  const [totalAccounts,setTotalAccounts] = useState(0);
  const [recentPayments,setRecentPayments] = useState([]);
  const loadDashboard = async()=>{
        try {
          const res = await listDashboard();
          const data_res = res.data.data
          console.log(data_res)
          setRecentPayments(data_res?.account || []);
          setTotalAccounts(data_res?.totalBalance || 0);
        } catch (error) {
          console.error("Error loading payments:", error);
          alert("Failed to load payments");
        }
  }

    useEffect(() => {
      loadDashboard();
    }, []);
  

  return(
          <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
    <div className="col-md-8 container mt-4">

  <QuickSummary totalAccounts={totalAccounts} recentPayments={recentPayments} />
    </div>
    </div>
    </div>);
};

export default Dashboard;
