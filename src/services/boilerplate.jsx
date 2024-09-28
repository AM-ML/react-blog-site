import "../css/services/boilerplate.css";
const Service = ({ name, img, description, children, className, slogan, imgBg=false }) => {
  return (
  <div className={ "srv-container " + className } >
      <div className="srv-main">

        <div className="srv-img-c">
          <img src={ img } alt="" className="srv-img" />
        </div>

        <div className="srv-text">
          <div className="srv-name">
            { name }
          </div>

          <div className="srv-slogan">
            { slogan }
          </div>
        </div>

        <i className="scroll-down-icon fa fa-chevron-down"></i>
      </div>

      <div className="srv-text-sm">
        <div className="srv-name" dangerouslySetInnerHTML={{ __html: name }}></div>
        <div className="srv-slogan" dangerouslySetInnerHTML={{ __html: slogan  }}></div>
      </div>

      <div className="srv-description">
        { description }
      </div>
      { children }
    </div>
  )
}

export default Service;
