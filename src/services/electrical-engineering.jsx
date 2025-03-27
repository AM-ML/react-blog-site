import "../css/services/electrical-engineering.css";
import AnimationWrapper from "../common/page-animation";
import IMG from "../assets/obj/eleceng.webp";
import ServiceFull from "./servicefull";

const ElectricalEngineering = () => {
  const description =
    "At BOFFO, we integrate cutting-edge technology and forward-thinking design to create energy-efficient and reliable electrical systems. Our electrical engineering services include power distribution, lighting systems, and energy optimization solutions, all designed to meet the needs of modern infrastructure. We are experts in renewable energy integration, including solar power systems, making sustainability a core aspect of our work.";

  return (
    <AnimationWrapper>
      <ServiceFull
        name="Electrical Engineering"
        className=" ece"
        description={description}
        slogan={"Powering Innovation, Energizing the Future."}
        img={IMG}
        cover={true}
      />
    </AnimationWrapper>
  );
};

export default ElectricalEngineering;
