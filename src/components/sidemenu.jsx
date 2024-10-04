import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import "../css/components/sidemenu.css";
import FloatingComponent from "../common/floating-component";
import { useEffect, useState } from "react";


const SideMenu = ({ appearSide, setAppearSide }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const linkDuration = 0.3;
  const delayFactor = 0.005;

  const closeSideMenu = () => {
    setAppearSide(false);
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
    console.log(window.innerWidth <= 650);
  }, [])

  const Industries = () => {
    const industries = [
      {
        name: "Civil Engineering",
        link: "/services/civil-engineering",
        span: 1
      },
      {
        name: "Electrical Engineering",
        link: "/services/electrical-engineering",
        span: 1
      },
      {
        name: "Architecture",
        link: "/services/architecture",
        span: 1
      },
      {
        name: "Interior Design",
        link: "/services/interior-design",
        span: 1
      },
      {
        name: "Solar Systems",
        link: "/services/solar-systems",
        span: 1
      },
      {
        name: "Off-Grid Water Systems",
        link: "/services/water-systems",
        span: 1
      },
      {
        name: "Water Pumps",
        link: "/services/water-pumps",
        span: 1
      },
      {
        name: "Project Management",
        link: "/services/project-management",
        span: 1
      },
      {
        name: "Networking & IT",
        link: "/services/networking-and-IT",
        span: 1
      },
      {
        name: "Feasibility Study",
        link: "/services/feasibility-study",
        span: 1
      },
      {
        name: "Innovative Solutions",
        link: "/services/innovative-solutions",
        span: 1
      },
      {
        name: "Sustainability Management",
        link: "/services/sustainability-management",
        span: 1
      },
      {
        name: "Financial Analysis &",
        link: "/services/financial-analysis-and-risk-management",
        span: 1
      },
      {
        name: "Risk Management",
        link: "/services/financial-analysis-and-risk-management",
        span: 1
      },
      {
        name: "Programming",
        link: "/services/programming",
        span: 1
      },
      {
        name: "Business Plans &",
        link: "/services/business-plans-and-investment-oppurtunities",
        span: 1
      },
      {
        name: "Investment Opportunities",
        link: "/services/business-plans-and-investment-oppurtunities",
        span: 1
      },

    ]
    return (
      <div className="sdm-ir-container">
        <div className="sdm-ir-title">Industries</div>
        {
          industries.map((industry, i) => {
            const {name, span, link="/dadv" } = industry;
            return (
                <Link to={link} className={"sdm-ir-item span-" + span}
                onClick={closeSideMenu}
                key={i}>
                <AnimationWrapper
                  transition={{ duration: linkDuration, delay: i * delayFactor}}
                >
                  {name}
                </AnimationWrapper>
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
                <AnimationWrapper
                  transition={{ duration: linkDuration, delay: i * delayFactor}}
                >
                  {name}
                </AnimationWrapper>

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
                <AnimationWrapper
                  transition={{ duration: linkDuration, delay: i * delayFactor}}
                >
                  {name}
                </AnimationWrapper>
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
      <FloatingComponent className={!appearSide? " d-none": ' sdm-ft'} style={{"display": "flex", "flexDirection": "row", "flexWrap": "nowrap"}}>
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
