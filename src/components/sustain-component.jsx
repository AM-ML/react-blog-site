import "../css/components/about-sustain.css";
import img from "../assets/about-us/sustainability.webp";

const SustainComponent = () => {
  return (
    <div className="abts-container">
      <div className="abts-header">
        <div className="abts-img-c">
          <img src={img} alt="" className="abts-img" />
        </div>

        <div className="abts-img-shadow"></div>

        <div className="abts-header-text">
          <div className="abts-title">
            Our Commitment to <div className="highlight">Sustainability</div>
          </div>
          <div className="abts-desc">
            At BOFFO Consulting, sustainability is not just a concept—it is the
            foundation of our operations. We are committed to fostering
            innovative, environmentally conscious, and socially responsible
            solutions that contribute to a greener future. Our approach
            integrates environmental stewardship, social responsibility, and
            economic viability to create a lasting impact across all our
            projects.
          </div>
        </div>

        <a href="#info" className="abts-arrow-c no-design no-default-design">
          <i className="abts-arrow bx bx-chevron-down"></i>
        </a>
      </div>
      <div className="abts-info" id="info">
        <div className="abts-e-container abts-i-container">
          <div className="title">Environmental Initiatives</div>
          <div className="text">
            BOFFO actively engages in reducing our carbon footprint through
            sustainable construction practices, eco-friendly materials, and
            energy-efficient solutions. Our environmental strategy includes:
          </div>
        </div>
        <div className="abts-el-container">
          <div className="abts-e1 abts-bg-c">
            <div className="title">Green Building Practices</div>
            <div className="text">
              We implement energy-efficient designs, harness renewable energy
              sources, and prioritize low-emission materials.
            </div>
          </div>
          <div className="abts-e2 abts-bg-c">
            <div className="title">Eco-Friendly Materials</div>
            <div className="text">
              The use of sustainable resources, including prefabricated concrete
              and recyclable materials, minimizes environmental degradation.
            </div>
          </div>
          <div className="abts-e3 abts-bg-c">
            <div className="title">Water & Waste Management</div>
            <div className="text">
              We incorporate advanced water conservation techniques and waste
              reduction strategies to ensure responsible resource utilization.
            </div>
          </div>
          <div className="abts-e4 abts-bg-c">
            <div className="title">Sustainable Urban Development</div>
            <div className="text">
              Our projects integrate green spaces, smart infrastructure, and
              eco-conscious planning to support thriving communities.
            </div>
          </div>
        </div>
        <div className="abts-sr-container abts-i-container mt-4">
          <div className="title">Social Responsibility</div>
          <div className="text">
            BOFFO believes in creating more than just structures—we build
            communities. Our dedication to social responsibility is reflected
            in:
          </div>
        </div>
        <div className="abts-el-container">
          <div className="abts-e1 abts-bg-c">
            <div className="title">Ethical Labor Practices</div>
            <div className="text">
              We uphold strict adherence to fair wages, safe working conditions,
              and equal opportunities.
            </div>
          </div>
          <div className="abts-e2 abts-bg-c">
            <div className="title">Community Development Programs</div>
            <div className="text">
              Partnering with local organizations, we invest in projects that
              enhance public welfare, such as educational institutions,
              healthcare centers, and infrastructure improvements.
            </div>
          </div>
          <div className="abts-e3 abts-bg-c">
            <div className="title">Stakeholder Engagement</div>
            <div className="text">
              We collaborate with governments, NGOs, and industry leaders to
              develop policies and practices that support social sustainability.
            </div>
          </div>
          <div className="abts-e4 abts-bg-c">
            <div className="title">Employee Well-being</div>
            <div className="text">
              Our workforce is our strength. We ensure ongoing training, career
              development, and a supportive work environment that values
              diversity and inclusion.
            </div>
          </div>
        </div>
        <div className="abts-ec-container abts-i-container mt-4">
          <div className="title">Economic Sustainability</div>
          <div className="text">
            BOFFO is dedicated to responsible economic growth that balances
            profitability with sustainability. Our business model integrates:
          </div>
        </div>
        <div className="abts-el-container">
          <div className="abts-e1 abts-bg-c">
            <div className="title">Cost-Effective Sustainable Solutions</div>
            <div className="text">
              Leveraging innovative technologies and efficient processes to
              maximize returns while minimizing environmental impact.
            </div>
          </div>
          <div className="abts-e2 abts-bg-c">
            <div className="title">Long-Term Value Creation</div>
            <div className="text">
              Designing projects with durability, adaptability, and future
              growth in mind, ensuring economic benefits for stakeholders and
              local communities.
            </div>
          </div>
          <div className="abts-e3 abts-bg-c">
            <div className="title">Sustainable Supply Chains</div>
            <div className="text">
              We work with ethical suppliers and contractors who share our
              commitment to sustainability.
            </div>
          </div>
        </div>
        <div className="abts-cc-container abts-i-container mt-4">
          <div className="title">Certifications & Compliance</div>
          <div className="text">
            To solidify our commitment to sustainability, BOFFO adheres to
            internationally recognized standards, ensuring best practices across
            all projects. Our compliance framework includes:
          </div>
        </div>
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
        <div className="abts-sc-container abts-i-container">
          <div className="title">Sustainable Projects & Case Studies</div>
          <div className="text">
            BOFFO takes pride in its portfolio of sustainable projects that
            exemplify our commitment to eco-friendly development. Our projects
            demonstrate:
          </div>
        </div>
        <div className="abts-el-container">
          <div className="abts-e1 abts-bg-c">
            <div className="title">Energy-efficient architecture</div>
            <div className="text">
              that reduces operational costs and environmental impact.
            </div>
          </div>
          <div className="abts-e2 abts-bg-c">
            <div className="title">Smart urban planning</div>
            <div className="text">
              that enhances livability, reduces congestion, and fosters green
              transportation.
            </div>
          </div>
          <div className="abts-e3 abts-bg-c">
            <div className="title">Resource-efficient construction</div>
            <div className="text">
              methods that minimize waste and optimize material use.
            </div>
          </div>
        </div>
        <div className="abts-i-container">
          <div className="title">A Legacy for Future Generations</div>
          <div className="text">
            Sustainability is at the heart of BOFFO Consulting. We are dedicated
            to pushing the boundaries of what is possible, ensuring that every
            project we undertake is not only successful today but also
            beneficial for future generations. Through continuous innovation and
            unwavering commitment, we strive to leave behind a lasting legacy of
            sustainability, resilience, and progress.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainComponent;
