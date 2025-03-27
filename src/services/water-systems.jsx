import "../css/services/water-systems.css";
import IMAGE from "../assets/obj/water-systems.webp";
import AnimationWrapper from "../common/page-animation";
import Service from "./boilerplate";

const WaterSystems = () => {
  const description =
    "We specialize in off-grid water systems, providing reliable access to water in remote areas or for eco-conscious developments. Our systems are designed to operate efficiently without relying on conventional power sources, ensuring water sustainability in areas where infrastructure is lacking or where environmental preservation is key.";

  return (
    <AnimationWrapper>
      <Service
        name="Off-Grid Water Systems"
        description={description}
        className=" wtr-container"
        slogan="Sustainable Water, Anytime, Anywhere."
        img={IMAGE}
      />
    </AnimationWrapper>
  );
};

export default WaterSystems;
