import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./Customer.css";

function Customer() {
  const { token } = useContext(AuthContext);
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isBaseRoute = location.pathname === "/customers";

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:9000/customers", {
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
        setCustomers(data.data); // Access the data property directly
      } catch (error) {
        setError(error.message);
        console.error("Error fetching customers:", error);
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      fetchCustomers();
    }
  }, [token, navigate]);

  const handleDelete = async (customerId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/customers/${customerId}`,
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
          `Failed to delete customer: ${response.status} - ${errorText}`
        );
      }

      setCustomers((prevcustomers) =>
        prevcustomers.filter((customer) => customer.id !== customerId)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
      setError("Failed to delete customer. Please try again later.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {isBaseRoute && (
        <div className="user-details-container">
          <div className="header">
            <h1>Customers Details</h1>
            <Link to="/customers/create">
              <button className="btn">Create</button>
            </Link>
          </div>
          <div className="user-list">
            {customers && customers.length > 0 ? (
              customers.map((customer) => (
                <div key={customer.id} className="user-details">
                  <p>Name: {customer.name}</p>
                  <p>Email: {customer.email}</p>
                  <p>Address: {customer.address}</p>
                  <p>Customer Hp: {customer.hp}</p>
                  <p>Company ID: {customer.company.id}</p>
                  <p>Company Code: {customer.company.code}</p>
                  <p>Company Name: {customer.company.name}</p>
                  <p>Company Address: {customer.company.address}</p>
                  <div className="actions">
                    <Link to={`/customers/view/${customer.id}`}>
                      <button className="btn">View</button>
                    </Link>
                    <Link to={`/customers/update/${customer.id}`}>
                      <button className="btn">Update</button>
                    </Link>
                    <button
                      className="btn"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No customers available</p>
            )}
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}

export default Customer;
