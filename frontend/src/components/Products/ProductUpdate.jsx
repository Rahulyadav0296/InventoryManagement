import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./ProductUpdate.css";

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    price: "",
    brand: "",
    product_category: "",
    minimum_stock: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/products/${id}`, {
          headers: { Token: token },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        setProductData((prevState) => ({
          ...prevState,
          id: data?.id?.toString() || "",
          name: data?.name || "",
          price: data?.price?.toString() || "",
          brand: data?.brand?.toString() || "",
          product_category: data?.product_category?.toString() || "",
          minimum_stock: data?.minimum_stock?.toString() || "",
        }));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the brand exists in the database
      const brandResponse = await fetch(
        `http://localhost:9000/brands/${productData.brand}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
          credentials: "include",
        }
      );

      if (!brandResponse.ok) {
        throw new Error("Brand not found");
      }

      const payload = {
        id: parseInt(productData.id),
        name: productData.name,
        price: parseFloat(productData.price),
        brand: productData.brand.toString(), // Ensure brand is sent as a string
        product_category: productData.product_category.toString(), // Ensure product_category is sent as a string
        minimum_stock: parseInt(productData.minimum_stock),
      };

      const response = await fetch(`http://localhost:9000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update product data");
      }

      navigate("/products");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-product-container">
      <h1 className="update-product-title">Update Product</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleFormSubmit} className="update-product-form">
        <div className="form-group">
          <label className="form-label">ID:</label>
          <input
            type="number"
            name="id"
            value={productData.id}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Brand:</label>
          <input
            type="number"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Product Category:</label>
          <input
            type="number"
            name="product_category"
            value={productData.product_category}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Minimum Stock:</label>
          <input
            type="number"
            name="minimum_stock"
            value={productData.minimum_stock}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="update-product-button">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductUpdate;
