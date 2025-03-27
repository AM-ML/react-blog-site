import AnimationWrapper from "../common/page-animation";
import ServiceFull from "./servicefull";
import IMAGE from "../assets/services/bplan.webp";

const BusinessPlans = () => {
  const desc =
    "We assist in crafting detailed, strategic business plans that guide companies toward growth. Whether you’re a startup seeking investment or an established business looking to scale, BOFFO provides the financial and operational insights you need to succeed. We also connect businesses with investment opportunities that align with their goals, helping them secure the funding needed for expansion.";
  return (
    <AnimationWrapper key="business-plans-and-investment-opportunities">
      <ServiceFull
        name="Business Plans & Investment Opportunities"
        img={IMAGE}
        slogan="Strategic Plans, Real Investment Opportunities."
        description={desc}
        className=" prg"
        cover={true}
      ></ServiceFull>
    </AnimationWrapper>
  );
};

export default BusinessPlans;
