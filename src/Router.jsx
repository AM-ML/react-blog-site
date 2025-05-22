import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import "@flaticon/flaticon-uicons/css/all/all.css";
import AuthForm from "./pages/authform";
import { createContext, useEffect, useState, useRef, useCallback } from "react";
import {
  lookInSession,
  storeInSession,
  clearSession,
} from "./components/session";
import ProfileSidebar from "./components/profilesidebar";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/notfound";
import Editor from "./pages/editor";
import WriterWrapper from "./components/writer-wrapper";
import Preloader from "./common/preloader";
import Author from "./pages/author";
import { NavigationProvider } from "./common/NavigationContext";
import TransitionLoader from "./common/TransitionLoader";
import Settings from "./pages/settings";
import Blogs from "./pages/blogs";
import Blog from "./pages/blog";
import DraftsPanel from "./components/drafts-panel";
import ScrollToTop from "./common/scroll";
import Search from "./pages/search";
import Redirect from "./common/redirect";
import FavoriteBlogs from "./pages/favorite-blogs";
import CivilEngineering from "./services/civil-engineering";
import ElectricalEngineering from "./services/electrical-engineering";
import Architecture from "./services/architecture";
import InteriorDesign from "./services/interior-design";
import SolarSystems from "./services/solar-systems";
import WaterSystems from "./services/water-systems";
import WaterPumps from "./services/water-pumps";
import ProjectManagement from "./services/project-management";
import Networking from "./services/networking";
import FeasibilityStudy from "./services/feasibility-study";
import Innovation from "./services/innovation";
import FinancialAnalysis from "./services/financial-analysis";
import Programming from "./services/programming";
import BusinessPlans from "./services/business-plans";
import Sustainability from "./services/sustainability";
import ContactUs from "./pages/contact-us";
import AboutUs from "./pages/about-us";
import AboutStory from "./pages/about-story";
import AboutProjects from "./pages/about-projects";
import AboutSustainability from "./pages/about-sustain";
import AdminPanel from "./pages/admin";
import AdminWrapper from "./components/admin-wrapper";
import AdminUsers from "./components/admin/users";
import AdminNewsletter from "./components/admin/newsletter";
import UnsubscribePage from "./pages/unsubscribe";
import axios from "axios";

export const UserContext = createContext({});

const Router = () => {
  const [userAuth, setUserAuth] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const syncTimerRef = useRef(null);
  const lastSyncTimeRef = useRef(0);
  const isSyncingRef = useRef(false);

  // Function to synchronize user data with the server
  const syncUserData = useCallback(
    async (forceSyncing = false) => {
      // Only proceed if user is logged in and has an ID
      if (!userAuth?.id || !userAuth?.access_token || isSyncingRef.current) {
        return;
      }

      // Throttle synchronization (once every 30 seconds) unless forced
      const now = Date.now();
      if (!forceSyncing && now - lastSyncTimeRef.current < 30000) {
        return;
      }

      try {
        isSyncingRef.current = true;
        lastSyncTimeRef.current = now;

        const response = await axios.post(
          import.meta.env.VITE_SERVER_DOMAIN + "/get-user-data",
          { id: userAuth.id },
          {
            headers: {
              Authorization: `Bearer ${userAuth.access_token}`,
            },
          }
        );

        const newUserData = response.data;

        // Check if there are any significant changes to user data
        const hasChanged =
          newUserData.profile_img !== userAuth.profile_img ||
          newUserData.name !== userAuth.name ||
          newUserData.bio !== userAuth.bio ||
          JSON.stringify(newUserData.social_links) !==
            JSON.stringify(userAuth.social_links) ||
          JSON.stringify(newUserData.favorite_blogs) !==
            JSON.stringify(userAuth.favorite_blogs) ||
          newUserData.is_author !== userAuth.is_author ||
          newUserData.role !== userAuth.role;

        // If changes detected, update the user data in state and in session storage
        if (hasChanged) {
          const updatedUserAuth = {
            ...userAuth,
            profile_img: newUserData.profile_img,
            name: newUserData.name,
            bio: newUserData.bio,
            social_links: newUserData.social_links,
            favorite_blogs: newUserData.favorite_blogs,
            is_author: newUserData.is_author,
            role: newUserData.role,
          };

          setUserAuth(updatedUserAuth);
          storeInSession("user", JSON.stringify(updatedUserAuth));
        }
      } catch (error) {
        // Silent error handling - we don't want to disrupt user experience
        console.error("Background sync error:", error);
      } finally {
        isSyncingRef.current = false;
      }
    },
    [userAuth]
  );

  // Initial setup - load user from session
  useEffect(() => {
    let userInSession = lookInSession("user");

    if (userInSession) {
      const parsedUserData = JSON.parse(userInSession);
      setUserAuth(parsedUserData);

      // Force a sync after initial load, with a small delay for better UX
      setTimeout(() => {
        syncUserData(true);
        setIsInitialLoad(false);
      }, 1500);
    } else {
      setUserAuth({ access_token: null });
      setIsInitialLoad(false);
    }
  }, []);

  // Set up periodic sync timer
  useEffect(() => {
    if (userAuth?.id && userAuth?.access_token) {
      // Clear any existing timer
      if (syncTimerRef.current) {
        clearInterval(syncTimerRef.current);
      }

      // Set up a new timer for every 5 minutes
      syncTimerRef.current = setInterval(() => {
        syncUserData();
      }, 5 * 60 * 1000); // 5 minutes

      // Also sync on visibility change (when user returns to the tab)
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          syncUserData();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        clearInterval(syncTimerRef.current);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    } else if (syncTimerRef.current) {
      clearInterval(syncTimerRef.current);
    }
  }, [userAuth?.id, userAuth?.access_token, syncUserData]);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <NavigationProvider>
        <TransitionLoader />
        <ScrollToTop />
        {isInitialLoad ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route element={<Home />} index />
              <Route path="signin" element={<AuthForm type="sign-in" />} />
              <Route path="signup" element={<AuthForm type="sign-up" />} />
              <Route
                path="loading-page"
                element={<Preloader loading={true} />}
              />
              <Route path="author/:username" element={<Author />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blog/:id" element={<Blog />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="search/:query" element={<Search />} />
              <Route path="search/null" element={<Redirect route="/blogs" />} />
              <Route path="search/" element={<Redirect route="/blogs" />} />
              <Route path="unsubscribe" element={<UnsubscribePage />} />
              <Route
                path="services/civil-engineering"
                element={<CivilEngineering />}
              />
              <Route
                path="services/electrical-engineering"
                element={<ElectricalEngineering />}
              />
              <Route path="about-us/overview" element={<AboutUs />} />
              <Route path="about-us/our-story" element={<AboutStory />} />
              <Route
                path="about-us/sustainability"
                element={<AboutSustainability />}
              />
              <Route path="about-us/projects" element={<AboutProjects />} />

              <Route path="services/architecture" element={<Architecture />} />
              <Route
                path="services/interior-design"
                element={<InteriorDesign />}
              />
              <Route path="services/solar-systems" element={<SolarSystems />} />
              <Route path="services/water-systems" element={<WaterSystems />} />
              <Route path="services/water-pumps" element={<WaterPumps />} />
              <Route
                path="services/project-management"
                element={<ProjectManagement />}
              />
              <Route path="services/networking" element={<Networking />} />
              <Route
                path="services/networking-and-IT"
                element={<Networking />}
              />
              <Route
                path="services/innovative-solutions"
                element={<Innovation />}
              />
              <Route
                path="services/feasibility-study"
                element={<FeasibilityStudy />}
              />
              <Route
                path="services/financial-analysis"
                element={<FinancialAnalysis />}
              />
              <Route
                path="services/financial-analysis-and-risk-management"
                element={<FinancialAnalysis />}
              />
              <Route path="services/programming" element={<Programming />} />
              <Route
                path="services/business-plans"
                element={<BusinessPlans />}
              />
              <Route
                path="services/business-plans-and-investment-opportunities"
                element={<BusinessPlans />}
              />
              <Route
                path="services/sustainability-management"
                element={<Sustainability />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/dashboard" element={<ProfileSidebar />}>
              <Route element={<Dashboard />} index />
              <Route path="/dashboard/writer" element={<WriterWrapper />}>
                <Route path="/dashboard/writer/write" element={<Editor />} />
                <Route
                  path="/dashboard/writer/write/:blog_id"
                  element={<Editor />}
                />
                <Route
                  path="/dashboard/writer/drafts"
                  element={<DraftsPanel />}
                />
              </Route>
              <Route path="/dashboard/author/:username" element={<Author />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/favorites" element={<FavoriteBlogs />} />
              <Route path="/dashboard/admin" element={<AdminWrapper />}>
                <Route index element={<AdminPanel />} />
                <Route path="/dashboard/admin/users" element={<AdminUsers />} />
                <Route
                  path="/dashboard/admin/newsletter"
                  element={<AdminNewsletter />}
                />
              </Route>
            </Route>
          </Routes>
        )}
      </NavigationProvider>
    </UserContext.Provider>
  );
};

export default Router;
