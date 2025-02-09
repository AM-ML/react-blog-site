import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import LoginInput from "../components/login-input";
import SignupInput from "../components/signup-input";
import { Toaster, toast } from "react-hot-toast";
import { storeInSession } from "../components/session";
import { useContext, useState } from "react";
import { UserContext } from "../Router";
import { Navigate } from "react-router-dom";
import { authWithGoogle } from "../common/firebase";
import Preloader from "../common/preloader";

const AuthForm = ({ type }) => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const serverAuth = (serverRoute, dataToSend) => {
    setLoading(true);

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, dataToSend)
      .then(({ data }) => {
        setLoading(false);
        storeInSession("user", JSON.stringify(data));

        setUserAuth(data);

        toast.success("Signed In!");
      })
      .catch(({ response }) => {
        setLoading(false);
        const errorMessage = response?.data?.error || "An error occurred"; // Default message if no message is found
        toast.error(errorMessage);
      });
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();

    authWithGoogle()
      .then((user) => {
        const route = "/google-auth";

        const formData = {
          access_token: user.accessToken,
        };

        serverAuth(route, formData);
      })
      .catch((err) => {
        toast.error("Error occurred while logging in with google");
        console.log(err);
      });
  };

  return (
    <>
      {access_token ? (
        <Navigate to="/" />
      ) : loading ? (
        <Preloader />
      ) : type == "sign-in" ? (
        <AnimationWrapper keyValue={type}>
          <LoginInput
            Toaster={Toaster}
            toast={toast}
            func={serverAuth}
            googleAuthFunc={handleGoogleAuth}
          />
        </AnimationWrapper>
      ) : (
        <AnimationWrapper keyValue={type}>
          <SignupInput
            Toaster={Toaster}
            toast={toast}
            func={serverAuth}
            googleAuthFunc={handleGoogleAuth}
          />
        </AnimationWrapper>
      )}
    </>
  );
};

export default AuthForm;
