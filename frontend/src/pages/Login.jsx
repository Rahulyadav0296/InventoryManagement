import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AutheContext.jsx";

function Login() {
  const [username, setUsername] = useState("jackyhtg");
  const [password, setPassword] = useState("12345678");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Token set after login: ", data.data.token);
      setToken(data.data.token); // ensurin the data has been set
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          {/* {error && <p style={{ color: "red" }}>error</p>} */}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <label>Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label>Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </>
  );
}

export default Login;
