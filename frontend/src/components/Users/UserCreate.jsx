import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./UserCreate.css";

function UserCreate() {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    is_active: true,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token is Missing");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/users", {
        method: "POST",
        headers: {
          Token: token,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);
      setSuccessMessage("User created successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        re_password: "",
        is_active: true,
      });
    } catch (error) {
      setError(error.message);
      console.error("Error creating user:", error);
    }
    navigate("/users");
  };

  return (
    <div className="user-create-container">
      <h1>Create User</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="re_password">Confirm Password:</label>
          <input
            type="password"
            id="re_password"
            name="re_password"
            value={formData.re_password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="is_active">Active:</label>
          <select
            id="is_active"
            name="is_active"
            value={formData.is_active}
            onChange={handleChange}
            className="form-control"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Create User
        </button>
      </form>
    </div>
  );
}

export default UserCreate;
