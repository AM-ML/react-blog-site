import AnimationWrapper from "../common/page-animation";
import CVI from "../assets/obj/crane.webp";
import Service from "./boilerplate";
import "../css/services/civil-engineering.css";

const CivilEngineering = () => {
  const description =
    "BOFFO Consulting Group excels in delivering comprehensive civil engineering solutions that are rooted in sustainability and innovation. Our team designs infrastructure that stands the test of time, from highways and bridges to residential complexes, all while prioritizing cost efficiency and environmental impact. With over 20 years of experience, we ensure that every project meets the highest standards of durability and functionality, delivering results that balance practicality with vision.";

  return (
    <AnimationWrapper>
      <Service
        name="Civil Engineering"
        description={description}
        className=" cve-container"
        slogan={"Engineering the Future, Building with Precision."}
        img={CVI}
      />
    </AnimationWrapper>
  );
};

export default CivilEngineering;
