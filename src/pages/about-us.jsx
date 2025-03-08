import AnimationWrapper from "../common/page-animation";
import AboutComponent from "../components/about-component";

const AboutUs = () => {
  return (
    <AnimationWrapper>
      <div className="abt-pg-container">
        <AboutComponent />
      </div>
    </AnimationWrapper>
  );
};

export default AboutUs;
