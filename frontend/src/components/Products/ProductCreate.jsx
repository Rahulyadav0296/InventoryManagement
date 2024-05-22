import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./ProductCreate.css";

function ProductCreate() {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    price: "",
    brand: "",
    product_category: "",
    minimum_stock: "",
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

    // Parse numeric fields to ensure correct types
    const parsedData = {
      ...formData,
      price: parseFloat(formData.price),
      minimum_stock: formData.minimum_stock.toString(),
    };

    try {
      const response = await fetch("http://localhost:9000/products", {
        method: "POST",
        headers: {
          Token: token,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(parsedData),
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
      setSuccessMessage("Product created successfully!");
      setFormData({
        code: "",
        name: "",
        price: "",
        brand: "",
        product_category: "",
        minimum_stock: "",
      });
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error creating product:", error);
    }
    navigate("/products");
  };

  return (
    <div className="product-create-container">
      <h1>Create Product</h1>
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
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_category">Product Category:</label>
          <input
            type="text"
            id="product_category"
            name="product_category"
            value={formData.product_category}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="minimum_stock">Minimum Stock:</label>
          <input
            type="number"
            id="minimum_stock"
            name="minimum_stock"
            value={formData.minimum_stock}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Create Product
        </button>
      </form>
    </div>
  );
}

export default ProductCreate;
