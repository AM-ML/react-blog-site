import { useState } from "react";
import { scrollDown } from "../common/functions";
import "../css/services/boilerplate.css";
const Service = ({ name, img, description, children, className, slogan="" }) => {

  const [scrollIcon, setScrollIcon] = useState(true);
  const scroll = () => {
    scrollDown(window.innerHeight);
  }
  return (
  <div className={ "srv-container " + className } onScroll={() => {setScrollIcon(false)}}>
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

        {scrollIcon && <button className="scroll-down-icon no-default-design" onClick={scroll}>
          <i className="fa fa-chevron-down"></i>
        </button>}
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
