import asset from "../assets/floating_astronaut.png";
import "../css/common/nodata.css";
import AnimationWrapper from "./page-animation";


const NoData = ({
    msg,
    addBtn = true,
    btnMsg ="",
    onClick = () => {}
}) => {

  return (
    <AnimationWrapper>
      <div className="ndt-container">
        <div className="ndt-text-container">
          <div className="ndt-title-container">
            <h1 className="ndt-title border-primary">
              Error&nbsp;
              <div className="d-inline text-primary">
                404
              </div>
            </h1>
          </div>

          <div className="ndt-desc-container">
            <div className="ndt-desc">
              {msg}
            </div>
          </div>


          {addBtn && <div className="ndt-btn-container">
            <button onClick={onClick}
              className="btn ndt-btn btn-lg btn-outline-dark w-100 py-4 mt-4">
              {btnMsg}
            </button>
          </div>}
        </div>
        <div className="ndt-img-container">
          <img src={asset} alt="" className="ndt-img" />
        </div>
      </div>
    </AnimationWrapper>
  )
}

export default NoData;
