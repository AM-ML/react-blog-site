import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import "@flaticon/flaticon-uicons/css/all/all.css";
import AuthForm from "./pages/authform";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./components/session";
import ProfileSidebar from "./components/profilesidebar";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notfound";
import AnalyticsDashboard from "./pages/analytics-dashboard";
import Editor from "./pages/editor";
import WriterWrapper from "./components/writer-wrapper";
import Preloader from "./common/preloader";

export const UserContext = createContext({});

const Router = () => {
  const [userAuth, setUserAuth] = useState({});
  
  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
    
  }, []);
  
  return (
    <UserContext.Provider value={{userAuth, setUserAuth}}>
    <Routes>
      <Route path="/" element= {<Navbar />}>
        <Route element={<Home />} index/>
        <Route path="signin" element= {<AuthForm type="sign-in" />}/>
        <Route path="signup" element= {<AuthForm type="sign-up"/>}/>
        <Route path="loading-page" element={<Preloader loading={true}/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/dashboard" element= {<ProfileSidebar />}>
        <Route element={<Dashboard/>} index/>
        <Route path="/dashboard/analytics" element={<AnalyticsDashboard/>} />
        <Route path="/dashboard/writer" element={<WriterWrapper />} >
          <Route path="/dashboard/writer/write" element={<Editor />} />
        </Route>
      </Route>
    </Routes>
    </UserContext.Provider>
  )
}

export default Router;