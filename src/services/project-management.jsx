import AnimationWrapper from "../common/page-animation";
import ServiceFull from "./servicefull";
import IMAGE from "../assets/services/pj.jpg";

const ProjectManagement = () => {
  const desc = "With decades of experience, our project management services ensure that every detail of your project is handled with precision and care. BOFFO’s project managers are experts in coordinating large, complex projects, from initial concept through to completion. Our focus on efficiency, cost minimization, and quality ensures that we consistently deliver on time and within budget.";
  return (
    <AnimationWrapper key="project-management">
      <ServiceFull
        name="Project Management"
        img={IMAGE}
        slogan="Something Important We Offer?"
        description={desc}
        className=" pm"
        cover={true}
      >
      </ServiceFull>
    </AnimationWrapper>
  )
}

export default ProjectManagement;
