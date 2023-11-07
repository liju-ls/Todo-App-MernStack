import { useState } from "react";
import http from "../services/httpService";
import { Link, useNavigate } from "react-router-dom";

function Login({ setActive }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandle = (e) => {
    e.preventDefault();
    http
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.headers["x-auth-token"]);
        console.log("token set.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center">
      <form
        className="container w-50 d-flex flex-column"
        action="/auth/login"
        method="post"
        onSubmit={loginHandle}
      >
        <div className="mt-2">
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Email"
            required
            onChange={handleInput}
          />
        </div>
        <div className="mt-2">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required
            onChange={handleInput}
          />
        </div>
        <button className="btn btn-success mt-3">Login</button>
        <div className="mt-3">
          Don't have an account? <Link to="/register">Register.</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
