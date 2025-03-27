import AnimationWrapper from "../common/page-animation";
import IMG from "../assets/services/feasibility study.webp";
import ServiceFull from "./servicefull";

const FeasibilityStudy = () => {
  const description =
    "BOFFO’s feasibility studies provide in-depth analysis and insights that help you make informed decisions about your projects. We assess the technical, financial, and operational aspects of potential developments, ensuring that you understand all risks and opportunities before proceeding.";

  return (
    <AnimationWrapper>
      <ServiceFull
        name="Feasibility Study"
        className=" fss"
        description={description}
        slogan={"Informed Decisions, Successful Outcomes."}
        img={IMG}
        cover={true}
      />
    </AnimationWrapper>
  );
};

export default FeasibilityStudy;
