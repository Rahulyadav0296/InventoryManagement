import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./ProductView.css";

function ProductView() {
  const { token } = useContext(AuthContext);
  const [productData, setproductData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      if (!token) {
        setError("Token is Mission");
        return;
      }

      try {
        const response = await fetch(`http://localhost:9000/products/${id}`, {
          method: "GET",
          headers: {
            Token: token,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok: ${response.status} - ${errorText}`
          );
        }

        const productData = await response.json();
        console.log("The data coming from product: ", productData.data);
        setproductData(productData.data); // Access the data property directly
      } catch (error) {
        setError(error.message);
        console.error("Error fetching productData:", error);
      }
    };

    if (token) {
      fetchProductData();
    }
  }, [id, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productData) {
    return <p>Please Login for See the data</p>;
  }

  return (
    <>
      <div className="product-details-container">
        <div className="product-details-block">
          <h1 className="product-details-title">Product Details</h1>
          <div className="product-details-content">
            <p className="product-detail">Product Name: {productData.name}</p>
            <p className="product-detail">
              Active: {productData.is_active ? "Yes" : "No"}
            </p>
            <p className="product-detail">
              Company ID: {productData.company.id}
            </p>
            <p className="product-detail">
              Company Code: {productData.company.code}
            </p>
            <p className="product-detail">
              Company Name: {productData.company.name}
            </p>
            <p className="product-detail">
              Company Address: {productData.company.address}
            </p>
            <p className="product-detail">
              Brand Code: {productData.brand.code}
            </p>
            <p className="product-detail">
              Brand Name: {productData.brand.name}
            </p>
            <p className="product-detail">
              Product Category: {productData.product_category.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductView;
