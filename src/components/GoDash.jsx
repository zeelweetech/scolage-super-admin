import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoDash = () => {
   const navigate = useNavigate();

   useEffect(() => {
      navigate("/dashboard");
   }, []);

   return <></>;
};

export default GoDash;
