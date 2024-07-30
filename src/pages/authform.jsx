import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import LoginInput from "../components/login-input";
import SignupInput from "../components/signup-input";
import {Toaster, toast} from "react-hot-toast";

const AuthForm = ({ type }) => {
  const serverAuth = (serverRoute, dataToSend) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, dataToSend)
    .then (({ data }) => {
      console.log(data);
      toast.success("Signed In!")
    })
    .catch(({ response }) => {
      toast.error(response.data.error);
    })


  }
  return <>
    
      {type == "sign-in"? <AnimationWrapper keyValue={type}><LoginInput Toaster={Toaster} toast={toast} func={serverAuth}/></AnimationWrapper> 
                        : <AnimationWrapper keyValue={type}><SignupInput Toaster={Toaster} toast={toast} func={serverAuth}/></AnimationWrapper>}
    
  </>
}

export default AuthForm;