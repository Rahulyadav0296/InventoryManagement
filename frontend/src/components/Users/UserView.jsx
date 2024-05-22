import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/AutheContext";
import "./UserView.css";

function UserView() {
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setError("Token is Mission");
        return;
      }

      try {
        const response = await fetch(`http://localhost:9000/users/${id}`, {
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

        const userData = await response.json();
        console.log("The data coming from user: ", userData.data);
        setUserData(userData.data); // Access the data property directly
      } catch (error) {
        setError(error.message);
        console.error("Error fetching userData:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [id, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <p>Please Login for See the data</p>;
  }

  return (
    <>
      <div className="user-details-container">
        <div className="user-details">
          <h1>User Details</h1>
          <div className="user-info">
            <p>Username: {userData.username}</p>
            <p>Active: {userData.is_active ? "Yes" : "No"}</p>
            <p className="roles">
              Roles: {userData.roles.map((role) => role.Name).join(", ")}
            </p>
            <p>Company ID: {userData.company.id}</p>
            <p>Company Code: {userData.company.code}</p>
            <p>Company Name: {userData.company.name}</p>
            <p>Company Address: {userData.company.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserView;
