import "../css/components/about-story-component.css";
import img from "../assets/about-us/os.webp";

const AboutStoryComponent = () => {
  return (
    <section className="abst-container">
      <header className="abst-header">
        <figure className="abst-img-c">
          <img
            src={img}
            alt="About us background"
            className="abst-img"
            loading="lazy" // Deferring image loading to improve performance
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

        <a
          href="#info"
          className="abst-arrow-c no-design no-default-design"
          aria-label="Scroll to company history"
        >
          <i className="abst-arrow bx bx-chevron-down" />
        </a>
      </header>

      <section className="abst-info" id="info">
        <div className="abst-hf-container">
          <h2 className="title">
            History and Founding of the Consulting Group
          </h2>
          <p className="text">
            BOFFO is a dynamic and innovative team composed of both seasoned
            experts and fresh talent. Our diverse group brings together civil
            engineers, architects, and economists, each contributing their
            unique perspective and skills. Established in 2024, BOFFO may be a
            new name in the industry, but the knowledge and expertise behind it
            are anything but new. With over 20 years of collective experience in
            construction consultancy and business management, we deliver
            unparalleled insights and solutions that ensure the success of every
            project we undertake. Our blend of fresh ideas and seasoned wisdom
            allows us to approach challenges from every angle, offering creative
            yet practical solutions that drive results.
          </p>
        </div>

        <div className="abst-hf-container">
          <h2 className="title">Our Features</h2>
          <p className="text">
            Boffo undertakes an extensive range of civil construction projects,
            with the ability to handle contracts valued under $1 million to
            major complex works in excess of $50 million. Our highly experienced
            management and engineering teams work in close collaboration with
            clients, project managers, and principal consultants from
            preliminary design to ultimate completion.
          </p>
        </div>

        <div className="abst-hfs-container row">
          <div className="abst-hf-container col-5">
            <h3 className="title">Technology</h3>
            <p className="text">
              Boffo undertakes an extensive range of civil construction
              projects, with the ability to handle contracts valued under $1
              million to major complex works in excess of $50 million. Our
              highly experienced management and engineering teams work in close
              collaboration with clients, project managers, and principal
              consultants from preliminary design to ultimate completion.
            </p>
          </div>

          <div className="abst-hf-container col-5">
            <h3 className="title">We Hire Great People</h3>
            <p className="text">
              We believe that the quality of workers will define business
              success. We invest in people, upgrading technical and management
              skills through regular training programs.
            </p>
          </div>

          <div className="abst-hf-container col-5">
            <h3 className="title">We Put Customers First</h3>
            <p className="text">
              We make sure to deliver on our promises with integrity. We believe
              that effective planning with efficient design and quality will
              result in the most successful construction project.
            </p>
          </div>

          <div className="abst-hf-container col-5">
            <h3 className="title">We Always Execute</h3>
            <p className="text">
              We know how to get a project started and finished in the best
              possible and most efficient way.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutStoryComponent;
