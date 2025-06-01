"use client";

import "../css/components/about-component.css";
import img from "../assets/about-us/overview-hero-bg.webp";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  Eye,
  Workflow,
  Users,
  ChevronDown,
  ArrowUpRight,
  Award,
  Globe,
  Building,
  TrendingUp,
} from "lucide-react";

const AboutComponent = () => {
  const [activeSection, setActiveSection] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const handleSectionHover = (section) => {
    setActiveSection(section);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.02,
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const slideInLeft = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const slideInRight = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <motion.main
      className="abt-container"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header section - unchanged as requested */}
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
        {/* Who We Are Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="about-section py-5"
        >
          <div className="container">
            <div className="text">
              <motion.h3 className="title" variants={fadeInUp}>
                Who We Are
              </motion.h3>
              <motion.p className="desc" variants={fadeInUp}>
                "We provide quantitative value at every level, that can be
                relied upon in order to enhance your project." Boffo provides a
                broad spectrum of services relative to projects in both public
                and private sectors. We approach each situation with a "team
                mentality", understanding that the ability to lend our expertise
                is an integral part of the success of your project.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Impact Section with Background Image */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scaleIn}
          className="impact-section-enhanced mx-12"
        >
          <div className="impact-background">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Modern cityscape"
              className="impact-bg-image"
            />
            <div className="impact-overlay"></div>
          </div>
          <div className="impact-content">
            <motion.div
              variants={staggerContainer}
              className="impact-text-container"
            >
              <motion.h2 variants={fadeInUp} className="impact-title">
                Our Global Impact
              </motion.h2>
              <motion.p variants={fadeInUp} className="impact-description">
                BOFFO Consulting has successfully completed projects across
                multiple regions, contributing to national development and
                economic growth. From large-scale infrastructure projects to
                detailed architectural designs, we take pride in shaping
                skylines and enhancing communities.
              </motion.p>
              <motion.div variants={fadeInUp} className="impact-stats-grid">
                <div className="impact-stat">
                  <Globe className="impact-stat-icon" />
                  <span className="impact-stat-number">6+</span>
                  <span className="impact-stat-label">Countries</span>
                </div>
                <div className="impact-stat">
                  <Building className="impact-stat-icon" />
                  <span className="impact-stat-number">16+</span>
                  <span className="impact-stat-label">Projects</span>
                </div>
                <div className="impact-stat">
                  <Award className="impact-stat-icon" />
                  <span className="impact-stat-number">15+</span>
                  <span className="impact-stat-label">Years Experience</span>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="impact-cta-button">
                <Link to="/about-us/projects" className="impact-cta-button">
                  Explore Our Projects <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Purpose Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="abt-stat-container py-0"
        >
          <div className="wrapper">
            <div className="container">
              <motion.div variants={slideInLeft} className="text">
                <span className="header">OUR PURPOSE</span>
                <h2 className="title">Creating value that matters</h2>
                <p className="desc-r1">
                  At BOFFO Consulting Group, we turn your goals into reality
                  through smart, sustainable solutions. With expert insight and
                  advanced tech, we cut costs, boost quality, and tailor every
                  project to your needs.
                </p>
                <p className="desc-r2">
                  We build trust-driven partnerships through personalized
                  consulting focused on your success. With BOFFO, you gain a
                  dedicated ally in driving growth and shaping the built
                  environment.
                </p>
                <motion.div variants={staggerContainer} className="stats">
                  <motion.div variants={scaleIn} className="item">
                    <div className="stat-number">16+</div>
                    <p className="desc">Projects worldwide</p>
                  </motion.div>
                  <motion.div variants={scaleIn} className="item">
                    <div className="stat-number">15+</div>
                    <p className="desc">Employees & experience</p>
                  </motion.div>
                  <motion.div variants={scaleIn} className="item">
                    <div className="stat-number">6+</div>
                    <p className="desc">Countries with presence</p>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div variants={slideInRight} className="img-c">
                <div className="wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                    alt="Construction team collaboration"
                    className="img"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Mission & Vision Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="enhanced-cards-section"
        >
          <motion.div variants={fadeInUp} className="section-header">
            <h2 className="section-title">Our Foundation</h2>
          </motion.div>

          <div className="cards-grid mt-5">
            <motion.div
              variants={slideInLeft}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="enhanced-card mission-card"
            >
              <div className="card-content">
                <div className="card-icon-container">
                  <Target className="card-icon m-0" />
                </div>
                <h3 className="card-title">Our Mission</h3>
                <p className="card-description">
                  To provide innovative, sustainable, and efficient construction
                  and management solutions that exceed client expectations and
                  contribute to the advancement of the built environment.
                </p>
                <div className="card-features">
                  <span className="feature-tag">Innovation</span>
                  <span className="feature-tag">Sustainability</span>
                  <span className="feature-tag">Excellence</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="enhanced-card vision-card"
            >
              <div className="card-content">
                <div className="card-icon-container">
                  <Eye className="card-icon m-0" />
                </div>
                <h3 className="card-title">Our Vision</h3>
                <p className="card-description">
                  To be a leading consulting firm recognized for our expertise,
                  integrity, and commitment to delivering exceptional results
                  that shape the future of construction and infrastructure
                  development.
                </p>
                <div className="card-features">
                  <span className="feature-tag">Leadership</span>
                  <span className="feature-tag">Integrity</span>
                  <span className="feature-tag">Future-Ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Organizational Structure */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="org-structure-section-white"
        >
          <motion.div variants={fadeInUp} className="section-header">
            <h2 className="section-title">Organizational Excellence</h2>
          </motion.div>

          <div className="org-cards-grid">
            <motion.div
              variants={slideInLeft}
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ duration: 0.2 }}
              className="org-card structure-card"
            >
              <div className="org-card-background">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Organizational structure"
                  className="org-bg-image"
                />
                <div className="org-card-overlay"></div>
              </div>
              <div className="org-card-content">
                <div className="org-icon-container">
                  <Workflow className="org-icon" />
                </div>
                <h3 className="org-card-title">Strategic Structure</h3>
                <p className="org-card-description">
                  The strategic Management committee comprises the Executive
                  Board and the Corporate Centers of the Group. This control
                  level is responsible for the strategic and organizational
                  development.
                </p>
                <div className="org-hierarchy">
                  <div className="hierarchy-level board">
                    Board of Directors
                  </div>
                  <div className="hierarchy-level executive">
                    Executive Board
                  </div>
                  <div className="hierarchy-branches">
                    <span className="branch">Marketing</span>
                    <span className="branch">Finance</span>
                    <span className="branch">Projects</span>
                    <span className="branch">Operations</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ duration: 0.2 }}
              className="org-card alignment-card"
            >
              <div className="org-card-background">
                <img
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Team alignment"
                  className="org-bg-image"
                />
                <div className="org-card-overlay"></div>
              </div>
              <div className="org-card-content">
                <div className="org-icon-container">
                  <Users className="org-icon" />
                </div>
                <h3 className="org-card-title">Operational Alignment</h3>
                <p className="org-card-description">
                  With more than 15 years of accumulated experience, we believe
                  investing in our people and upgrading their skills is the key
                  to success. Our aim is to stay relevant in the ever-changing
                  marketplace.
                </p>
                <div className="alignment-features">
                  <div className="alignment-item">
                    <TrendingUp className="alignment-icon" />
                    <span>Continuous Growth</span>
                  </div>
                  <div className="alignment-item">
                    <Award className="alignment-icon" />
                    <span>Best Practices</span>
                  </div>
                  <div className="alignment-item">
                    <Globe className="alignment-icon" />
                    <span>Global Standards</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Progress Indicator */}
        <motion.div
          className="progress-indicator"
          style={{
            scaleX: scrollYProgress,
          }}
        />
      </section>
    </motion.main>
  );
};

export default AboutComponent;
