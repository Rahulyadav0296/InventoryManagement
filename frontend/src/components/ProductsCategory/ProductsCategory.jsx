import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./ProductCategory.css";

function ProductCategory() {
  const { token } = useContext(AuthContext);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isBaseRoute = location.pathname === "/product-categories";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/product-categories",
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
        const data = await response.json();
        // console.log("The data coming from productCategory: ", data.data);
        setDetails(data.data); // Access the data property directly
      } catch (error) {
        setError(error.message);
        console.error("Error fetching details:", error);
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      fetchDetails();
    }
  }, [token, navigate]);

  const handleDelete = async (productCategoryId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/product-categories/${productCategoryId}`,
        {
          method: "DELETE",
          headers: {
            Token: token,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete productCategory: ${response.status} - ${errorText}`
        );
      }

      setDetails((prevDetails) =>
        prevDetails.filter(
          (productCategory) => productCategory.id === productCategoryId
        )
      );
    } catch (error) {
      console.error("Error deleting productCategory:", error);
      setError("Failed to delete productCategory. Please try again later.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {isBaseRoute && (
        <div className="productCategory-details-container">
          <div className="header">
            <h1>products Category</h1>
          </div>
          <div className="productCategory-list">
            {details && details.length > 0 ? (
              details &&
              details.map((product) => (
                <div key={product.id} className="product-details">
                  <h2>product Name: {product.name}</h2>
                  <p>Company ID: {product.company.id}</p>
                  <p>Company Code: {product.company.code}</p>
                  <p>Company Name: {product.company.name}</p>
                  <p>Company Address: {product.company.address}</p>
                  <p>Product Category Id: {product.category.id}</p>
                  <p>Product Category Name : {product.category.name}</p>
                  <div className="actions">
                    <Link to={`/product-categories/view/${product.id}`}>
                      <button className="btn">View </button>
                    </Link>
                    <Link to={`/product-categories/update/${product.id}`}>
                      <button className="btn">Update </button>
                    </Link>
                    <button
                      className="btn"
                      onClick={() => {
                        handleDelete(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Please Login for view products</p>
            )}
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default ProductCategory;
