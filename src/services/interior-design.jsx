import "../css/services/interior-design.css";
import IMAGE from "../assets/obj/interior.jpg";
import AnimationWrapper from "../common/page-animation";
import Service from "./boilerplate";

const InteriorDesign = () => {

  const description = "BOFFO’s interior design team brings creativity and functionality together, crafting spaces that are both stylish and practical. From corporate offices to residential interiors, we tailor our designs to meet client preferences while ensuring optimal use of space, light, and materials. We focus on sustainability and well-being, ensuring that each design contributes to a harmonious living or working environment.";

  return (
    <AnimationWrapper>
      <Service
        name="Interior Design"
        description={description}
        className=" intd-container"
        slogan="Something Very Important We Offer?"
        img={IMAGE}
      />
    </AnimationWrapper>
  )
}

export default InteriorDesign;