"use client";

import "../css/components/about-component.css";
import img from "../assets/about-us/about-header.webp";
import { Link } from "react-router-dom";
import ScrollRevealWrapper from "../common/ScrollRevealWrapper";
import { useState } from "react";
import {
  Target,
  Eye,
  Workflow,
  Users,
  ChevronDown,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

const AboutComponent = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionHover = (section) => {
    setActiveSection(section);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };

  return (
    <main className="abt-container">
      <header className="abt-header">
        <div className="abt-img-c">
          <img
            src={img || "/placeholder.svg"}
            alt="About us header"
            className="abt-img"
            loading="lazy"
          />
        </div>

        <div className="abt-img-shadow"></div>

        <div className="abt-header-text">
          <h1 className="abt-title">
            A <span className="highlight">Passion</span> for Problem Solving.
          </h1>

          <p className="abt-desc">
            BOFFO Consulting Group is a premier consulting firm specializing in
            construction and management services. With a commitment to
            excellence and a focus on delivering high-quality solutions, BOFFO
            has established itself as a trusted partner for a diverse range of
            clients, including residential, commercial, and municipal projects.
          </p>
        </div>

        <a
          href="#info"
          className="abt-arrow-c no-design no-default-design"
          aria-label="Scroll down"
        >
          <ChevronDown className="abt-arrow" />
        </a>
      </header>

      <section className="abt-info mt-5" id="info">
        <ScrollRevealWrapper animation="fade">
          <div className="about-section py-5">
            <div className="container">
              <div className="text">
                <h3 className="title">Who We Are</h3>
                <p className="desc">
                  "We provide quantitative value at every level, that can be
                  relied upon in order to enhance your project." Boffo provides
                  a broad spectrum of services relative to projects in both
                  public and private sectors. We approach each situation with a
                  "team mentality", understanding that the ability to lend our
                  expertise is an integral part of the success of your project.
                </p>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper animation="fade" delay={200}>
          <div
            className="info-box m-3 m-auto lg border-none about-section abt-impact"
            aria-labelledby="impact-title"
          >
            <h2 id="impact-title" className="title">
              Our Impact
            </h2>
            <p className="desc">
              BOFFO Consulting has successfully completed projects across
              multiple regions, contributing to national development and
              economic growth. From large-scale infrastructure projects to
              detailed architectural designs, we take pride in shaping skylines
              and enhancing communities.
            </p>
            <Link to="/about-us/projects" className="link">
              Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper animation="fade" delay={300}>
          <div className="abt-mv-container info-box-list mt-0 pt-0 pb-3">
            <div
              className={`info-box lg about-section py-5 feature-card ${
                activeSection === "mission" ? "active" : ""
              }`}
              onMouseEnter={() => handleSectionHover("mission")}
              onMouseLeave={handleSectionLeave}
            >
              <div className="feature-content">
                <div className="feature-icon-container">
                  <Target className="feature-icon" />
                </div>
                <h3 className="title">Our Mission</h3>
                <p className="desc">
                  To provide innovative, sustainable, and efficient construction
                  and management solutions that exceed client expectations and
                  contribute to the advancement of the built environment.
                </p>
              </div>
              <div className="feature-image-container">
                <div className="feature-image mission-image">
                  <div className="overlay-content">
                    <h4>Key Mission Points</h4>
                    <ul>
                      <li>Innovative Solutions</li>
                      <li>Sustainable Practices</li>
                      <li>Client Satisfaction</li>
                      <li>Industry Advancement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`info-box lg about-section py-5 feature-card ${
                activeSection === "vision" ? "active" : ""
              }`}
              onMouseEnter={() => handleSectionHover("vision")}
              onMouseLeave={handleSectionLeave}
            >
              <div className="feature-content">
                <div className="feature-icon-container">
                  <Eye className="feature-icon" />
                </div>
                <h3 className="title">Our Vision</h3>
                <p className="text">
                  To be a leading consulting firm recognized for our expertise,
                  integrity, and commitment to delivering exceptional results
                  that shape the future of construction and infrastructure
                  development.
                </p>
              </div>
              <div className="feature-image-container">
                <div className="feature-image vision-image">
                  <div className="overlay-content">
                    <h4>Vision Pillars</h4>
                    <ul>
                      <li>Industry Leadership</li>
                      <li>Technical Excellence</li>
                      <li>Ethical Standards</li>
                      <li>Future-Focused Solutions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper animation="fade" delay={300}>
          <div className="abt-mv-container info-box-list pt-0">
            <div
              className={`info-box about-section lg py-5 feature-card ${
                activeSection === "structure" ? "active" : ""
              }`}
              onMouseEnter={() => handleSectionHover("structure")}
              onMouseLeave={handleSectionLeave}
            >
              <div className="feature-content">
                <div className="feature-icon-container">
                  <Workflow className="feature-icon" />
                </div>
                <h3 className="title">Our Organizational Structure</h3>
                <p className="desc">
                  The strategic Management committee comprises the Executive
                  Board and the Corporate Centers of the Group. This control
                  level is responsible for the strategic and organizational
                  development. Duties delegate by the board of directors to
                  executive board which comprises the marketing committee,
                  finance committee, projects committee, and operations
                  committee.
                </p>
              </div>
              <div className="feature-image-container">
                <div className="feature-image structure-image">
                  <div className="overlay-content">
                    <h4>Organizational Divisions</h4>
                    <div className="org-chart">
                      <div className="org-level board">Board of Directors</div>
                      <div className="org-level executive">Executive Board</div>
                      <div className="org-branches">
                        <div className="org-branch">Marketing</div>
                        <div className="org-branch">Finance</div>
                        <div className="org-branch">Projects</div>
                        <div className="org-branch">Operations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`info-box about-section lg py-5 feature-card ${
                activeSection === "alignment" ? "active" : ""
              }`}
              onMouseEnter={() => handleSectionHover("alignment")}
              onMouseLeave={handleSectionLeave}
            >
              <div className="feature-content">
                <div className="feature-icon-container">
                  <Users className="feature-icon" />
                </div>
                <h3 className="title">& Operational Alignment</h3>
                <p className="desc">
                  With more than 15 years of accumulated experience, we believe
                  investing in our people and upgrading their skills is the key
                  to success. Our aim is to stay relevant in the ever-changing
                  marketplace by aligning our operations with industry best
                  practices and emerging technologies.
                </p>
              </div>
              <div className="feature-image-container">
                <div className="feature-image alignment-image">
                  <div className="overlay-content">
                    <h4>Alignment Strategies</h4>
                    <ul>
                      <li>Continuous Training</li>
                      <li>Technology Integration</li>
                      <li>Process Optimization</li>
                      <li>Cross-Functional Collaboration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper animation="fade" delay={200}>
          <div className="abt-stat-container">
            <div className="wrapper">
              <div className="container">
                <div className="text">
                  <span className="header">OUR PURPOSE</span>
                  <h2 className="title">Creating value that matters</h2>
                  <p className="desc-r1">
                    At BOFFO Consulting Group, we turn your goals into reality
                    through smart, sustainable solutions. With expert insight
                    and advanced tech, we cut costs, boost quality, and tailor
                    every project to your needs.
                  </p>
                  <p className="desc-r2">
                    We build trust-driven partnerships through personalized
                    consulting focused on your success. With BOFFO, you gain a
                    dedicated ally in driving growth and shaping the built
                    environment.
                  </p>
                  <div className="stats">
                    <div className="item">
                      <div className="stat-number">16+</div>
                      <p className="desc">Projects worldwide</p>
                    </div>
                    <div className="item">
                      <div className="stat-number">15+</div>
                      <p className="desc">Employees & experience</p>
                    </div>
                    <div className="item">
                      <div className="stat-number">6+</div>
                      <p className="desc">Countries with presence</p>
                    </div>
                  </div>
                </div>
                <div className="img-c">
                  <div className="wrapper">
                    <img
                      src={
                        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81" ||
                        "/placeholder.svg"
                      }
                      alt=""
                      className="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
      </section>
    </main>
  );
};

export default AboutComponent;
