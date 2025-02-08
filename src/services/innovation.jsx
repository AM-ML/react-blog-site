import AnimationWrapper from "../common/page-animation";
import ServiceFull from "./servicefull";
import IMAGE from "../assets/services/inno.jpg";

const Innovation = () => {
  const desc =
    "Innovation is at the core of BOFFO’s service offering. Whether it’s leveraging AI technology, developing eco-friendly materials, or rethinking conventional methods, we’re always seeking ways to push boundaries. Our innovative solutions are designed to solve the toughest challenges, ensuring that our clients stay ahead of the curve.";
  return (
    <AnimationWrapper key="innovative-solutions">
      <ServiceFull
        name="Innovative Solutions"
        img={IMAGE}
        slogan="Pioneering Innovation, Shaping Tomorrow."
        description={desc}
        className=" ivs"
        cover={true}
      ></ServiceFull>
    </AnimationWrapper>
  );
};

export default Innovation;
