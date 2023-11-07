import { useState } from "react";
import { Link } from "react-router-dom";
import http from "../services/httpService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const registerHandle = (e) => {
    e.preventDefault();
    http
      .post("/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        setErr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      {err && <p>{err}</p>}
      <form
        method="post"
        className="container w-50 d-flex flex-column"
        onSubmit={registerHandle}
      >
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
            minLength={4}
            maxLength={8}
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
