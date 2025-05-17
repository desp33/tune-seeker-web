
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Index = () => {
  const navigate = useNavigate();

  // This component simply redirects to Home to ensure backward compatibility
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return <Home />;
};

export default Index;
