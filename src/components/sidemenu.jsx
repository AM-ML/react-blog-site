import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import "../css/components/sidemenu.css";
import FloatingComponent from "../common/floating-component";
import { useEffect, useState } from "react";


const SideMenu = ({ appearSide, setAppearSide }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const closeSideMenu = () => {
    setAppearSide(false);
    console.log('closing');
  }

  const routes = [
    {type: "dropdown", name: "Industries"},
    {type: "dropdown", name: "Careers"},
    {type: "Link", name: "Blogs", to: "/blogs"},
    {type: "dropdown", name: "About Us", toEnd:true},
    {type: "Link", name: "Contact Us", to:"/contact-us", toEnd:true}
  ]

  const Route = ({ data, active }) => {
    const { type, name, index } = data;
    if (type == "dropdown") return (
      <button className={"sdm-item " + (active && "sdm-active")} onClick={() => {setActiveIndex(index)}}>
        { name }
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    )
    if (type == "Link") return (
      <Link to={ data.to } onClick={closeSideMenu}  className="sdm-item">
        { name }
      </Link>
    )
  }

  useEffect(() => {

  }, [activeIndex])

  const Industries = () => {
    const industries = [
      {name: "Civil Engineering", span: 1}, {name: "Electrical Engineering", span: 1}, {name: "Architecture", span: 1},
      {name: "Interior Design", span: 1}, {name: "Solar Systems", span: 1}, {name: "Off-Grid Water Systems", span: 1},
      {name: "Water Pumps", span: 1}, {name: "Project Management", span: 1}, {name: "Networking & IT", span: 1},
      {name: "Feasibility Study", span: 1}, {name: "Innovative Solutions", span: 1}, {name: "Sustainability Management", span: 1},
      {name: "Financial Analysis &", span: 1}, {name: "Risk Management", span: 1},
      {name: "Programming", span: 1}, {name: "Business Plans &", span: 1}, {name: "Investment Opportunities", span: 1},

    ]
    return (
      <div className="sdm-ir-container">
        <div className="sdm-ir-title">Industries</div>
        {
          industries.map((industry, i) => {
            const {name, span} = industry;
            return (
              <Link to="/dadv" className={"sdm-ir-item span-" + span}
                onClick={closeSideMenu}
                key={i}>
                {name}
              </Link>
            )
          })
        }
      </div>
    )
  }

  const Careers = () => {
    const careers = [
      { name: "Overview" },
      { name: "Job Search" },
      { name: "Our Employees" },
      { name: "Your Experience" }
    ]
    return (
      <div className="sdm-cr-container sdm-ir-container">
        <div className="sdm-ir-title sdm-cr-title d-block">
          Careers
        </div>
        {
          careers.map((career, i) => {
            const {name, link = "/dadv", span = 1} = career;

            return (
              <Link to={link} key={i}
                onClick={closeSideMenu}
                className={"sdm-ir-item sdm-cr-item span-" + span}>
                {name}
              </Link>
            )
          })
        }
      </div>
    )
  }
  const About = () => {
    const items = [
      { name: "Overview" },
      { name: "Our Story" },
      { name: "Case Studies" },
      { name: "Sustainability" }
    ]

    return (
      <div className="sdm-ai-container sdm-ir-container">
        <div className="sdm-ai-title sdm-ir-title">
          About Us
        </div>

        {
          items.map((item, i) => {
            const {name, link="/dadv", span=1}  = item;

            return (
              <Link to={link} key={i}
                onClick={closeSideMenu}
                className={"sdm-ai-item sdm-ir-item span-"+span}>
                {name}
              </Link>
            )
          })
        }
      </div>
    )
  }

  const children = [ <Industries/>, <Careers />, <></>, <About />, <></> ]

  return (
    <AnimationWrapper>
      <FloatingComponent className={!appearSide? " d-none": ''} style={{"display": "flex", "flexDirection": "row", "flexWrap": "nowrap"}}>
        <div className="sdm-container">
          {routes.map((route, i) => {
            if (! route.toEnd) {return <Route data={{...route, index:i}} active={i == activeIndex} key={i} /> }
          })}
          <div className="sdm-end-items">
            {routes.map((route, i) => {
              if (route.toEnd) {return <Route data={{...route, index:i}} active={i == activeIndex} key={i} /> }
            })}
          </div>
        </div>
        <div className="sdm-second-container">
          {children[activeIndex]}
        </div>
      </FloatingComponent>
    </AnimationWrapper>
  )
}

export default SideMenu;
