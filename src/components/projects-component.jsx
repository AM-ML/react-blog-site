"use client";

import "../css/components/projects-component.css";
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
import ScrollRevealWrapper from "../common/ScrollRevealWrapper";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { MapPin, Calendar, Building, ChevronDown, Tag, X } from "lucide-react";

// Define different heights for project cards to create visual interest
const getRandomHeight = () => {
  const heights = [200, 220, 250, 280];
  return heights[Math.floor(Math.random() * heights.length)];
};

const construction_projects = [
  {
    title: "GREATER BEIRUT WATER SUPPLY PROJECT",
    desc: "The construction of a series of tunnels and pipelines to convey water from the existing hydroelectric power system tunnel near the village of joun some 30 km south of beirut to the site of proposed reservoirs at Hadath90 and Hadath125 in south of beirut.",
    date: "2016 - On going",
    location: "Lebanon",
    client_name: "Lebanese government- CDR",
    img: cp1,
    category: "Infrastructure",
    imgHeight: getRandomHeight(),
  },
  {
    title: "MUNICIPALITIES FACILITIES",
    desc: "Public infrastructure, transportation, physical assets and facilities with contract value of $1.5 million.",
    date: "2014-2016",
    location: "Lebanon",
    client_name: "Lebanese government- Nabatieh Region Municipality",
    img: cp2,
    category: "Public Facilities",
    imgHeight: getRandomHeight(),
  },
  {
    title:
      "ELECTRICAL SUBSTATION -ZAHRANE-TYRE-SAIDA | CIVIL & ELECTRICAL WORK",
    desc: "Manufacturing, erection, testing and commissioning of 76 cubicles type univer C ( ABB SACE) In addition, Boffo was in charge of manufacturing, erection commissioning and testing of control panels including civil work modification",
    date: "2015 - 2016",
    location: "Lebanon",
    client_name: "Lebanese government",
    img: cp3,
    category: "Electrical",
    imgHeight: getRandomHeight(),
  },
  {
    title: "JANNAT EL HUSSEIN",
    desc: "Private infrastructure, transportation, and facilities with contract value of $40 million.",
    date: "2019 - On going",
    location: "Karbalaa - Iraq",
    client_name: "IRCCO GROUP",
    img: cp4,
    category: "Private Infrastructure",
    imgHeight: getRandomHeight(),
  },
  {
    title: "STUDY AND DESIGN OF UTILIZATION OF DAM WATER",
    desc: "Study, design and supervision of utilization of Dam water in various regions of the Kingdom of Saudia Arabia is developing concepts for the utilization of the water from several dams, located in the west and south-west of the Kingdom of Saudia Arabia",
    location: "Saudia Arabia",
    client_name: "Ministry of Environment Water & Agriculture Municipality",
    img: cp5,
    category: "Water Management",
    imgHeight: getRandomHeight(),
  },
  {
    title: "CREATING A TRADITIONAL HERITAGE SQUARE",
    desc: "Creating a taditional public yard in Maroun Al Ras village for people there to use and enjoy. Preserving the heritage character in the area.",
    location: "Karbalaa - Iraq",
    client_name: "IRCCO GROUP",
    img: cp6,
    category: "Heritage",
    imgHeight: getRandomHeight(),
  },
  {
    title: "CREATING A TRADITIONAL HERITAGE SQUARE AROUND MOSQUE",
    desc: "Creating a public heritage square around the mosque in water in Maroun Al Ras village.",
    location: "South Governance-Maroun Al Ras Lebanon",
    client_name: "Municipality of Maroun al Ras",
    img: cp7,
    category: "Heritage",
    imgHeight: getRandomHeight(),
  },
  {
    title: "ASSAHA EL-TURATHIYA - MAROUN EL RAS",
    desc: "Traditional public square development project focused on preserving cultural heritage while creating functional community spaces.",
    location: "Maroun El Ras, Lebanon",
    client_name: "Local Municipality",
    img: cp8,
    category: "Public Space",
    imgHeight: getRandomHeight(),
  },
  {
    title: "RENNOVATION OF MAKAM BENYAMIN SITE",
    desc: "Historical site renovation project aimed at preserving cultural significance while improving visitor facilities and accessibility.",
    location: "Lebanon",
    client_name: "Heritage Foundation",
    img: cp9,
    category: "Renovation",
    imgHeight: getRandomHeight(),
  },
];

const domestic_projects = [
  {
    title: "SOLAR POWERED WATER PUMP",
    desc: "171 panels installed for a 70 HP PUMP, providing sustainable energy for water distribution in rural areas.",
    location: "Maroun Al Ras - Lebanon",
    date: "2023",
    img: dp1,
    category: "Renewable Energy",
    imgHeight: getRandomHeight(),
  },
  {
    title: "GHAZIEH ELECTRICAL STATION",
    desc: "250 Solar Panels Installed to power local electrical infrastructure, reducing dependency on traditional power sources.",
    location: "Ghazieh - South Lebanon",
    date: "2023",
    img: dp2,
    category: "Renewable Energy",
    imgHeight: getRandomHeight(),
  },
  {
    title: "SOLAR POWERED WATER PUMP",
    desc: "200 panel installed for a 75 HP PUMP, creating an efficient and environmentally friendly water distribution system.",
    location: "Mazraat Mechref - South Lebanon",
    date: "2022",
    img: dp3,
    category: "Renewable Energy",
    imgHeight: getRandomHeight(),
  },
  {
    title: "MAATOUK STEAL FACTORY",
    desc: "210 Solar Panels Installed to power industrial operations, significantly reducing operational costs and environmental impact.",
    location: "Toul - South Lebanon",
    date: "2023",
    img: dp4,
    category: "Industrial",
    imgHeight: getRandomHeight(),
  },
];

const Project = ({
  title,
  desc,
  date,
  location,
  client_name = "",
  img,
  category,
  imgHeight,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleExpand = (e) => {
    e.stopPropagation(); // Prevent event bubbling

    // Instead of expanding in-place, show a modal with details
    if (desc) {
      setShowModal(true);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = ""; // Re-enable scrolling
  };

  return (
    <>
      <div className="abp-p-card" onClick={desc ? handleExpand : undefined}>
        <div
          className="abp-p-img-container"
          style={{ height: `${imgHeight}px` }}
        >
          <img
            src={img || "/placeholder.svg"}
            alt={title}
            className="abp-p-img"
          />
          <div className="abp-p-overlay"></div>
          {category && (
            <div className="abp-p-category">
              <Tag size={14} />
              <span>{category}</span>
            </div>
          )}
        </div>
        <div className="abp-p-info">
          <h3 className="abp-p-title">{title}</h3>

          <div className="abp-p-basic-info">
            {location && (
              <p className="abp-p-details">
                <span className="abp-p-location">
                  <MapPin size={16} /> {location}
                </span>
                {date && (
                  <span className="abp-p-date">
                    <Calendar size={16} /> {date}
                  </span>
                )}
              </p>
            )}
            {client_name && (
              <p className="abp-p-client">
                <Building size={16} /> Client: {client_name}
              </p>
            )}
          </div>

          {desc && (
            <div className="abp-p-expand-indicator">
              <ChevronDown size={18} />
              <span>View Details</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal for expanded view */}
      {showModal &&
        ReactDOM.createPortal(
          <div className="project-modal-overlay" onClick={closeModal}>
            <div
              className="project-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={24} />
              </button>

              <div className="modal-image-container">
                <img
                  src={img || "/placeholder.svg"}
                  alt={title}
                  className="modal-image"
                />
                {category && (
                  <div className="modal-category">
                    <Tag size={14} />
                    <span>{category}</span>
                  </div>
                )}
              </div>

              <div className="modal-info">
                <h2 className="modal-title">{title}</h2>

                <div className="modal-details">
                  {location && (
                    <span className="modal-location">
                      <MapPin size={18} /> {location}
                    </span>
                  )}
                  {date && (
                    <span className="modal-date">
                      <Calendar size={18} /> {date}
                    </span>
                  )}
                  {client_name && (
                    <span className="modal-client">
                      <Building size={18} /> Client: {client_name}
                    </span>
                  )}
                </div>

                <div className="modal-description">
                  <h3>Project Description</h3>
                  <p>{desc}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

const ProjectsComponent = () => {
  return (
    <section className="abp-container">
      <section className="abp-info" id="info">
        <div className="section-header">
          <ScrollRevealWrapper animation="fade">
            <h2 className="abp-section-title abp-cp-title">
              <span className="abp-section-title-underline">
                Construction Projects
              </span>
            </h2>
          </ScrollRevealWrapper>
        </div>

        <div className="abp-cp-container abp-projs-container">
          {construction_projects.map((project, i) => (
            <ScrollRevealWrapper key={i} animation="fade" delay={(i % 3) * 100}>
              <div className="abp-p-container">
                <Project {...project} />
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        <div className="section-header">
          <ScrollRevealWrapper animation="fade">
            <h2 className="abp-section-title abp-dp-title">
              <span className="abp-section-title-underline">
                Domestic & Municipalities Projects
              </span>
            </h2>
          </ScrollRevealWrapper>
        </div>

        <div className="abp-dp-container abp-projs-container">
          {domestic_projects.map((project, i) => (
            <ScrollRevealWrapper key={i} animation="fade" delay={(i % 3) * 100}>
              <div className="abp-p-container">
                <Project {...project} />
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProjectsComponent;
