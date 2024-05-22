import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./BrandUpdate.css";

const BrandUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [brandData, setBrandData] = useState({
    ID: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/brands/${id}`, {
          headers: { Token: token },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch brand data");
        }

        const data = await response.json();
        setBrandData({
          ID: data.data.id.toString(),
          name: data.data.name,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBrandData();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrandData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...brandData,
        ID: parseInt(brandData.ID, 10), // convert ID to a number
      };

      const response = await fetch(`http://localhost:9000/brands/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        throw new Error(
          `Failed to update brand data: ${response.status} - ${errorText}`
        );
      }

      setSuccessMessage("The Brand has been updated successfully!");
      setTimeout(() => {
        navigate("/brands");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="update-brand-container">
      <h1 className="update-brand-title">Update Brand</h1>
      {error && <div className="error">{error}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleFormSubmit} className="update-brand-form">
        <div className="form-group">
          <label className="form-label">Id:</label>
          <input
            type="number"
            name="ID"
            value={brandData.ID}
            onChange={handleInputChange}
            className="form-input"
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={brandData.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="update-brand-button">
          Update Brand
        </button>
      </form>
    </div>
  );
};

export default BrandUpdate;
