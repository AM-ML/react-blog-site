import "../css/components/projects-component.css";
import img from "../assets/about-us/proj.webp";
import cp1 from "../assets/about-us/construction/1.webp";
import cp2 from "../assets/about-us/construction/2.webp";
import cp3 from "../assets/about-us/construction/3.webp";
import cp4 from "../assets/about-us/construction/4.webp";
import cp5 from "../assets/about-us/construction/5.webp";
import cp6 from "../assets/about-us/construction/6.webp";
import cp7 from "../assets/about-us/construction/7.webp";
import cp8 from "../assets/about-us/construction/8.webp";
import cp9 from "../assets/about-us/construction/9.webp";
import dp1 from "../assets/about-us/domestic/d1.webp";
import dp2 from "../assets/about-us/domestic/d2.webp";
import dp3 from "../assets/about-us/domestic/d3.webp";
import dp4 from "../assets/about-us/domestic/d4.webp";

const construction_projects = [
  {
    title: "GREATER BEIRUT WATER SUPPLY PROJECT",
    desc: "The construction of a series of tunnels and pipelines to convey water from the existing hydroelectric power system tunnel near the village of joun some 30 km south of beirut to the site of proposed reservoirs at Hadath90 and Hadath125 in south of beirut.",
    date: "2016 - On going",
    location: "Lebanon",
    client_name: "Lebanese government- CDR",
    img: cp1,
  },
  {
    title: "MUNICIPALITIES FACILITIES",
    desc: "Public infrastructure, transportation, physical assets and facilities with contract value of $1.5 million.",
    date: "2014-2016",
    location: "Lebanon",
    client_name: "Lebanese government- Nabatieh Region Municipality",
    img: cp2,
  },
  {
    title:
      "ELECTRICAL SUBSTATION -ZAHRANE-TYRE-SAIDA | CIVIL & ELECTRICAL WORK",
    desc: "Manufacturing, erection, testing and commissioning of 76 cubicles type univer C ( ABB SACE) In addition, Boffo was in charge of manufacturing, erection commissioning and testing of control panels including civil work modification",
    date: "2015 - 2016",
    location: "Lebanon",
    client_name: "Lebanese government",
    img: cp3,
  },
  {
    title: "JANNAT EL HUSSEIN",
    desc: "Private infrastructure, transportation, and facilities with contract value of $40 million.",
    date: "2019 - On going",
    location: "Karbalaa - Iraq",
    client_name: "IRCCO GROUP",
    img: cp4,
  },
  {
    title: "STUDY AND DESIGN OF UTILIZATION OF DAM WATER",
    desc: "Study, design and supervision of utilization of Dam water in various regions of the Kingdom of Saudia Arabia is developing concepts for the utilization of the water from several dams, located in the west and south-west of the Kingdom of Saudia Arabia",
    location: "Saudia Arabia",
    client_name: "Ministry of Environment Water & Agriculture Municipality",
    img: cp5,
  },
  {
    title: "CREATING A TRADITIONAL HERITAGE SQUARE",
    desc: "Creating a taditional public yard in Maroun Al Ras village for people there to use and enjoy. Preserving the heritage character in the area.",
    location: "Karbalaa - Iraq",
    client_name: "IRCCO GROUP",
    img: cp6,
  },
  {
    title: "CREATING A TRADITIONAL HERITAGESQUARE AROUND MOSQUE",
    desc: "Creating a public heritage square around the mosque in water in Maroun Al Ras village.",
    location: "South Governance-Maroun Al Ras Lebanon",
    client_name: "Municipality of Maroun al Ras",
    img: cp7,
  },
  {
    title: "ASSAHA EL-TURATHIYA - MAROUN EL RAS",
    desc: "",
    location: "",
    client_name: "",
    img: cp8,
  },
  {
    title: "RENNOVATION OF MAKAM BENYAMIN SITE",
    desc: "",
    location: "",
    client_name: "",
    img: cp9,
  },
];

const domestic_projects = [
  {
    title: "SOLAR POWERED WATER PUMP",
    desc: " 171 panels installed for a 70 HP PUMP",
    location: "Maroun Al Ras - Lebanon",
    date: "2023",
    img: dp1,
  },
  {
    title: "GHAZIEH ELECTRICAL STATION",
    desc: "250 Solar Panels Installed",
    location: "Ghazieh - South Lebanon",
    date: "2023",
    img: dp2,
  },
  {
    title: "SOLAR POWERED WATER PUMP",
    desc: "200 panel installed for a 75 HP PUMP",
    location: "Mazraat Mechref - South Lebanon",
    date: "2022",
    img: dp3,
  },
  {
    title: "MAATOUK STEAL FACTORY",
    desc: "210 Solar Panels Installed",
    location: "Toul - South Lebanon",
    date: "2023",
    img: dp4,
  },
];

const Project = ({ title, desc, date, location, client_name = "", img }) => {
  return (
    <div className="abp-p-card">
      <img src={img} alt={title} className="abp-p-img" />
      <div className="abp-p-overlay"></div>
      <div className="abp-p-info">
        <h3 className="abp-p-title">{title}</h3>
        <p className="abp-p-desc">{desc}</p>
        {location && (
          <p className="abp-p-details">
            {location} {date ? `| ${date}` : ""}
          </p>
        )}
        {client_name && <p className="abp-p-client">Client: {client_name}</p>}
      </div>
    </div>
  );
};

const ProjectsComponent = () => {
  return (
    <div className="abp-container">
      <div className="abp-header">
        <div className="abp-img-c">
          <img src={img} alt="" className="abp-img" />
        </div>

        <div className="abp-img-shadow"></div>

        <div className="abp-header-text">
          <div className="abp-title">
            Featured <div className="highlight">BOFFO </div> Projects
          </div>
        </div>

        <a href="#info" className="abp-arrow-c no-design no-default-design">
          <i className="abp-arrow bx bx-chevron-down"></i>
        </a>
      </div>
      <div className="abp-info" id="info">
        <div className="abp-cp-title">Construction Projects</div>
        <div className="abp-cp-container abp-projs-container">
          {construction_projects.map((project, i) => {
            return (
              <div className={`abp-p-container + abp-p-${i}}`} key={i}>
                <Project {...project} />
              </div>
            );
          })}
        </div>
        <div className="abp-dp-title">Domestic & Municipalities Projects</div>
        <div className="abp-dp-container abp-projs-container">
          {domestic_projects.map((project, i) => {
            return (
              <div className={`abp-p-container + abp-p-${i}}`} key={i}>
                <Project {...project} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectsComponent;
