import "../css/services/servicefull.css";

const ServiceFull = ({ name, cover=false, img, slogan="", description, children, className="" }) => {
  return (
    <div className={( "srf-container " + (className))}>
      <div className="srf-main">
        <div className="srf-img-c">
          <img
            src={img} alt=""
            className="srf-img"
            style={cover? {"objectFit": "cover"}: {}}
          />
          <a
            className="no-design srf-scroll-down-icon bx bx-chevron-down"
            role="button"
            href="#info"
          ></a>
        </div>
      </div>

      <div className="srf-scnd" id="info">
        <div className="srf-info">
          <div className="srf-name">{name}</div>
          <div className="srf-slogan">{slogan}</div>
        </div>

        <div className="srf-desc-c">
          <div className="srf-desc">{description}</div>
        </div>

        {children}
      </div>
    </div>
  )
}

export default ServiceFull;
