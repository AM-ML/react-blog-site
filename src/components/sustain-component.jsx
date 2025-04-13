import "../css/components/about-sustain.css";
import img from "../assets/about-us/sustainability.webp";
import { useState } from "react";
import {
  Leaf,
  Users,
  TrendingUp,
  Award,
  FileCheck,
  Building,
  ChevronDown,
  Droplet,
  Recycle,
  MapIcon as City,
  Scale,
  HeartHandshake,
  UserPlus,
  Briefcase,
  DollarSign,
  Clock,
  Truck,
  Zap,
  Map,
  PenToolIcon as Tool,
} from "lucide-react";

const SustainComponent = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionHover = (section) => {
    setActiveSection(section);
  };

  const handleSectionLeave = () => {
    setActiveSection(null);
  };

  return (
    <section className="abts-container">
      <header className="abts-header">
        <figure className="abts-img-c">
          <img
            src={img || "/placeholder.svg"}
            alt="Sustainability Concept"
            className="abts-img"
            loading="lazy"
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

        <a
          href="#info"
          className="abts-arrow-c no-design no-default-design"
          aria-label="Scroll to learn more"
        >
          <ChevronDown className="abts-arrow" />
        </a>
      </header>

      <section className="abts-info" id="info">
        <div className="sustainability-pillars">
          <div className="pillar">
            <div className="pillar-icon">
              <Leaf size={32} />
            </div>
            <h3>Environmental</h3>
          </div>
          <div className="pillar">
            <div className="pillar-icon">
              <Users size={32} />
            </div>
            <h3>Social</h3>
          </div>
          <div className="pillar">
            <div className="pillar-icon">
              <TrendingUp size={32} />
            </div>
            <h3>Economic</h3>
          </div>
        </div>

        <article className="abts-e-container abts-i-container">
          <div className="section-header">
            <div className="section-icon">
              <Leaf size={28} />
            </div>
            <h2 className="title">Environmental Initiatives</h2>
          </div>
          <p className="text">
            BOFFO actively engages in reducing our carbon footprint through
            sustainable construction practices, eco-friendly materials, and
            energy-efficient solutions. Our environmental strategy includes:
          </p>
        </article>

        <div className="abts-el-container">
          <div
            className={`abts-bg-c ${activeSection === "green" ? "active" : ""}`}
            onMouseEnter={() => handleSectionHover("green")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Zap />
            </div>
            <h3 className="title">Green Building Practices</h3>
            <p className="text">
              We implement energy-efficient designs, harness renewable energy
              sources, and prioritize low-emission materials.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">40%</span>
                <span className="label">Energy Reduction</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${activeSection === "eco" ? "active" : ""}`}
            onMouseEnter={() => handleSectionHover("eco")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Recycle />
            </div>
            <h3 className="title">Eco-Friendly Materials</h3>
            <p className="text">
              The use of sustainable resources, including prefabricated concrete
              and recyclable materials, minimizes environmental degradation.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">75%</span>
                <span className="label">Recycled Materials</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${activeSection === "water" ? "active" : ""}`}
            onMouseEnter={() => handleSectionHover("water")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Droplet />
            </div>
            <h3 className="title">Water & Waste Management</h3>
            <p className="text">
              We incorporate advanced water conservation techniques and waste
              reduction strategies to ensure responsible resource utilization.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">60%</span>
                <span className="label">Water Conservation</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${activeSection === "urban" ? "active" : ""}`}
            onMouseEnter={() => handleSectionHover("urban")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <City />
            </div>
            <h3 className="title">Sustainable Urban Development</h3>
            <p className="text">
              Our projects integrate green spaces, smart infrastructure, and
              eco-conscious planning to support thriving communities.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">30%</span>
                <span className="label">Green Space Allocation</span>
              </div>
            </div>
          </div>
        </div>

        <article className="abts-sr-container abts-i-container mt-4">
          <div className="section-header">
            <div className="section-icon">
              <Users size={28} />
            </div>
            <h2 className="title">Social Responsibility</h2>
          </div>
          <p className="text">
            BOFFO believes in creating more than just structures—we build
            communities. Our dedication to social responsibility is reflected
            in:
          </p>
        </article>

        <div className="abts-el-container">
          <div
            className={`abts-bg-c ${activeSection === "labor" ? "active" : ""}`}
            onMouseEnter={() => handleSectionHover("labor")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Scale />
            </div>
            <h3 className="title">Ethical Labor Practices</h3>
            <p className="text">
              We uphold strict adherence to fair wages, safe working conditions,
              and equal opportunities.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">100%</span>
                <span className="label">Fair Wage Compliance</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${
              activeSection === "community" ? "active" : ""
            }`}
            onMouseEnter={() => handleSectionHover("community")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <HeartHandshake />
            </div>
            <h3 className="title">Community Development Programs</h3>
            <p className="text">
              Partnering with local organizations, we invest in projects that
              enhance public welfare, such as educational institutions,
              healthcare centers, and infrastructure improvements.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">12+</span>
                <span className="label">Community Projects</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${
              activeSection === "stakeholder" ? "active" : ""
            }`}
            onMouseEnter={() => handleSectionHover("stakeholder")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <UserPlus />
            </div>
            <h3 className="title">Stakeholder Engagement</h3>
            <p className="text">
              We collaborate with governments, NGOs, and industry leaders to
              develop policies and practices that support social sustainability.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">25+</span>
                <span className="label">Partner Organizations</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${
              activeSection === "employee" ? "active" : ""
            }`}
            onMouseEnter={() => handleSectionHover("employee")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Briefcase />
            </div>
            <h3 className="title">Employee Well-being</h3>
            <p className="text">
              Our workforce is our strength. We ensure ongoing training, career
              development, and a supportive work environment that values
              diversity and inclusion.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">40+</span>
                <span className="label">Training Hours/Year</span>
              </div>
            </div>
          </div>
        </div>

        <article className="abts-ec-container abts-i-container mt-4">
          <div className="section-header">
            <div className="section-icon">
              <TrendingUp size={28} />
            </div>
            <h2 className="title">Economic Sustainability</h2>
          </div>
          <p className="text">
            BOFFO is dedicated to responsible economic growth that balances
            profitability with sustainability. Our business model integrates:
          </p>
        </article>

        <div className="abts-el-container">
          <div
            className={`abts-bg-c ${activeSection === "cost" ? "active" : ""}`}
            onMouseEnter={() => handleSectionHover("cost")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <DollarSign />
            </div>
            <h3 className="title">Cost-Effective Sustainable Solutions</h3>
            <p className="text">
              Leveraging innovative technologies and efficient processes to
              maximize returns while minimizing environmental impact.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">20%</span>
                <span className="label">Cost Reduction</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${activeSection === "value" ? "active" : ""}`}
            onMouseEnter={() => handleSectionHover("value")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Clock />
            </div>
            <h3 className="title">Long-Term Value Creation</h3>
            <p className="text">
              Designing projects with durability, adaptability, and future
              growth in mind, ensuring economic benefits for stakeholders and
              local communities.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">50+</span>
                <span className="label">Years Lifespan</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${
              activeSection === "supply" ? "active" : ""
            }`}
            onMouseEnter={() => handleSectionHover("supply")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Truck />
            </div>
            <h3 className="title">Sustainable Supply Chains</h3>
            <p className="text">
              We work with ethical suppliers and contractors who share our
              commitment to sustainability.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">85%</span>
                <span className="label">Local Sourcing</span>
              </div>
            </div>
          </div>
        </div>

        <article className="abts-cc-container abts-i-container mt-4 pb-1">
          <div className="section-header">
            <div className="section-icon">
              <Award size={28} />
            </div>
            <h2 className="title">Certifications & Compliance</h2>
          </div>
          <p className="text">
            To solidify our commitment to sustainability, BOFFO adheres to
            internationally recognized standards, ensuring best practices across
            all projects. Our compliance framework includes:
          </p>
        </article>

        <ul className="abts-cc-el-container">
          <li className="item">
            <FileCheck className="item-icon" />
            <span>
              LEED (Leadership in Energy and Environmental Design) Certification
            </span>
          </li>
          <li className="item">
            <FileCheck className="item-icon" />
            <span>ISO 14001 Environmental Management System</span>
          </li>
          <li className="item">
            <FileCheck className="item-icon" />
            <span>Local and International Regulatory Compliance</span>
          </li>
          <li className="item">
            <FileCheck className="item-icon" />
            <span>Continuous Monitoring & Improvement Programs</span>
          </li>
        </ul>

        <article className="abts-sc-container abts-i-container">
          <div className="section-header">
            <div className="section-icon">
              <Building size={28} />
            </div>
            <h2 className="title">Sustainable Projects & Case Studies</h2>
          </div>
          <p className="text">
            BOFFO takes pride in its portfolio of sustainable projects that
            exemplify our commitment to eco-friendly development. Our projects
            demonstrate:
          </p>
        </article>

        <div className="abts-el-container">
          <div
            className={`abts-bg-c ${
              activeSection === "architecture" ? "active" : ""
            }`}
            onMouseEnter={() => handleSectionHover("architecture")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Zap />
            </div>
            <h3 className="title">Energy-efficient architecture</h3>
            <p className="text">
              that reduces operational costs and environmental impact.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">15+</span>
                <span className="label">Net-Zero Buildings</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${
              activeSection === "planning" ? "active" : ""
            }`}
            onMouseEnter={() => handleSectionHover("planning")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Map />
            </div>
            <h3 className="title">Smart urban planning</h3>
            <p className="text">
              that enhances livability, reduces congestion, and fosters green
              transportation.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">8</span>
                <span className="label">Smart City Projects</span>
              </div>
            </div>
          </div>
          <div
            className={`abts-bg-c ${
              activeSection === "construction" ? "active" : ""
            }`}
            onMouseEnter={() => handleSectionHover("construction")}
            onMouseLeave={handleSectionLeave}
          >
            <div className="card-icon">
              <Tool />
            </div>
            <h3 className="title">Resource-efficient construction</h3>
            <p className="text">
              methods that minimize waste and optimize material use.
            </p>
            <div className="card-stats">
              <div className="stat">
                <span className="value">90%</span>
                <span className="label">Waste Reduction</span>
              </div>
            </div>
          </div>
        </div>

        <div className="legacy-section">
          <div className="legacy-content">
            <h2 className="title">A Legacy for Future Generations</h2>
            <p className="text">
              Sustainability is at the heart of BOFFO Consulting. We are
              dedicated to pushing the boundaries of what is possible, ensuring
              that every project we undertake is not only successful today but
              also beneficial for future generations. Through continuous
              innovation and unwavering commitment, we strive to leave behind a
              lasting legacy of sustainability, resilience, and progress.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SustainComponent;
