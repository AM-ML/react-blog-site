import AnimationWrapper from "../common/page-animation";
import ProjectsComponent from "../components/projects-component";

const AboutProjects = () => {
  return (
    <AnimationWrapper>
      <div className="abp-pg-container">
        <ProjectsComponent />
      </div>
    </AnimationWrapper>
  );
};

export default AboutProjects;
