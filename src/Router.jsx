import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import "@flaticon/flaticon-uicons/css/all/all.css";
import News from "./pages/news";
import AuthForm from "./pages/authform";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element= {<Navbar />}>
        <Route element={<Home />} index/>
        <Route path="/signin" element= {<AuthForm type="sign-in" />}/>
        <Route path="/signup" element= {<AuthForm type="sign-up"/>}/>
        <Route path="/news" element= {<News />}/>
      </Route>
    </Routes>
  )
}

export default Router;