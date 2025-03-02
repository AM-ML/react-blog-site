import { Link, useNavigate } from "react-router-dom";
import asset from "../assets/floating_astronaut.webp";
import "../css/components/notfoundlayout.css";

const NotFoundLayout = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="row mx-0 not-found-container">
      <div className="col text-end not-found-text-container">
        <div className="d-inline-block">
          <div className="row text-center not-found-title-container">
            <h1 className="text-bold not-found-title border-primary">
              Error <div className="d-inline text-primary">404</div>
            </h1>
          </div>
          <div className="row text-end not-found-desc-container">
            <div className="col text-center">
              <p className="not-found-description">Page Not Found.</p>
            </div>
          </div>
          <div className="row text-center pt-5">
            <div className="col">
              <button
                onClick={goBack}
                className="w-100 btn btn-lg btn-outline-dark py-3 not-found-button"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <img src={asset} />
      </div>
    </div>
  );
};

export default NotFoundLayout;
