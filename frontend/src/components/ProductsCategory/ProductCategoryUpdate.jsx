import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./ProductCategoryUpdate.css";

const ProductCategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [ProductCategoryData, setProductCategoryData] = useState({
    ID: "",
    name: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Token for fetching details", token);
    const fetchProductCategoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/product-categories/${id}`,
          {
            headers: { Token: token },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ProductCategory data");
        }

        const data = await response.json();
        setProductCategoryData({
          ID: data.data.id.toString(),
          name: data.data.name,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProductCategoryData();
  }, [id, token]);

  // set the update value in the input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductCategoryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...ProductCategoryData,
        ID: parseInt(ProductCategoryData.ID, 10), // conver id to the number
      };
      const response = await fetch(
        `http://localhost:9000/product-categories/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Token: token,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update ProductCategory data");
      }
      navigate("/product-categories");
      // Log success message
      alert("Product category updated successfully");
      if (!response.ok) {
        throw new Error("Failed to update ProductCategory data");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="update-ProductCategory-container">
      <h1 className="update-ProductCategory-title">Update ProductCategory</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleFormSubmit} className="update-ProductCategory-form">
        <div className="form-group">
          <label className="form-label">Id:</label>
          <input
            type="number"
            name="ID"
            value={ProductCategoryData.ID}
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
            value={ProductCategoryData.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="update-ProductCategory-button">
          Update ProductCategory
        </button>
      </form>
    </div>
  );
};

export default ProductCategoryUpdate;
