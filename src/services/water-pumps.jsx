import IMAGE from "../assets/obj/pump_sketch.webp";
import AnimationWrapper from "../common/page-animation";
import Service from "./boilerplate";

const WaterPumps = () => {
  const description =
    "BOFFO offers water pump solutions that are both efficient and durable. Our pumps are used in various industries, from agriculture to construction, ensuring water availability for critical operations. Whether powered by solar energy or integrated into larger off-grid systems, our pumps are designed to meet the specific needs of our clients while maintaining the highest quality standards.";

  return (
    <AnimationWrapper>
      <Service
        name="Water Pumps"
        description={description}
        className=" arc-container"
        slogan="Reliable Flow, Sustainable Solutions."
        img={IMAGE}
      />
    </AnimationWrapper>
  );
};

export default WaterPumps;
