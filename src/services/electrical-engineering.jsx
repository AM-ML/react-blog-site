import "../css/services/electrical-engineering.css";
import AnimationWrapper from "../common/page-animation";
import IMG from "../assets/obj/circuit_board.jpg";
import CURRENT from "../assets/obj/electric-current.png";
import Service from "./boilerplate";

const ElectricalEngineering = () => {
  const description = "At BOFFO, we integrate cutting-edge technology and forward-thinking design to create energy-efficient and reliable electrical systems. Our electrical engineering services include power distribution, lighting systems, and energy optimization solutions, all designed to meet the needs of modern infrastructure. We are experts in renewable energy integration, including solar power systems, making sustainability a core aspect of our work.";

  return (
    <AnimationWrapper>
      <Service
        name="Electrical Engineering"
        className=" ece"
        description={description}
        slogan={<img className="ece-electric-img" src={CURRENT}/>}
        img={IMG}
      />
    </AnimationWrapper>
  )
}

export default ElectricalEngineering;
