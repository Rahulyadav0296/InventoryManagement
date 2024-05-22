import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./ProductCategoryView.css";

function ProductCategoryView() {
  const { token } = useContext(AuthContext);
  const [productCategoryData, setProductCategoryData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductCategoryData = async () => {
      if (!token) {
        setError("Token is Mission");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:9000/product-categories/${id}`,
          {
            method: "GET",
            headers: {
              Token: token,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Network response was not ok: ${response.status} - ${errorText}`
          );
        }

        const productCategoryData = await response.json();
        console.log(
          "The data coming from productCategory: ",
          productCategoryData.data
        );
        setProductCategoryData(productCategoryData.data); // Access the data property directly
      } catch (error) {
        setError(error.message);
        console.error("Error fetching productCategoryData:", error);
      }
    };

    if (token) {
      fetchProductCategoryData();
    }
  }, [id, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productCategoryData) {
    return <p>Please Login for See the data</p>;
  }

  return (
    <>
      <div className="productCategory-details">
        <h1>productCategory Details</h1>
        <div>
          <p>productCategoryname: {productCategoryData.name}</p>
          <p>Company ID: {productCategoryData.company.id}</p>
          <p>Company Code: {productCategoryData.company.code}</p>
          <p>Company Name: {productCategoryData.company.name}</p>
          <p>Company Address: {productCategoryData.company.address}</p>
          <p>Category ID: {productCategoryData.category.id}</p>
          <p>Category Name: {productCategoryData.category.name}</p>
        </div>
      </div>
    </>
  );
}

export default ProductCategoryView;
