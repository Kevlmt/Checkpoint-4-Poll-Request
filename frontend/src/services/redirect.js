import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const redirect = () => {
  navigate("/login");
};

export default redirect;
