import AnimationWrapper from "../common/page-animation";
import ServiceFull from "./servicefull";
import IMAGE from "../assets/services/bug.webp";

const Programming = () => {
  const desc =
    "BOFFO offers state-of-the-art programming services tailored to the needs of modern businesses. Our developers create custom software solutions that are scalable, secure, and user-friendly, enhancing operational efficiency and enabling businesses to remain agile in a competitive landscape.";
  return (
    <AnimationWrapper key="Programming">
      <ServiceFull
        name="Programming"
        img={IMAGE}
        slogan="Digital Code, Real-World Impact."
        description={desc}
        className=" prg"
        cover={true}
      ></ServiceFull>
    </AnimationWrapper>
  );
};

export default Programming;
