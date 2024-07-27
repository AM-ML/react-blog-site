import AnimationWrapper from "../common/page-animation";
import LoginInput from "../components/login-input";
import SignupInput from "../components/signup-input";

const AuthForm = ({ type }) => {
  return <>
    
      {type == "sign-in"? <AnimationWrapper keyValue={type}><LoginInput/></AnimationWrapper> 
                        : <AnimationWrapper keyValue={type}><SignupInput/></AnimationWrapper>}
    
  </>
}

export default AuthForm;