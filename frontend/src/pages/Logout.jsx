import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AutheContext.jsx";

function Logout() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
    navigate("/login");
  }, [setToken, navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
