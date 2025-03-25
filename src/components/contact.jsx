import { Link } from "react-router-dom";
import "../css/components/contact.css";

const Contact = ({}) => {
  return (
    <main className="cnt-container">
      <div className="cnt-col cnt-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.6157525276535!2d35.48783130560243!3d33.89954861044447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f1747e8de30e5%3A0xaa466541c35880ec!2sBOFFO%20Consulting%20Group!5e0!3m2!1sen!2slb!4v1732979594167!5m2!1sen!2slb"
          width="100%"
          height="calc(100vh - 100px)"
          min-height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="cnt-col cnt-info">
        <div className="cnt-row cnt-location">
          <i className="cnt-icon bx bx-map"></i>
          <div className="cnt-label">
            John Kennedy Street, Tina Center Block B, 4th Floor, Ain El
            Mreisseh, Beirut, Lebanon
          </div>
        </div>
        <div className="cnt-row cnt-email">
          <i className="cnt-icon bx bx-envelope"></i>
          <div className="cnt-label">info@boffoconsulting.net</div>
        </div>
        <div className="cnt-row cnt-phone">
          <i className="cnt-icon bx bx-phone"></i>
          <div className="cnt-label">(+961) 71 55 22 33</div>
        </div>
        <div className="cnt-row cnt-socials">
          <Link className="cnt-social no-design">
            <i className="bx bxl-facebook-square"></i>
          </Link>
          <Link to="https://instagram.com" className="no-design cnt-social">
            <i className="bx bxl-instagram"></i>
          </Link>
          <Link to="https://contact.com" className="no-design cnt-social">
            <i className="bx bxl-linkedin-square"></i>
          </Link>
          <Link to="https://contact.com" className="no-design cnt-social">
            <i className="bx bxl-twitter"></i>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Contact;
