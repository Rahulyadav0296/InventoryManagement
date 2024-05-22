import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./CustomerCreate.css";

function CustomerCreate() {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    hp: "",
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
      const response = await fetch("http://localhost:9000/customers", {
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
      setSuccessMessage("customer created successfully!");
      setFormData({
        name: "",
        email: "",
        address: "",
        hp: "",
      });
    } catch (error) {
      setError(error.message);
      console.error("Error creating customer:", error);
    }
    navigate("/customers");
  };

  return (
    <div className="customer-create-container">
      <h1>Create Customer</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="label">
            Customer Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email:
          </label>
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
          <label htmlFor="address" className="label">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hp" className="label">
            Hp:
          </label>
          <input
            type="text"
            id="hp"
            name="hp"
            value={formData.hp}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn-submit">
          Create Customer
        </button>
      </form>
    </div>
  );
}

export default CustomerCreate;
