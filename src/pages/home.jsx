import AnimationWrapper from "../common/page-animation";
import HomeComponent from "../components/home-component";
import "../css/home.css";
import "../css/external-tools/date-picker.css";

const Home = () => {
  return <AnimationWrapper keyValue="home">
    <HomeComponent />
  </AnimationWrapper>
}

export default Home;
