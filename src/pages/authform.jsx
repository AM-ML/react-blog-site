import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import LoginInput from "../components/login-input";
import SignupInput from "../components/signup-input";
import {Toaster, toast} from "react-hot-toast";
import { storeInSession } from "../components/session";
import { useContext } from "react";
import { UserContext } from "../Router";
import { Navigate } from "react-router-dom";

const AuthForm = ({ type }) => {
  let { userAuth: { access_token }, setUserAuth } = useContext(UserContext);
  
  const serverAuth = (serverRoute, dataToSend) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, dataToSend)
    .then (({ data }) => {
      storeInSession("user", JSON.stringify(data));

      setUserAuth(data);
      
      toast.success("Signed In!")
    })
    .catch(({ response }) => {
      toast.error(response.data.error);
    })


  }
  return <>
      {access_token ?
        <Navigate to="/" />
      :
      type == "sign-in"? <AnimationWrapper keyValue={type}><LoginInput Toaster={Toaster} toast={toast} func={serverAuth}/></AnimationWrapper> 
                        : <AnimationWrapper keyValue={type}><SignupInput Toaster={Toaster} toast={toast} func={serverAuth}/></AnimationWrapper>
      }
    
  </>
}

export default AuthForm;