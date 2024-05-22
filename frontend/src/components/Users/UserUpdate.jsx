import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./UserUpdate.css";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    ID: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
    is_active: false,
    roles: [{ id: 1 }],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Token for fetching details", token);
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/users/${id}`, {
          headers: { Token: token },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData({
          ID: data.data.id.toString(),
          username: data.data.username,
          email: data.data.email,
          password: "",
          re_password: "",
          is_active: data.data.is_active,
          roles: data.data.roles,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [id, token]);

  // set the update value in the input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...userData,
        ID: parseInt(userData.ID, 10), // conver id to the number
      };
      const response = await fetch(`http://localhost:9000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      navigate("/users");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="update-user-container">
      <h1 className="update-user-title">Update User</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleFormSubmit} className="update-user-form">
        <div className="form-group">
          <label className="form-label">Id:</label>
          <input
            type="number"
            name="ID"
            value={userData.ID}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
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
            value={userData.email}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Re-enter Password:</label>
          <input
            type="password"
            name="re_password"
            value={userData.re_password}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Active:</label>
          <input
            type="checkbox"
            name="is_active"
            checked={userData.is_active}
            onChange={(e) =>
              setUserData((prevState) => ({
                ...prevState,
                is_active: e.target.checked,
              }))
            }
            className="form-checkbox"
          />
        </div>
        <button type="submit" className="update-user-button">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserUpdate;
