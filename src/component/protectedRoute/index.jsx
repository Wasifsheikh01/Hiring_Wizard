import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookies";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.getItem("token");
  const navigate = useNavigate();
  const { Component } = props;

  useEffect(() => {
    if (jwtToken === null) {
      navigate("/login");
    }
  }, []);
  return <Component />;
};

export default ProtectedRoute;
