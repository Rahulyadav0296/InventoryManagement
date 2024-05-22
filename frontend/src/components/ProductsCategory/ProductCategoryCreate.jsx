import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./ProductCategoryCreate.css";

function ProductCategoryCreate() {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:9000/categories", {
          headers: { Token: token },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "category" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Token is Missing");
      return;
    }

    if (!categories.some((cat) => cat.id === formData.category)) {
      setError("Invalid Category ID");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/product-categories", {
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
      setSuccessMessage("Product Category created successfully!");
      setFormData({
        name: "",
        category: "",
      });

      setTimeout(() => {
        navigate("/product-categories");
      }, 2000);
    } catch (error) {
      setError(error.message);
      console.error("Error creating Product Category:", error);
    }
  };

  return (
    <div className="Product-create-container">
      <h1>Create Product Category</h1>
      {error && <div className="error-message">Error: {error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Electronics..."
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category ID:</label>
          <input
            type="number"
            id="category"
            name="category"
            placeholder="Enter category ID..."
            value={formData.category}
            min={0}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">
          Create Product Category
        </button>
      </form>
    </div>
  );
}

export default ProductCategoryCreate;
