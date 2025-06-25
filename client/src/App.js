import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/routes/AdminRoute";
import ErrorBoundary from './components/common/ErrorBoundary';
const Payment = React.lazy(() => import("./pages/payments/Index"));
const Accounts = React.lazy(() => import("./pages/accounts/Accounts"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Header = React.lazy(() => import("./components/nav/Header"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
function App() {


  const routes = [
      { path:"/" , element:AdminRoute(Dashboard)},
      { path:"/payment" , element:AdminRoute(Payment)},
      { path:"/accounts" , element:AdminRoute(Accounts)},
      { path:"/login" , element:<Login/>},
      { path:"/register" , element:<Register/>},
      { path:"*" , element:<NotFound/>},
     ]

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer />
       <Header />
      <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<ErrorBoundary>{route.element}</ErrorBoundary>} />
      ))}
      </Routes> 
    </Suspense>
  );
}

export default App;