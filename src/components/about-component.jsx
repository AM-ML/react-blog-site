import "../css/components/about-component.css";
import img from "../assets/about-us/about-header.webp";
import { Link } from "react-router-dom";

const AboutComponent = () => {
  return (
    <main className="abt-container">
      <header className="abt-header">
        <div className="abt-img-c">
          <img
            src={img}
            alt="About us header"
            className="abt-img"
            loading="lazy" // Lazy load the image
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
          <i className="abt-arrow bx bx-chevron-down"></i>
        </a>
      </header>

      <section className="abt-info mt-5" id="info">
        <div className="about-section py-5">
          <div className="container">
            <div className="text">
              <h3 className="title">Who We Are</h3>
              <p className="desc">
                "We provide quantitative value at every level, that can be
                relied upon in order to enhance your project." Boffo provides a
                broad spectrum of services relative to projects in both public
                and private sectors. We approach each situation with a "team
                mentality", understanding that the ability to lend our expertise
                is an integral part of the success of your project.
              </p>
            </div>
          </div>
        </div>
        <div
          className="info-box m-3 m-auto lg border-none about-section abt-impact"
          aria-labelledby="impact-title"
        >
          <h2 id="impact-title" className="title">
            Our Impact
          </h2>
          <p className="desc">
            BOFFO Consulting has successfully completed projects across multiple
            regions, contributing to national development and economic growth.
            From large-scale infrastructure projects to detailed architectural
            designs, we take pride in shaping skylines and enhancing
            communities.
          </p>
          <Link to="/about-us/projects" className="link">
            Learn more{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-up-right ml-1 h-4 w-4"
              data-lov-id="src/pages/Index.tsx:220:22"
              data-lov-name="ArrowUpRight"
              data-component-path="src/pages/Index.tsx"
              data-component-line="220"
              data-component-file="Index.tsx"
              data-component-name="ArrowUpRight"
              data-component-content="%7B%22className%22%3A%22ml-1%20h-4%20w-4%22%7D"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </Link>
        </div>

        <div className="abt-mv-container info-box-list mt-0 pt-0 pb-3">
          <div className="info-box lg about-section py-5">
            <h3 className="title">Our Mission</h3>
            <p className="desc">
              To provide innovative, sustainable, and efficient construction and
              management solutions that exceed client expectations and
              contribute to the advancement of the built environment.
            </p>
          </div>
          <div className="info-box lg about-section py-5">
            <h3 className="title">Our Vision</h3>
            <p className="text">
              To be a leading consulting firm recognized for our expertise,
              integrity, and commitment to delivering exceptional results.
            </p>
          </div>
        </div>

        <div className="abt-mv-container info-box-list pt-0">
          <div className="info-box about-section lg py-5">
            <h3 className="title">Our Organizational Structure</h3>
            <p className="desc">
              The strategic Management committee comprises the Executive Board
              and the Corporate Centers of the Group. This control level is
              responsible for the strategic and organizational development.
              Duties delegate by the board of directors to executive board which
              comprises the marketing committee, finance committee, projects
              committee, and operations committee.
            </p>
          </div>
          <div className="info-box about-section lg py-5">
            <h3 className="title">& Operational Alignment</h3>
            <p className="desc">
              With more than 15 years of accumulated experience, we believe
              investing in our people and upgrading their skills is the key to
              success. Our aim is to stay relevant in the ever-changing
              marketplace.
            </p>
          </div>
        </div>

        <div className="abt-stat-container">
          <div className="wrapper">
            <div className="container">
              <div className="text">
                <span className="header">OUR PURPOSE</span>
                <h2 className="title">Creating value that matters</h2>
                <p className="desc-r1">
                  For over two decades, we've been helping organizations solve
                  their most pressing challenges. We combine deep industry
                  expertise, advanced analytics, and innovative approaches to
                  help our clients shape their futures.
                </p>
                <p className="desc-r2">
                  Our firm is designed to operate as one—a single global
                  partnership united by a strong set of values, including an
                  unrelenting commitment to serving our clients with distinction
                  and integrity.
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
                      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                    }
                    alt=""
                    className="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutComponent;
