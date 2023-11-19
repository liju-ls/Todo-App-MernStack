import { useState } from "react";
import http from "../services/httpService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const result = await http.post("/auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", result.headers["x-auth-token"]);
      setNotification(result.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      if (err.response) {
        return setNotification(err.response.data.message);
      }
      setNotification(err.message);
    }
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
    <>
      <div className="container vh-100 d-flex align-items-center">
        <form
          className="container w-50 d-flex flex-column"
          action="/auth/login"
          method="post"
          onSubmit={loginHandle}
        >
          {notification && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {notification}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

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
    </>
  );
}

export default Login;
