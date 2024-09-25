import "../css/components/home-component.css";
import image from "../assets/home/stock_2.png";

const HomeComponent = () => {
  return (
    <div className="hmc-container">
      <div className="hmc-header row">
        <div className="hmc-col hmc-header-images">
          <img src={image} alt="" />
        </div>
        <div className="ms-auto hmc-col hmc-header-text">

          <p className="hmc-header-title">
            Innovative Solutions for the Modern Marketplace
          </p>
          <p className="hmc-header-paragraph">
            In an ever-evolving marketplace, staying ahead requires more than just keeping up.
            We provide cutting-edge solutions tailored to your unique business challenges,
            harnessing deep industry insights and advanced analytics.
          </p>
          <div className="hmc-header-button-container row">
            <div className="col">
              <button className="hmc-header-button">Join Us</button>
            </div>
            <div className="col">
              <button className="hmc-header-button">Our Impact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent;
