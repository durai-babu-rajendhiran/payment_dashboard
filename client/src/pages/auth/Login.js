import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {loginUser} from "../../utils/ApiRoute";
const Login = () => {
  const [email, setEmail] = useState("durai@gmail.com");
  const [password, setPassword] = useState("durai@123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  let dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({email, password});
      let user_res = res.data.data
      if(user_res){
      const userData = {
          name: user_res.user.name,
          email: user_res.user.email,
          id: user_res.user.id,
          token: user_res.token,
        }
      localStorage.setItem("user",JSON.stringify(userData))
      dispatch({
        type: "LOGGED_IN_USER",
        payload: userData,
      });
      window.location.href = "/";
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };


  const loginForm = () => (
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <input
          type="email" 
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <button
        onClick={handleSubmit}
        className="btn btn-primary mb-3"
        block
        shape="round"
        size="large"
        disabled={!email || password.length < 6}
      >
        Login
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 border p-4">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}

        </div>
      </div>
    </div>
  )
}

export default Login