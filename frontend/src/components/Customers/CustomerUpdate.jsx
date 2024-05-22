import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./CustomerUpdate.css";

const CustomerUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [customerData, setcustomerData] = useState({
    ID: "",
    name: "",
    email: "",
    address: "",
    hp: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/customers/${id}`, {
          headers: { Token: token },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }

        const data = await response.json();
        setcustomerData({
          ID: data.data.id,
          name: data.data.name,
          email: data.data.email,
          address: data.data.address,
          hp: data.data.hp,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCustomerData();
  }, [id, token]);

  // set the update value in the input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...customerData,
        ID: parseInt(customerData.ID, 10), // convert id to a number
      };
      const response = await fetch(`http://localhost:9000/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update customer data");
      }

      // Log success message
      console.log("Customer data updated successfully");

      // Navigate to customers page after successful update
      navigate("/customers");
    } catch (error) {
      setError(error.message);
    }
  };

  // Log customer data and error for debugging
  useEffect(() => {
    console.log("Customer data:", customerData);
    console.log("Error:", error);
  }, [customerData, error]);

  return (
    <div className="update-customer-container">
      <h1 className="update-customer-title">Update customer</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleFormSubmit} className="update-customer-form">
        <div className="form-group">
          <label className="form-label">Customer ID:</label>
          <input
            type="number"
            name="ID"
            value={customerData.ID}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Customer Name:</label>
          <input
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={customerData.address}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Hp:</label>
          <input
            type="text"
            name="hp"
            value={customerData.hp}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="update-customer-button">
          Update Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerUpdate;
