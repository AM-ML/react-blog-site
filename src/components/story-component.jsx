import "../css/components/about-story-component.css";
import img from "../assets/about-us/os.webp";

const AboutStoryComponent = () => {
  return (
    <div className="abst-container">
      <div className="abst-header">
        <div className="abst-img-c">
          <img src={img} alt="" className="abst-img" />
        </div>

        <div className="abst-img-shadow"></div>

        <div className="abst-header-text">
          <div className="abst-title">
            Forged Through <div className="highlight">Hard Work</div> and{" "}
            <div className="highlight">Dedication</div>
          </div>
          <div className="abst-desc">
            From humble beginnings to a force in construction consultancy, BOFFO
            was built on expertise, resilience, and a commitment to excellence.
            With a foundation rooted in experience and a vision set on the
            future, our journey is defined by the projects we shape, the
            challenges we overcome, and the people who drive us forward.
          </div>
        </div>

        <a href="#info" className="abst-arrow-c no-design no-default-design">
          <i className="abst-arrow bx bx-chevron-down"></i>
        </a>
      </div>
      <div className="abst-info" id="info">
        <div className="abst-hf-container">
          <div className="title">
            History and Founding of the Consulting Group
          </div>
          <div className="text">
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
          </div>
        </div>

        <div className="abst-hf-container">
          <div className="title">Our Features</div>
          <div className="text">
            Boffo undertakes an extensive range of civil construction
            projects,with the ability to handle contracts valued under $1
            million to major com- plex works in excess of $50 million. Our
            highly experi- enced management and engineering teams work in close
            collaboration with clients, project managers and principal
            consultants from preliminary design to ultimate completion.
          </div>
        </div>

        <div className="abst-hfs-container row">
          <div className="abst-hf-container col-5">
            <div className="title">Technology</div>
            <div className="text">
              Boffo undertakes an extensive range of civil construction
              projects,with the ability to handle contracts valued under $1
              million to major com- plex works in excess of $50 million. Our
              highly experi- enced management and engineering teams work in
              close collaboration with clients, project managers and principal
              consultants from preliminary design to ultimate completion.
            </div>
          </div>

          <div className="abst-hf-container col-5">
            <div className="title">We Hire Great People</div>
            <div className="text">
              We believe that quality of workers will define business success.
              We Invest in people, upgrading technical and management skills
              through Regular training programs.
            </div>
          </div>

          <div className="abst-hf-container col-5">
            <div className="title">We Put Customers First</div>
            <div className="text">
              We make sure to deliver on our promises with integrity. We believe
              that effective planning with efficient design and quality will
              result the most successful construction project.
            </div>
          </div>

          <div className="abst-hf-container col-5">
            <div className="title">We Always Execute</div>
            <div className="text">
              We know how to get a project started and finished in the best
              possible and most efficient way possible.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStoryComponent;
