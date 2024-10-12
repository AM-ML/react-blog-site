import AnimationWrapper from "../common/page-animation";
import ServiceFull from "./servicefull";
import IMAGE from "../assets/services/sustainability-management.jpg";

const Sustainability = () => {
  const desc = "BOFFO leads the way in sustainability management by incorporating eco-friendly practices into every aspect of our projects. From energy efficiency to green building materials, our commitment to the environment is unwavering. We work with clients to develop sustainability strategies that not only meet regulatory requirements but also improve long-term profitability.";
  return (
    <AnimationWrapper key="sustainability-management">
      <ServiceFull
        name="Sustainability Management"
        img={IMAGE}
        slogan="Something Important We Offer?"
        description={desc}
        className=" prg"
        cover={true}
      >
      </ServiceFull>
    </AnimationWrapper>
  )
}

export default Sustainability;

