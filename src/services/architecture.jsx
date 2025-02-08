import IMAGE from "../assets/obj/exterior-drawing.jpg";
import AnimationWrapper from "../common/page-animation";
import Service from "./boilerplate";

const Architecture = () => {
  const description =
    "Our architectural services focus on creating innovative, sustainable, and aesthetically appealing designs. Whether it’s residential, commercial, or industrial projects, we combine form and function to develop spaces that inspire. Our architects work closely with engineers and clients to create buildings that reflect both modern trends and timeless beauty, while always keeping environmental sustainability at the forefront.";

  return (
    <AnimationWrapper>
      <Service
        name="Architecture"
        description={description}
        className=" arc-container"
        slogan="Designing Spaces, Shaping the Future."
        img={IMAGE}
      />
    </AnimationWrapper>
  );
};

export default Architecture;
