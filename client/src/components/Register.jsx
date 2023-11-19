import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../services/httpService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const registerHandle = async (e) => {
    e.preventDefault();

    try {
      const result = await http.post("/auth/register", {
        name: name,
        email: email,
        password: password,
      });
      setNotification(result.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response) {
        return setNotification(err.response.data.message);
      }
      setNotification(err.message);
    }
  };

  const handleInput = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
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
        method="post"
        className="container w-50 d-flex flex-column"
        onSubmit={registerHandle}
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
            name="name"
            placeholder="Name"
            minLength={3}
            maxLength={10}
            required
            onChange={handleInput}
          />
        </div>
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
            minLength={8}
            maxLength={16}
            required
            onChange={handleInput}
          />
        </div>
        <button className="btn btn-success mt-3">Register</button>
        <div className="mt-3">
          Already have an account? <Link to="/login">Login.</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
