import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./BrandsList.css";

function BrandList() {
  const { token } = useContext(AuthContext);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isBaseRoute = location.pathname === "/brands";

  const fetchDetails = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/brands", {
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
      setDetails(data.data); // Assuming data is in data.data as per your API structure
    } catch (error) {
      setError(error.message);
      console.error("Error fetching details:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchDetails();
    }
  }, [token]);

  const handleDelete = async (brandId) => {
    try {
      const response = await fetch(`http://localhost:9000/brands/${brandId}`, {
        method: "DELETE",
        headers: {
          Token: token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete brand: ${response.status} - ${errorText}`
        );
      }

      setDetails((prevDetails) =>
        prevDetails.filter((brand) => brand.id !== brandId)
      );
    } catch (error) {
      console.error("Error deleting brand:", error);
      setError("Failed to delete brand. Please try again later.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <p>Please Update the details....</p>;
  }

  return (
    <>
      {isBaseRoute && (
        <div className="brand-details-container">
          <div className="header">
            <h1>Brand Details</h1>
            <Link to="/brands/create">
              <button className="btn">Create</button>
            </Link>
          </div>
          <div className="brand-list">
            {details &&
              details.map((brand) => (
                <div key={brand.id} className="brand-details">
                  <h2>Brand Name: {brand.name}</h2>
                  <p>Brand Code: {brand.code}</p>
                  <p>Company ID: {brand.company.id}</p>
                  <p>Company Code: {brand.company.code}</p>
                  <p>Company Name: {brand.company.name}</p>
                  <p>Company Address: {brand.company.address}</p>
                  <div className="actions">
                    <Link to={`/brands/view/${brand.id}`}>
                      <button className="btn">View</button>
                    </Link>
                    <Link to={`/brands/update/${brand.id}`}>
                      <button className="btn">Update</button>
                    </Link>
                    <button
                      className="btn"
                      onClick={() => {
                        handleDelete(brand.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default BrandList;
