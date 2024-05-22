import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./CustomerView.css";

function CustomerView() {
  const { token } = useContext(AuthContext);
  const [customerData, setcustomerData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchcustomerData = async () => {
      if (!token) {
        setError("Token is Mission");
        return;
      }

      try {
        const response = await fetch(`http://localhost:9000/customers/${id}`, {
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

        const customerData = await response.json();
        console.log("The data coming from customer: ", customerData.data);
        setcustomerData(customerData.data); // Access the data property directly
      } catch (error) {
        setError(error.message);
        console.error("Error fetching customerData:", error);
      }
    };

    if (token) {
      fetchcustomerData();
    }
  }, [id, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customerData) {
    return <p>Please Login for See the data</p>;
  }

  return (
    <>
      <div className="customer-details-container">
        <div className="customer-details">
          <h1>Customer Details</h1>
          <div className="customer-info">
            <p>Name: {customerData.name}</p>
            <p>Email: {customerData.email}</p>
            <p>Address: {customerData.address}</p>
            <p>Customer Data Hp: {customerData.hp}</p>
            <p>Company ID: {customerData.company.id}</p>
            <p>Company Code: {customerData.company.code}</p>
            <p>Company Name: {customerData.company.name}</p>
            <p>Company Address: {customerData.company.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerView;
