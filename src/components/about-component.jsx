import "../css/components/about-component.css";
import img from "../assets/about-us/about-header.webp";
import projIcon from "../assets/about-us/proj-icon.png";
import empIcon from "../assets/about-us/emp-icon.png";
import countIcon from "../assets/about-us/count-icon.png";
import comp1 from "../assets/about-us/comp/comp_1.png";
import comp2 from "../assets/about-us/comp/comp_2.png";
import comp3 from "../assets/about-us/comp/comp_3.png";
import comp4 from "../assets/about-us/comp/comp_4.png";
import comp5 from "../assets/about-us/comp/comp_5.png";
import comp6 from "../assets/about-us/comp/comp_6.png";
import comp7 from "../assets/about-us/comp/comp_7.png";
import comp8 from "../assets/about-us/comp/comp_8.png";
import industries from "../assets/about-us/industries.jpg";

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

      <section className="abt-info" id="info">
        <div className="abt-i-container shadow" aria-labelledby="impact-title">
          <h2 id="impact-title" className="title">
            Our Impact
          </h2>
          <p className="text">
            BOFFO Consulting has successfully completed projects across multiple
            regions, contributing to national development and economic growth.
            From large-scale infrastructure projects to detailed architectural
            designs, we take pride in shaping skylines and enhancing
            communities.
          </p>
        </div>

        <div className="abt-mv-container row">
          <div className="col shadow">
            <h3 className="title">Our Mission</h3>
            <p className="text">
              To provide innovative, sustainable, and efficient construction and
              management solutions that exceed client expectations and
              contribute to the advancement of the built environment.
            </p>
          </div>
          <div className="col shadow">
            <h3 className="title">Our Vision</h3>
            <p className="text">
              To be a leading consulting firm recognized for our expertise,
              integrity, and commitment to delivering exceptional results.
            </p>
          </div>
        </div>

        <div className="abt-mv-container row">
          <div className="col shadow">
            <h3 className="title">Our Organizational Structure</h3>
            <p className="text">
              The strategic Management committee comprises the Executive Board
              and the Corporate Centers of the Group. This control level is
              responsible for the strategic and organizational development.
              Duties delegate by the board of directors to executive board which
              comprises the marketing committee, finance committee, projects
              committee, and operations committee.
            </p>
          </div>
          <div className="col shadow">
            <h3 className="title">& Operational Alignment</h3>
            <p className="text">
              With more than 15 years of accumulated experience, we believe
              investing in our people and upgrading their skills is the key to
              success. Our aim is to stay relevant in the ever-changing
              marketplace.
            </p>
          </div>
        </div>

        <div className="abt-stat-container">
          <div className="abt-stat-item">
            <div className="abt-row-1">
              <img
                src={projIcon}
                alt="Projects Icon"
                className="abt-img"
                loading="lazy"
              />
              <div className="abt-number">16+</div>
            </div>
            <p className="abt-text">
              Covering the entire value chain in the construction industry.
              We've executed international Infrastructure, Building
              Construction, and Civil Engineering projects.
            </p>
          </div>
          <div className="abt-stat-item">
            <div className="abt-row-1">
              <img
                src={empIcon}
                alt="Employees Icon"
                className="abt-img"
                loading="lazy"
              />
              <div className="abt-number">15+</div>
            </div>
            <p className="abt-text">
              Our employees, with their dedication, experience, and
              extraordinary technical knowledge, made us who we are today.
            </p>
          </div>
          <div className="abt-stat-item">
            <div className="abt-row-1">
              <img
                src={countIcon}
                alt="Countries Icon"
                className="abt-img"
                loading="lazy"
              />
              <div className="abt-number">6+</div>
            </div>
            <p className="abt-text">
              With the vision of being a worldwide reference in the Construction
              industry, we are executing projects in Algeria, Qatar, Oman, Iraq,
              Saudi Arabia, and Lebanon.
            </p>
          </div>
        </div>

        <div className="abt-wd-container">
          <div className="abt-img-c">
            <img
              src={industries}
              alt="Industries"
              className="abt-img"
              loading="lazy"
            />
          </div>
          <div className="abt-text">
            <h3 className="title">What We Do</h3>
            <p className="text">
              "We provide quantitative value at every level, that can be relied
              upon in order to enhance your project." Boffo provides a broad
              spectrum of services relative to projects in both public and
              private sectors. We approach each situation with a "team
              mentality", understanding that the ability to lend our expertise
              is an integral part of the success of your project.
            </p>
          </div>
        </div>

        <section className="abt-coop">
          <h2 className="title">
            Notable World Leading Companies We Work With
          </h2>

          <div className="abt-comps">
            {[
              {
                src: comp1,
                alt: "Comp 1",
                text: "LONGI’s technological and manufacturing leadership in solar...",
              },
              {
                src: comp2,
                alt: "Comp 2",
                text: "As a global leading provider for photovoltaic (PV) modules...",
              },
              {
                src: comp3,
                alt: "Comp 3",
                text: "Electrification is in our DNA. It is at the heart of our existence...",
              },
              {
                src: comp4,
                alt: "Comp 4",
                text: "We are a leading manufacturer of solar inverters, batteries, and more...",
              },
              {
                src: comp5,
                alt: "Comp 5",
                text: "We work solely with certified materials from leading manufacturers...",
              },
              {
                src: comp6,
                alt: "Comp 6",
                text: "Voltronic Power is committed to operating in only 100% ODM...",
              },
              {
                src: comp7,
                alt: "Comp 7",
                text: "Canadian Solar ensures goods imported are not produced with prohibited labor...",
              },
              {
                src: comp8,
                alt: "Comp 8",
                text: "We provide technologies for clean energy solutions in the industrial sector...",
              },
            ].map((comp, idx) => (
              <div key={idx} className={`abt-comp abt-comp-${idx + 1} row`}>
                <div className="abt-img-c col-4">
                  <img
                    src={comp.src}
                    alt={comp.alt}
                    className="abt-img"
                    loading="lazy"
                  />
                </div>
                <div className="abt-text col">{comp.text}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default AboutComponent;
