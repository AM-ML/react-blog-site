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
      <div className="cnt-col cnt-wrapper">
        <div className="container">
          <h2 className="title">Contact Information</h2>
          <div className="info">
            <div className="item">
              <div className="icon-c">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#15626c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail h-5 w-5 text-teal-700"
                  data-lov-id="src/pages/ContactPage.tsx:260:22"
                  data-lov-name="Mail"
                  data-component-path="src/pages/ContactPage.tsx"
                  data-component-line="260"
                  data-component-file="ContactPage.tsx"
                  data-component-name="Mail"
                  data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-teal-700%22%7D"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <div className="text">
                <h3 className="title">Email</h3>
                <a href="mailto:info@boffoconsulting.net" className="desc">
                  info@boffoconsulting.net
                </a>
              </div>
            </div>
            <div className="item">
              <div className="icon-c">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#15626c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone h-5 w-5 text-teal-700"
                  data-lov-id="src/pages/ContactPage.tsx:275:22"
                  data-lov-name="Phone"
                  data-component-path="src/pages/ContactPage.tsx"
                  data-component-line="275"
                  data-component-file="ContactPage.tsx"
                  data-component-name="Phone"
                  data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-teal-700%22%7D"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="text">
                <h3 className="title">Phone</h3>
                <a href="tel:+96171552233" className="desc">
                  (+961) 71 55 22 33
                </a>
              </div>
            </div>
            <div className="item">
              <div className="icon-c">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#15626c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin h-5 w-5 text-teal-700"
                  data-lov-id="src/pages/ContactPage.tsx:290:22"
                  data-lov-name="MapPin"
                  data-component-path="src/pages/ContactPage.tsx"
                  data-component-line="290"
                  data-component-file="ContactPage.tsx"
                  data-component-name="MapPin"
                  data-component-content="%7B%22className%22%3A%22h-5%20w-5%20text-teal-700%22%7D"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="text">
                <h3 className="title">Headquarters</h3>
                <span className="desc">
                  John Kennedy Street, Tina Center Block B, 4th Floor, Ain El
                  Mreisseh, Beirut, Lebanon
                </span>
              </div>
            </div>
          </div>
          <div className="cnt-media">
            <h3 className="title">Connect with us</h3>
            <div className="list">
              <a
                href="https://facebook.com"
                target="_blank"
                className="media-link"
              >
                <i className="bx bxl-facebook-square"></i>
              </a>
              <a
                href="https://www.instagram.com/boffo_consulting_group"
                target="_blank"
                className="media-link"
              >
                <i className="bx bxl-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/boffo-consulting-group"
                target="_blank"
                className="media-link"
              >
                {" "}
                <i className="bx bxl-linkedin-square"></i>{" "}
              </a>
              <a href="https://x.com" target="_blank" className="media-link">
                <i className="bx bxl-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
