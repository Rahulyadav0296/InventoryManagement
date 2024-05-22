import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./Products.css";

function Products() {
  const { token } = useContext(AuthContext);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isBaseRoute = location.pathname === "/products";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("http://localhost:9000/products", {
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

        const data = await response.json();
        console.log("The data coming from product: ", data.data);
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

  //   const handleDelete = async (productId) => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:9000/products/${productId}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             Token: token,
  //           },
  //           credentials: "include",
  //         }
  //       );

  //       if (!response.ok) {
  //         const errorText = await response.text();
  //         throw new Error(
  //           `Failed to delete product: ${response.status} - ${errorText}`
  //         );
  //       }

  //       setDetails((prevDetails) =>
  //         prevDetails.filter((product) => product.id === productId)
  //       );
  //     } catch (error) {
  //       console.error("Error deleting product:", error);
  //       setError("Failed to delete product. Please try again later.");
  //     }
  //   };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {isBaseRoute && (
        <div className="product-details-container">
          <div className="header">
            <h1>Product Details</h1>
            <Link to="/products/create">
              <button className="btn">Create </button>
            </Link>
          </div>
          <div className="product-list">
            {details && details.length > 0 ? (
              details &&
              details.map((product) => (
                <div key={product.id} className="product-details">
                  <h2>Product Name: {product.name}</h2>
                  <p>Code: {product.code}</p>
                  <p>Price: ${product.price}</p>
                  <p>Minimum Stock: {product.minimum_stock}</p>
                  <p>Company ID: {product.company.id}</p>
                  <p>Company Code: {product.company.code}</p>
                  <p>Company Name: {product.company.name}</p>
                  <p>Company Address: {product.company.address}</p>
                  {product.brand && (
                    <div>
                      <h3>Brand:</h3>
                      <p>Brand ID: {product.brand.id}</p>
                      <p>Brand Code: {product.brand.code}</p>
                      <p>Brand Name: {product.brand.name}</p>
                    </div>
                  )}
                  {product.product_category && (
                    <div>
                      <h3>Product Category:</h3>
                      <p>Category ID: {product.product_category.id}</p>
                      <p>Category Name: {product.product_category.name}</p>
                    </div>
                  )}
                  <div className="actions">
                    <Link to={`/products/view/${product.id}`}>
                      <button className="btn">View </button>
                    </Link>
                    <Link to={`/products/update/${product.id}`}>
                      <button className="btn">Update </button>
                    </Link>
                    {/* Handle delete action */}
                    <button
                      className="btn"
                      onClick={() => handleDelete(product.id)}
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

export default Products;
