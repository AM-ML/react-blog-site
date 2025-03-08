import "../css/components/about-component.css";
import img from "../assets/about-us/about-header.webp";

const AboutComponent = () => {
  return (
    <div className="abt-container">
      <div className="abt-header">
        <div className="abt-img-c">
          <img src={img} alt="" className="abt-img" />
        </div>

        <div className="abt-img-shadow"></div>
        <div className="abt-header-text">
          <h1 className="abt-title">
            A <div className="highlight">Passion</div> for Problem Solving.
          </h1>
          <div className="abt-desc">
            There aren’t many agencies like BOFFO: strategy-led, design-driven,
            and inherently nimble. We create powerful experiences that
            accelerate your organization. Our multidisciplinary teams provide
            end-to-end services that augment your capabilities, grow your
            business, and strengthen your relationships. The deep experience we
            have across all of our capabilities means you don’t have to stitch
            together multiple agencies to achieve more.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
