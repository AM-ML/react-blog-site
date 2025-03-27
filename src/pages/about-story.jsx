import AnimationWrapper from "../common/page-animation";
import AboutStoryComponent from "../components/story-component";

const AboutStory = () => {
  return (
    <AnimationWrapper>
      <div className="abst-pg-container">
        <AboutStoryComponent />
      </div>
    </AnimationWrapper>
  );
};

export default AboutStory;
