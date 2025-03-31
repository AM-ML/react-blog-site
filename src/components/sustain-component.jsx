import "../css/components/about-sustain.css";
import img from "../assets/about-us/sustainability.webp";

const SustainComponent = () => {
  return (
    <section className="abts-container">
      <header className="abts-header">
        <figure className="abts-img-c">
          <img
            src={img}
            alt="Sustainability Concept"
            className="abts-img"
            loading="lazy" // Lazy loading to improve performance
          />
        </figure>
        <figcaption className="abts-img-shadow"></figcaption>

        <div className="abts-header-text">
          <h1 className="abts-title">
            Our Commitment to <span className="highlight">Sustainability</span>
          </h1>
          <p className="abts-desc">
            At BOFFO Consulting, sustainability is not just a concept—it is the
            foundation of our operations. We are committed to fostering
            innovative, environmentally conscious, and socially responsible
            solutions that contribute to a greener future. Our approach
            integrates environmental stewardship, social responsibility, and
            economic viability to create a lasting impact across all our
            projects.
          </p>
        </div>

        <a href="#info" className="abts-arrow-c no-design no-default-design">
          <i className="abts-arrow bx bx-chevron-down"></i>
        </a>
      </header>

      <section className="abts-info" id="info">
        <article className="abts-e-container abts-i-container">
          <h2 className="title">Environmental Initiatives</h2>
          <p className="text">
            BOFFO actively engages in reducing our carbon footprint through
            sustainable construction practices, eco-friendly materials, and
            energy-efficient solutions. Our environmental strategy includes:
          </p>
        </article>

        <div className="abts-el-container">
          <div className="abts-e1 abts-bg-c">
            <h3 className="title">Green Building Practices</h3>
            <p className="text">
              We implement energy-efficient designs, harness renewable energy
              sources, and prioritize low-emission materials.
            </p>
          </div>
          <div className="abts-e2 abts-bg-c">
            <h3 className="title">Eco-Friendly Materials</h3>
            <p className="text">
              The use of sustainable resources, including prefabricated concrete
              and recyclable materials, minimizes environmental degradation.
            </p>
          </div>
          <div className="abts-e3 abts-bg-c">
            <h3 className="title">Water & Waste Management</h3>
            <p className="text">
              We incorporate advanced water conservation techniques and waste
              reduction strategies to ensure responsible resource utilization.
            </p>
          </div>
          <div className="abts-e4 abts-bg-c">
            <h3 className="title">Sustainable Urban Development</h3>
            <p className="text">
              Our projects integrate green spaces, smart infrastructure, and
              eco-conscious planning to support thriving communities.
            </p>
          </div>
        </div>

        <article className="abts-sr-container abts-i-container mt-4">
          <h2 className="title">Social Responsibility</h2>
          <p className="text">
            BOFFO believes in creating more than just structures—we build
            communities. Our dedication to social responsibility is reflected
            in:
          </p>
        </article>

        <div className="abts-el-container">
          <div className="abts-e1 abts-bg-c">
            <h3 className="title">Ethical Labor Practices</h3>
            <p className="text">
              We uphold strict adherence to fair wages, safe working conditions,
              and equal opportunities.
            </p>
          </div>
          <div className="abts-e2 abts-bg-c">
            <h3 className="title">Community Development Programs</h3>
            <p className="text">
              Partnering with local organizations, we invest in projects that
              enhance public welfare, such as educational institutions,
              healthcare centers, and infrastructure improvements.
            </p>
          </div>
          <div className="abts-e3 abts-bg-c">
            <h3 className="title">Stakeholder Engagement</h3>
            <p className="text">
              We collaborate with governments, NGOs, and industry leaders to
              develop policies and practices that support social sustainability.
            </p>
          </div>
          <div className="abts-e4 abts-bg-c">
            <h3 className="title">Employee Well-being</h3>
            <p className="text">
              Our workforce is our strength. We ensure ongoing training, career
              development, and a supportive work environment that values
              diversity and inclusion.
            </p>
          </div>
        </div>

        <article className="abts-ec-container abts-i-container mt-4">
          <h2 className="title">Economic Sustainability</h2>
          <p className="text">
            BOFFO is dedicated to responsible economic growth that balances
            profitability with sustainability. Our business model integrates:
          </p>
        </article>

        <div className="abts-el-container">
          <div className="abts-e1 abts-bg-c">
            <h3 className="title">Cost-Effective Sustainable Solutions</h3>
            <p className="text">
              Leveraging innovative technologies and efficient processes to
              maximize returns while minimizing environmental impact.
            </p>
          </div>
          <div className="abts-e2 abts-bg-c">
            <h3 className="title">Long-Term Value Creation</h3>
            <p className="text">
              Designing projects with durability, adaptability, and future
              growth in mind, ensuring economic benefits for stakeholders and
              local communities.
            </p>
          </div>
          <div className="abts-e3 abts-bg-c">
            <h3 className="title">Sustainable Supply Chains</h3>
            <p className="text">
              We work with ethical suppliers and contractors who share our
              commitment to sustainability.
            </p>
          </div>
        </div>

        <article className="abts-cc-container abts-i-container mt-4 pb-1">
          <h2 className="title">Certifications & Compliance</h2>
          <p className="text">
            To solidify our commitment to sustainability, BOFFO adheres to
            internationally recognized standards, ensuring best practices across
            all projects. Our compliance framework includes:
          </p>
        </article>

        <ul className="abts-cc-el-container">
          <li className="item">
            LEED (Leadership in Energy and Environmental Design) Certification
          </li>
          <li className="item">ISO 14001 Environmental Management System</li>
          <li className="item">
            Local and International Regulatory Compliance
          </li>
          <li className="item">Continuous Monitoring & Improvement Programs</li>
        </ul>

        <article className="abts-sc-container abts-i-container">
          <h2 className="title">Sustainable Projects & Case Studies</h2>
          <p className="text">
            BOFFO takes pride in its portfolio of sustainable projects that
            exemplify our commitment to eco-friendly development. Our projects
            demonstrate:
          </p>
        </article>

        <div className="abts-el-container">
          <div className="abts-e1 abts-bg-c">
            <h3 className="title">Energy-efficient architecture</h3>
            <p className="text">
              that reduces operational costs and environmental impact.
            </p>
          </div>
          <div className="abts-e2 abts-bg-c">
            <h3 className="title">Smart urban planning</h3>
            <p className="text">
              that enhances livability, reduces congestion, and fosters green
              transportation.
            </p>
          </div>
          <div className="abts-e3 abts-bg-c">
            <h3 className="title">Resource-efficient construction</h3>
            <p className="text">
              methods that minimize waste and optimize material use.
            </p>
          </div>
        </div>

        <div className="abts-i-container mt-4">
          <h2 className="title">A Legacy for Future Generations</h2>
          <p className="text">
            Sustainability is at the heart of BOFFO Consulting. We are dedicated
            to pushing the boundaries of what is possible, ensuring that every
            project we undertake is not only successful today but also
            beneficial for future generations. Through continuous innovation and
            unwavering commitment, we strive to leave behind a lasting legacy of
            sustainability, resilience, and progress.
          </p>
        </div>
      </section>
    </section>
  );
};

export default SustainComponent;
