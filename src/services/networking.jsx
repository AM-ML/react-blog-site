import AnimationWrapper from "../common/page-animation";
import IMG from "../assets/obj/itb.jpg";
import ServiceFull from "./servicefull";

const Networking = () => {
  const description =
    "We provide cutting-edge networking and IT solutions that drive business success in the digital age. From infrastructure setup to cybersecurity and system integration, BOFFO delivers IT solutions that are both innovative and secure, ensuring that your business remains competitive and protected in an increasingly connected world.";

  return (
    <AnimationWrapper>
      <ServiceFull
        name="Networking & IT"
        className=" ece"
        description={description}
        slogan={"Transforming Technology, Empowering Growth."}
        img={IMG}
        cover={true}
      />
    </AnimationWrapper>
  );
};

export default Networking;
