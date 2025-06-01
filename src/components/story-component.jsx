"use client";

import "../css/components/about-story-component.css";
import img from "../assets/about-us/os.webp";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  Cpu,
  Users,
  HeartHandshake,
  Target,
  ChevronDown,
  Calendar,
  Award,
  Building2,
  Lightbulb,
} from "lucide-react";

// Counter animation hook
const useCounter = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const startCount = 0;
    const endCount = Number.parseInt(end.toString().replace(/\D/g, ""));

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endCount);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(endCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, end, duration]);

  return { count, ref: countRef };
};

const AboutStoryComponent = () => {
  const [activeSection, setActiveSection] = useState(null);
  const containerRef = useRef(null);
  const featuresRef = useRef(null);
  const historyImageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const featuresY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const historyImageY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const featuresYSpring = useSpring(featuresY, springConfig);
  const historyImageYSpring = useSpring(historyImageY, springConfig);

  // Counter hooks for statistics
  const foundedCounter = useCounter("2024", 1.5);
  const experienceCounter = useCounter("20", 2);
  const projectValueCounter = useCounter("50", 2.5);

  const handleSectionHover = (section) => {
    setActiveSection(section);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };

  // Enhanced animation variants
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

  // Micro-interaction variants
  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" },
  };

  const iconFloat = {
    y: [-2, 2, -2],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  return (
    <motion.section
      className="abst-container"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header section - unchanged as requested */}
      <header className="abst-header">
        <figure className="abst-img-c">
          <img
            src={img || "/placeholder.svg"}
            alt="About us background"
            className="abst-img"
            loading="lazy"
          />
        </figure>
        <div className="abst-img-shadow"></div>

        <div className="abst-header-text">
          <h1 className="abst-title">
            Forged Through <span className="highlight">Hard Work</span> and{" "}
            <span className="highlight">Dedication</span>
          </h1>
          <p className="abst-desc">
            From humble beginnings to a force in construction consultancy, BOFFO
            was built on expertise, resilience, and a commitment to excellence.
            With a foundation rooted in experience and a vision set on the
            future, our journey is defined by the projects we shape, the
            challenges we overcome, and the people who drive us forward.
          </p>
        </div>

        <motion.a
          href="#info"
          className="abst-arrow-c no-design no-default-design"
          aria-label="Scroll to company history"
          whileHover={buttonHover}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div animate={iconFloat}>
            <ChevronDown className="abst-arrow" />
          </motion.div>
        </motion.a>
      </header>

      <section className="abst-info" id="info">
        {/* Enhanced History Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="enhanced-history-section"
        >
          <div className="history-content">
            <motion.div variants={slideInLeft} className="history-text">
              <motion.div
                className="section-badge"
                whileHover={buttonHover}
                role="banner"
                aria-label="Our Journey section"
              >
                <Calendar className="badge-icon" aria-hidden="true" />
                <span>Our Journey</span>
              </motion.div>
              <h2 className="history-title">
                History and Founding of the Consulting Group
              </h2>
              <p className="history-description">
                BOFFO is a dynamic and innovative team composed of both seasoned
                experts and fresh talent. Our diverse group brings together
                civil engineers, architects, and economists, each contributing
                their unique perspective and skills.
              </p>
              <div
                className="history-stats"
                role="region"
                aria-label="Company statistics"
              >
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  ref={foundedCounter.ref}
                >
                  <span className="stat-number" aria-label="Founded in 2024">
                    {foundedCounter.count}
                  </span>
                  <span className="stat-label">Founded</span>
                </motion.div>
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  ref={experienceCounter.ref}
                >
                  <span
                    className="stat-number"
                    aria-label="20 plus years of experience"
                  >
                    {experienceCounter.count}+
                  </span>
                  <span className="stat-label">Years Experience</span>
                </motion.div>
                <motion.div
                  className="stat-item"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  ref={projectValueCounter.ref}
                >
                  <span
                    className="stat-number"
                    aria-label="50 million dollars plus project value"
                  >
                    ${projectValueCounter.count}M+
                  </span>
                  <span className="stat-label">Project Value</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={slideInRight}
              className="history-image"
              ref={historyImageRef}
              style={{ y: historyImageYSpring }}
            >
              <img
                src="https://img.freepik.com/premium-photo/antique-books-magnifying-glass-unraveling-history-knowledge-study-exploration-concept_875722-56210.jpg"
                alt="Team collaboration and planning session"
                className="history-img"
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <motion.div animate={iconFloat}>
                    <Building2 className="overlay-icon" aria-hidden="true" />
                  </motion.div>
                  <h4>Building Excellence</h4>
                  <p>Since 2024</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Features Overview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="features-overview-section"
          ref={featuresRef}
          style={{ y: featuresYSpring }}
        >
          <div className="features-overview-content">
            <div className="features-background">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Construction site overview showing our capabilities"
                className="features-bg-image"
              />
              <div className="features-overlay"></div>
            </div>
            <div className="features-overview-content-centered">
              <motion.div
                variants={staggerContainer}
                className="features-text-container"
              >
                <motion.div
                  variants={fadeInUp}
                  className="section-badge light"
                  whileHover={buttonHover}
                  role="banner"
                  aria-label="Our Capabilities section"
                >
                  <Award className="badge-icon" aria-hidden="true" />
                  <span>Our Capabilities</span>
                </motion.div>
                <motion.h2 variants={fadeInUp} className="features-title">
                  Our Features
                </motion.h2>
                <motion.p variants={fadeInUp} className="features-description">
                  Boffo undertakes an extensive range of civil construction
                  projects, with the ability to handle contracts valued under $1
                  million to major complex works in excess of $50 million. Our
                  highly experienced management and engineering teams work in
                  close collaboration with clients, project managers, and
                  principal consultants from preliminary design to ultimate
                  completion.
                </motion.p>
                <motion.div variants={fadeInUp} className="features-highlights">
                  <motion.div
                    className="highlight-item"
                    whileHover={{ scale: 1.05, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div animate={iconFloat}>
                      <Lightbulb
                        className="highlight-icon"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <span>Innovative Solutions</span>
                  </motion.div>
                  <motion.div
                    className="highlight-item"
                    whileHover={{ scale: 1.05, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div animate={iconFloat}>
                      <Users className="highlight-icon" aria-hidden="true" />
                    </motion.div>
                    <span>Expert Team</span>
                  </motion.div>
                  <motion.div
                    className="highlight-item"
                    whileHover={{ scale: 1.05, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div animate={iconFloat}>
                      <Target className="highlight-icon" aria-hidden="true" />
                    </motion.div>
                    <span>Precise Execution</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Feature Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="enhanced-features-grid"
        >
          <motion.div variants={fadeInUp} className="features-grid-header">
            <h2 className="grid-title">What Sets Us Apart</h2>
            <p className="grid-subtitle">
              Four pillars that define our approach to excellence
            </p>
          </motion.div>

          <div
            className="features-grid"
            role="region"
            aria-label="Our key features and capabilities"
          >
            <motion.article
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`enhanced-feature-card technology-card ${
                activeSection === "technology" ? "active" : ""
              }`}
              onMouseEnter={() => handleSectionHover("technology")}
              onMouseLeave={handleSectionLeave}
              onFocus={() => handleSectionHover("technology")}
              onBlur={handleSectionLeave}
              tabIndex={0}
              role="article"
              aria-labelledby="tech-title"
            >
              <div className="feature-card-background">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Advanced technology and digital tools in construction"
                  className="feature-bg-img"
                />
                <div className="feature-card-overlay"></div>
              </div>
              <div className="feature-card-content">
                <motion.div
                  className="feature-icon-container"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Cpu className="feature-icon" aria-hidden="true" />
                </motion.div>
                <h3 id="tech-title" className="feature-card-title">
                  Technology
                </h3>
                <p className="feature-card-text">
                  Boffo leverages cutting-edge technology to streamline
                  construction processes and deliver exceptional results. Our
                  digital tools and innovative solutions enable precise
                  planning, efficient execution, and comprehensive monitoring of
                  projects from start to finish.
                </p>
                <div
                  className="feature-tags"
                  role="list"
                  aria-label="Technology features"
                >
                  <span className="feature-tag" role="listitem">
                    Digital Tools
                  </span>
                  <span className="feature-tag" role="listitem">
                    Innovation
                  </span>
                  <span className="feature-tag" role="listitem">
                    Monitoring
                  </span>
                </div>
              </div>
            </motion.article>

            <motion.article
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`enhanced-feature-card people-card ${
                activeSection === "people" ? "active" : ""
              }`}
              onMouseEnter={() => handleSectionHover("people")}
              onMouseLeave={handleSectionLeave}
              onFocus={() => handleSectionHover("people")}
              onBlur={handleSectionLeave}
              tabIndex={0}
              role="article"
              aria-labelledby="people-title"
            >
              <div className="feature-card-background">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Team collaboration and professional development"
                  className="feature-bg-img"
                />
                <div className="feature-card-overlay"></div>
              </div>
              <div className="feature-card-content">
                <motion.div
                  className="feature-icon-container"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Users className="feature-icon" aria-hidden="true" />
                </motion.div>
                <h3 id="people-title" className="feature-card-title">
                  We Hire Great People
                </h3>
                <p className="feature-card-text">
                  We believe that the quality of workers will define business
                  success. We invest in people, upgrading technical and
                  management skills through regular training programs and
                  creating a culture of excellence.
                </p>
                <div
                  className="feature-tags"
                  role="list"
                  aria-label="People development features"
                >
                  <span className="feature-tag" role="listitem">
                    Training
                  </span>
                  <span className="feature-tag" role="listitem">
                    Excellence
                  </span>
                  <span className="feature-tag" role="listitem">
                    Growth
                  </span>
                </div>
              </div>
            </motion.article>

            <motion.article
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`enhanced-feature-card customers-card ${
                activeSection === "customers" ? "active" : ""
              }`}
              onMouseEnter={() => handleSectionHover("customers")}
              onMouseLeave={handleSectionLeave}
              onFocus={() => handleSectionHover("customers")}
              onBlur={handleSectionLeave}
              tabIndex={0}
              role="article"
              aria-labelledby="customers-title"
            >
              <div className="feature-card-background">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Customer satisfaction and business relationships"
                  className="feature-bg-img"
                />
                <div className="feature-card-overlay"></div>
              </div>
              <div className="feature-card-content">
                <motion.div
                  className="feature-icon-container"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <HeartHandshake className="feature-icon" aria-hidden="true" />
                </motion.div>
                <h3 id="customers-title" className="feature-card-title">
                  We Put Customers First
                </h3>
                <p className="feature-card-text">
                  We make sure to deliver on our promises with integrity. We
                  believe that effective planning with efficient design and
                  quality will result in the most successful construction
                  project and client satisfaction.
                </p>
                <div
                  className="feature-tags"
                  role="list"
                  aria-label="Customer service features"
                >
                  <span className="feature-tag" role="listitem">
                    Integrity
                  </span>
                  <span className="feature-tag" role="listitem">
                    Quality
                  </span>
                  <span className="feature-tag" role="listitem">
                    Satisfaction
                  </span>
                </div>
              </div>
            </motion.article>

            <motion.article
              variants={scaleIn}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`enhanced-feature-card execute-card ${
                activeSection === "execute" ? "active" : ""
              }`}
              onMouseEnter={() => handleSectionHover("execute")}
              onMouseLeave={handleSectionLeave}
              onFocus={() => handleSectionHover("execute")}
              onBlur={handleSectionLeave}
              tabIndex={0}
              role="article"
              aria-labelledby="execute-title"
            >
              <div className="feature-card-background">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Project execution and construction management"
                  className="feature-bg-img"
                />
                <div className="feature-card-overlay"></div>
              </div>
              <div className="feature-card-content">
                <motion.div
                  className="feature-icon-container"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Target className="feature-icon" aria-hidden="true" />
                </motion.div>
                <h3 id="execute-title" className="feature-card-title">
                  We Always Execute
                </h3>
                <p className="feature-card-text">
                  We know how to get a project started and finished in the best
                  possible and most efficient way, ensuring timely delivery
                  without compromising on quality or safety standards.
                </p>
                <div
                  className="feature-tags"
                  role="list"
                  aria-label="Execution features"
                >
                  <span className="feature-tag" role="listitem">
                    Efficiency
                  </span>
                  <span className="feature-tag" role="listitem">
                    Quality
                  </span>
                  <span className="feature-tag" role="listitem">
                    Safety
                  </span>
                </div>
              </div>
            </motion.article>
          </div>
        </motion.div>

        {/* Floating Progress Indicator */}
        <motion.div
          className="progress-indicator"
          style={{
            scaleX: scrollYProgress,
          }}
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuenow={Math.round(scrollYProgress.get() * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </section>
    </motion.section>
  );
};

export default AboutStoryComponent;
