import AnimationWrapper from "../common/page-animation"
import IMAGE from "../assets/obj/solar_panels.png";
import Service from "./boilerplate"

const SolarSystems = () => {

  const description = "Our solar systems service is aimed at providing clean, renewable energy solutions that help businesses and homes reduce their carbon footprint. From design to installation, we create customized solar solutions that align with your energy needs. BOFFO’s solar systems ensure energy independence while lowering operational costs, making sustainability an easy choice.";

  return (
    <AnimationWrapper>
     <Service name="Solar Systems"
        description={description}
        className=" cve-container"
        slogan={"Something Very Important we offer?"}
        img = {IMAGE}
      />
    </AnimationWrapper>
  )
}

export default SolarSystems;
