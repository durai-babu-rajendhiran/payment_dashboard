import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {createUser} from "../../utils/ApiRoute";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      // Make your API call here to register the user
      // Example:
      const res = await createUser({ email, name:username, password });
      if(res.data){

  
      toast.success("Registration successful!");

      // Clear form
      setEmail("");
      setUsername("");
      setPassword("");

      // Navigate or perform other actions if needed
      navigate("/login");
    }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="mb-3 form-control"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      <input
        type="email"
        className="mb-3 form-control"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
    
      />
      
      <input
        type="password"
        className="mb-3 form-control"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn btn-primary my-2 w-100">
        Register
      </button>
    </form>
  );

  return (
    <div className="card my-5 container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
