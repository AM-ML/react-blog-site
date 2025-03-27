import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const Redirect = ({ route }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(route);
  }, [navigate, route])
}

export default Redirect;
