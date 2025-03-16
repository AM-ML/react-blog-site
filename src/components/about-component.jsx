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
    <div className="abt-container">
      <div className="abt-header">
        <div className="abt-img-c">
          <img src={img} alt="" className="abt-img" />
        </div>

        <div className="abt-img-shadow"></div>

        <div className="abt-header-text">
          <h1 className="abt-title">
            A <div className="highlight">Passion</div> for Problem Solving.
          </h1>

          <div className="abt-desc">
            BOFFO Consulting Group is a premier consulting firm specializing in
            construction and management services. With a commitment to
            excellence and a focus on delivering high-quality solutions, BOFFO
            has established itself as a trusted partner for a diverse range of
            clients, including residential, commercial, and municipal projects.
          </div>
        </div>

        <a href="#info" className="abt-arrow-c no-design no-default-design">
          <i className="abt-arrow bx bx-chevron-down"></i>
        </a>
      </div>

      <div className="abt-info" id="info">
        <div className="abt-i-container shadow">
          <div className="title">Our Impact</div>
          <div className="text">
            BOFFO Consulting has successfully completed projects across multiple
            regions, contributing to national development and economic growth.
            From large-scale infrastructure projects to detailed architectural
            designs, we take pride in shaping skylines and enhancing
            communities.
          </div>
        </div>
        <div className="abt-mv-container row">
          <div className="col shadow">
            <div className="title">Our Mission</div>
            <div className="text">
              To provide innovative, sustainable, and efficient construction and
              management solutions that exceed client expectations and
              contribute to the advancement of the built environment.
            </div>
          </div>
          <div className="col shadow">
            <div className="title">Our Vision</div>
            <div className="text">
              To be a leading consulting firm recognized for our expertise,
              integrity, and commitment to delivering exceptional results.
            </div>
          </div>
        </div>
        <div className="abt-mv-container row">
          <div className="col shadow">
            <div className="title">Our Organizational Structure</div>
            <div className="text">
              The strategic Management committee comprises the Executive Board
              and the Corporate Centers of the Group. This control level is
              responsible for the strategic and organizational development.
              Duties delegate by the board of directors to executive board which
              comprises the marketing committee, finance committee, projects
              committee and operations committee.
            </div>
          </div>
          <div className="col shadow">
            <div className="title">& Operational Alignment</div>
            <div className="text">
              With more than 15 years of accumulated experience, we believe
              investing in our people and upgrading their skills is the key to
              success. Our aim is to stay relevant in to the ever-changing
              market place.
            </div>
          </div>
        </div>

        <div className="abt-stat-container">
          <div className="abt-stat-item">
            <div className="abt-row-1">
              <img src={projIcon} alt="" className="abt-img" />
              <div className="abt-number">16+</div>
            </div>
            <div className="abt-text">
              Covering the entire value chain in the construction industry.
              We've executed international Infrastructure, Building
              Construction, and Civil Engineering projects.
            </div>
          </div>
          <div className="abt-stat-item">
            <div className="abt-row-1">
              <img src={empIcon} alt="" className="abt-img" />
              <div className="abt-number">15+</div>
            </div>
            <div className="abt-text">
              Our employees, with their dedication, experience and their
              extraordinary technical knowledge, made us who we are today
            </div>
          </div>
          <div className="abt-stat-item">
            <div className="abt-row-1">
              <img src={countIcon} alt="" className="abt-img" />
              <div className="abt-number">6+</div>
            </div>
            <div className="abt-text">
              With the vision of being worldwide reference in Construction
              industry, we are executing projects in Algeria | Qatar | Oman |
              Iraq | Saudi Arabia | Lebanon.
            </div>
          </div>
        </div>

        <div className="abt-wd-container">
          <div className="abt-img-c">
            <img src={industries} alt="" className="abt-img" />
          </div>
          <div className="abt-text">
            <div className="title">What We Do</div>
            <div className="text">
              "We provide quantitative value at every level, that can be relied
              upon in order to enhance your project" Boffo provides a broad
              spectrum of services relative to projects in both public and
              private sectors. We approach each situation with a "team
              mentality", understanding that the ability to lend our expertise
              is an integral part of the success of your project.
            </div>
          </div>
        </div>

        <div className="abt-coop">
          <div className="title">
            Notable World Leading Companies We Work With
          </div>

          <div className="abt-comps">
            <div className="abt-comp abt-comp-1 row">
              <div className="abt-img-c col-4">
                <img src={comp1} alt="" className="abt-img" />
              </div>
              <div className="abt-text col">
                LONGI’s technological and manufacturing leadership in solar
                wafers, cells and modules underscores our commitment to helping
                accelerate the clean energy transition. By offering high-
                quality, reliable products and systems, we provide holistic
                solutions for the solar and renewable industry.
              </div>
            </div>
            <div className="abt-comp abt-comp-2 row">
              <div className="abt-img-c col-4">
                <img src={comp2} alt="" className="abt-img" />
              </div>
              <div className="abt-text col">
                As a global leading provider for photovoltaic ( PV) modules and
                smart energy solutions, Trina Solar delivers PV products,
                applications, and service to promote global sustainable
                developmentindustry.
              </div>
            </div>
            <div className="abt-comp abt-comp-3 row">
              <div className="abt-img-c col-4">
                <img src={comp3} alt="" className="abt-img" />
              </div>
              <div className="abt-text col">
                “ Electrification is in our DNA. It is at the heart of our
                existence. It is the reason why we give the best of ourselves to
                build a better future for the world”. Liban cables was founded
                in 1967 by a group of Lebanese industrialists, backed up by the
                technical assignments of two international leading firms, Les
                Cables De Lyon- France& Phelps Dodge USA
              </div>
            </div>
            <div className="abt-comp abt-comp-4 row">
              <div className="abt-img-c col-4">
                <img src={comp4} alt="" className="abt-img" />
              </div>
              <div className="abt-text col">
                We are leading manufacturer of solar inverter, inverter battery,
                tubular battery, VRLA battery, off grid solar system, off grid
                solar inverter etc. We focus on user’s requirement the area of
                pure sine wave inverter, solar power inverter , inverter for
                home and sine wave home UPS in south africa
              </div>
            </div>
            <div className="abt-comp abt-comp-5 row">
              <div className="abt-img-c col-4">
                <img src={comp5} alt="" className="abt-img" />
              </div>
              <div className="abt-text col">
                We work solely with certified materials from leading
                manufacturers. All modules are supplied with greater output than
                stated and are TUV- certified including construction type and
                safety certificate, salt spray corrosion test and tests for
                ammonia resistance.
              </div>
            </div>
            <div className="abt-comp abt-comp-6 row">
              <div className="abt-img-c col-4">
                <img src={comp6} alt="" className="abt-img" />
              </div>
              <div className="abt-text col">
                Voltronic power is commited to operating in only %100 ODM in the
                UPS and Solar inverter industry. We dont have our own brand, we
                dont compete with our customers in any market segments.
              </div>
            </div>
            <div className="abt-comp abt-comp-7 row">
              <div className="abt-img-c col-4">
                <img src={comp7} alt="" className="abt-img" />
              </div>
              <div className="abt-text col">
                Canadian solar closely examines our supply chains to ensure
                goods imported are not mined, produced, or manufactured, wholly
                or in part, with prohibited form of labor, i.e., slave, convict,
                indentured, forced, or indentured child labor.
              </div>
            </div>
            <div className="abt-comp abt-comp-8">
              <div className="abt-img-c col-4">
                <img src={comp8} alt="" className="abt-img" />
              </div>
              <div className="abt-text col">
                We provide technologies and services for clean energy solutions
                in the industrial sector. Our projects combine engineering
                experties with efficient technologies that use energy from
                renewable sources on site.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
