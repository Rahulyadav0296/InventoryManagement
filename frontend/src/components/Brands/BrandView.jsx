import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./BrandView.css";

function BrandView() {
  const { token } = useContext(AuthContext);
  const [brandData, setBrandData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchbrandData = async () => {
      if (!token) {
        setError("Token is Mission");
        return;
      }

      try {
        const response = await fetch(`http://localhost:9000/brands/${id}`, {
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

        const brandData = await response.json();
        console.log("The data coming from brand: ", brandData.data);
        setBrandData(brandData.data); // Access the data property directly
      } catch (error) {
        setError(error.message);
        console.error("Error fetching brandData:", error);
      }
    };

    if (token) {
      fetchbrandData();
    }
  }, [id, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!brandData) {
    return <p>Please Login for See the data</p>;
  }

  return (
    <>
      <div className="brand-details">
        <h1>Brand Details</h1>
        <div>
          <p>Brand Name: {brandData.name}</p>
          <p>Brand Code: {brandData.code}</p>
          <p>Company ID: {brandData.company.id}</p>
          <p>Company Code: {brandData.company.code}</p>
          <p>Company Name: {brandData.company.name}</p>
          <p>Company Address: {brandData.company.address}</p>
        </div>
      </div>
    </>
  );
}

export default BrandView;
