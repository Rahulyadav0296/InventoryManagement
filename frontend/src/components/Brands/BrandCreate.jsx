import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./BrandCreate.css";

function BrandCreate() {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
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
      const response = await fetch("http://localhost:9000/brands", {
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
      setSuccessMessage("brand created successfully!");
      setFormData({
        code: "",
        name: "",
      });
    } catch (error) {
      setError(error.message);
      console.error("Error creating brand:", error);
    }
    navigate("/brands");
  };

  return (
    <div className="brand-create-container">
      <h1>Create brand</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            placeholder="BRAND-value"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Adidas.."
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn-submit">
          Create Brand
        </button>
      </form>
    </div>
  );
}

export default BrandCreate;
