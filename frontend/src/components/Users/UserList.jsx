import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./UserList.css";

function UserList() {
  const { token } = useContext(AuthContext);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isBaseRoute = location.pathname === "/users";

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Navigate to the login page if the token is missing
      return;
    }

    const fetchDetails = async () => {
      try {
        const response = await fetch("http://localhost:9000/users", {
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
        setDetails(data.data); // Access the data property directly
      } catch (error) {
        setError(error.message);
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [token, navigate]);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9000/users/${userId}`, {
        method: "DELETE",
        headers: {
          Token: token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete user: ${response.status} - ${errorText}`
        );
      }

      setDetails(
        (prevDetails) => prevDetails.filter((user) => user.id !== userId) // Corrected filter condition
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again later.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <p>Please update the data...</p>;
  }

  return (
    <>
      {isBaseRoute && (
        <div className="user-details-container">
          <div className="header">
            <h1>User Details</h1>
            <Link to="/users/create">
              <button className="btn">Create User</button>
            </Link>
          </div>
          <div className="user-list">
            {details && details.length > 0 ? (
              details.map((user) => (
                <div key={user.id} className="user-details">
                  <h2>Username: {user.username}</h2>
                  <p>Active: {user.is_active ? "Yes" : "No"}</p>
                  <p className="roles">
                    Roles: {user.roles.map((role) => role.Name).join(", ")}
                  </p>
                  <p>Company ID: {user.company.id}</p>
                  <p>Company Code: {user.company.code}</p>
                  <p>Company Name: {user.company.name}</p>
                  <p>Company Address: {user.company.address}</p>
                  {user.branch && (
                    <div>
                      <h3>Branch:</h3>
                      <p>Branch ID: {user.branch.id}</p>
                      <p>Branch Code: {user.branch.code}</p>
                      <p>Branch Name: {user.branch.name}</p>
                      <p>Branch Address: {user.branch.address}</p>
                      <p>Branch Type: {user.branch.type}</p>
                    </div>
                  )}
                  <div className="actions">
                    <Link to={`/users/view/${user.id}`}>
                      <button className="btn">View </button>
                    </Link>
                    <Link to={`/users/update/${user.id}`}>
                      <button className="btn">Update</button>
                    </Link>
                    <button
                      className="btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Please Login for view Users</p>
            )}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}

export default UserList;
