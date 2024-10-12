import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import "@flaticon/flaticon-uicons/css/all/all.css";
import AuthForm from "./pages/authform";
import { createContext, useEffect, useState } from "react";
import { lookInSession, clearSession } from "./components/session";
import ProfileSidebar from "./components/profilesidebar";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notfound";
import Editor from "./pages/editor";
import WriterWrapper from "./components/writer-wrapper";
import Preloader from "./common/preloader";
import Author from "./pages/author";
import Settings from "./pages/settings";
import Blogs from "./pages/blogs";
import Blog from "./pages/blog";
import DraftsPanel from "./components/drafts-panel";
import ScrollToTop from "./common/scroll";
import Search from "./pages/search";
import Redirect from "./common/redirect";
import CivilEngineering from "./services/civil-engineering";
import ElectricalEngineering from "./services/electrical-engineering";
import Architecture from "./services/architecture";
import InteriorDesign from "./services/interior-design";
import SolarSystems from "./services/solar-systems";
import WaterSystems from "./services/water-systems";
import WaterPumps from "./services/water-pumps";
import Test from "./pages/test";
import ProjectManagement from "./services/project-management";
import Networking from "./services/networking";
import FeasibilityStudy from "./services/feasibility-study";
import Innovation from "./services/innovation";
import FinancialAnalysis from "./services/financial-analysis";
import Programming from "./services/programming";
import BusinessPlans from "./services/business-plans";
import Sustainability from "./services/sustainability";

export const UserContext = createContext({});

const Router = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route element={<Home />} index />
          <Route path="signin" element={<AuthForm type="sign-in" />} />
          <Route path="signup" element={<AuthForm type="sign-up" />} />
          <Route path="loading-page" element={<Preloader loading={true} />} />
          <Route path="author/:username" element={<Author />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:id" element={<Blog />} />
          <Route path="search/:query" element={<Search />} />
          <Route path="search/null" element={<Redirect route="/blogs" />} />
          <Route path="search/" element={<Redirect route="/blogs" />} />
          <Route path="test" element={<Test />} />
          <Route path="services/civil-engineering" element={<CivilEngineering />} />
          <Route path="services/electrical-engineering" element={<ElectricalEngineering />} />
          <Route path="services/architecture" element={<Architecture />} />
          <Route path="services/interior-design" element={<InteriorDesign />} />
          <Route path="services/solar-systems" element={<SolarSystems />} />
          <Route path="services/water-systems" element={<WaterSystems />} />
          <Route path="services/water-pumps" element={<WaterPumps />} />
          <Route path="services/project-management" element={<ProjectManagement />} />
          <Route path="services/networking" element={<Networking />} />
          <Route path="services/networking-and-IT" element={<Networking />} />
          <Route path="services/innovative-solutions" element={<Innovation />} />
          <Route path="services/feasibility-study" element={<FeasibilityStudy />} />
          <Route path="services/financial-analysis" element={<FinancialAnalysis />} />
          <Route path="services/financial-analysis-and-risk-management" element={<FinancialAnalysis />} />
          <Route path="services/programming" element={<Programming />} />
          <Route path="services/business-plans" element={<BusinessPlans />} />
          <Route path="services/business-plans-and-investment-opportunities" element={<BusinessPlans />} />
          <Route path="services/sustainability-management" element={<Sustainability />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/dashboard" element={<ProfileSidebar />}>
          <Route element={<Dashboard />} index />
          <Route path="/dashboard/writer" element={<WriterWrapper />}>
            <Route path="/dashboard/writer/write" element={<Editor />} />
            <Route path="/dashboard/writer/drafts" element={<DraftsPanel />} />
          </Route>
          <Route path="/dashboard/author/:username" element={<Author />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default Router;

