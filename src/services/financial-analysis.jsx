import AnimationWrapper from "../common/page-animation";
import ServiceFull from "./servicefull";
import IMAGE from "../assets/services/financial-analysis.webp";

const FinancialAnalysis = () => {
  const desc =
    "We offer robust financial analysis and risk management services, helping businesses identify potential challenges before they arise and crafting strategies to mitigate them. BOFFO’s team of expert economists and analysts ensures that your projects are financially sound, balancing risk and reward for sustainable growth.";
  return (
    <AnimationWrapper key="financial-analysis">
      <ServiceFull
        name="Financial Analysis & Risk Management"
        img={IMAGE}
        slogan="Navigating Risks, Securing Financial Success."
        description={desc}
        className=" fna"
        cover={true}
      ></ServiceFull>
    </AnimationWrapper>
  );
};

export default FinancialAnalysis;
