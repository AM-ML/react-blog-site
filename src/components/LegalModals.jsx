import React, { useState, createContext, useContext } from "react";
import LegalModal from "../common/LegalModal";

// Create a context to manage the modals' visibility
const LegalModalsContext = createContext({
  openPrivacyModal: () => {},
  openTermsModal: () => {}
});

// Custom hook to use the legal modals
export const useLegalModals = () => useContext(LegalModalsContext);

const LegalModals = ({ children }) => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const openPrivacyModal = () => setIsPrivacyOpen(true);
  const closePrivacyModal = () => setIsPrivacyOpen(false);

  const openTermsModal = () => setIsTermsOpen(true);
  const closeTermsModal = () => setIsTermsOpen(false);

  return (
    <LegalModalsContext.Provider value={{ openPrivacyModal, openTermsModal }}>
      {children}
      
      <LegalModal isOpen={isPrivacyOpen} onClose={closePrivacyModal} title="Privacy Policy">
        <div className="legal-modal-content-wrapper">
          <p className="legal-last-updated">Last Updated: June 1, 2024</p>
          
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to Boffo Consulting Group ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our Site, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy and our Terms of Service.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Register an account with us</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our contact form</li>
              <li>Submit project inquiries or proposals</li>
              <li>Participate in our blog by commenting or submitting content</li>
            </ul>
            <p>
              This information may include your name, email address, phone number, company name, address, and any other information you choose to provide.
            </p>
            
            <h3>2.2 Automatically Collected Information</h3>
            <p>
              When you visit our Site, our servers may automatically log standard information such as:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring/exit pages</li>
              <li>Date/time stamp</li>
              <li>Clickstream data</li>
            </ul>
            <p>
              We may also collect information about how you use our Site, such as the pages you view, the links you click, and other actions you take in connection with the Site.
            </p>
            
            <h3>2.3 Cookies and Similar Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Site and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
            </p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To allow you to participate in interactive features of our Site</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To provide you with news, special offers, and general information about other services and events</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Sharing and Disclosure</h2>
            <p>We may share your information in the following situations:</p>
            
            <h3>4.1 With Service Providers</h3>
            <p>
              We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.
            </p>
            
            <h3>4.2 Business Transfers</h3>
            <p>
              If we are involved in a merger, acquisition, or asset sale, your personal information may be transferred. We will provide notice before your personal information is transferred and becomes subject to a different Privacy Policy.
            </p>
            
            <h3>4.3 Legal Requirements</h3>
            <p>
              We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.
            </p>
            
            <h3>4.4 With Your Consent</h3>
            <p>
              We may disclose your personal information for any other purpose with your consent.
            </p>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, please also understand that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2>6. International Data Transfers</h2>
            <p>
              Your information, including personal information, may be transferred to—and maintained on—computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside Lebanon and choose to provide information to us, please note that we transfer the data to Lebanon and process it there.
            </p>
          </section>

          <section>
            <h2>7. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have the following data protection rights:</p>
            <ul>
              <li>The right to access, update, or delete the information we have on you</li>
              <li>The right of rectification—the right to have your information corrected if it is inaccurate or incomplete</li>
              <li>The right to object—the right to object to our processing of your personal data</li>
              <li>The right of restriction—the right to request that we restrict the processing of your personal information</li>
              <li>The right to data portability—the right to receive a copy of your personal information in a structured, machine-readable format</li>
              <li>The right to withdraw consent—the right to withdraw your consent at any time where we relied on your consent to process your personal information</li>
            </ul>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>
              Our Site is not intended for children under the age of 16. We do not knowingly collect personally identifiable information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we can take necessary actions.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <p>
              By email: <a href="mailto:info@boffoconsulting.net">info@boffoconsulting.net</a>
            </p>
            <p>
              By phone: <a href="tel:+96171553322">(+961) 71 55 33 22</a>
            </p>
          </section>
        </div>
      </LegalModal>

      <LegalModal isOpen={isTermsOpen} onClose={closeTermsModal} title="Terms of Service">
        <div className="legal-modal-content-wrapper">
          <p className="legal-last-updated">Last Updated: June 1, 2024</p>
          
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              Welcome to Boffo Consulting Group ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of our website, including any content, functionality, and services offered on or through our website (collectively, the "Site").
            </p>
            <p>
              Please read these Terms carefully before you start using the Site. By using the Site, you accept and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access or use the Site.
            </p>
          </section>

          <section>
            <h2>2. Changes to the Terms</h2>
            <p>
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Site thereafter. Your continued use of the Site following the posting of revised Terms means that you accept and agree to the changes.
            </p>
          </section>

          <section>
            <h2>3. Accessing the Site and Account Security</h2>
            <p>
              We reserve the right to withdraw or amend this Site, and any service or material we provide on the Site, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Site is unavailable at any time or for any period.
            </p>
            <p>
              You are responsible for:
            </p>
            <ul>
              <li>Making all arrangements necessary for you to have access to the Site.</li>
              <li>Ensuring that all persons who access the Site through your internet connection are aware of these Terms and comply with them.</li>
            </ul>
            <p>
              To access certain features of the Site, you may be asked to provide certain registration details or other information. It is a condition of your use of the Site that all the information you provide on the Site is correct, current, and complete.
            </p>
          </section>

          <section>
            <h2>4. Intellectual Property Rights</h2>
            <p>
              The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Boffo Consulting Group, its licensors, or other providers of such material and are protected by Lebanon and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              These Terms permit you to use the Site for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site, except as follows:
            </p>
            <ul>
              <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
              <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
              <li>You may print or download one copy of a reasonable number of pages of the Site for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
              <li>If we provide social media features with certain content, you may take such actions as are enabled by such features.</li>
            </ul>
          </section>

          <section>
            <h2>5. Prohibited Uses</h2>
            <p>
              You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to use the Site:
            </p>
            <ul>
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Site, or which, as determined by us, may harm the Company or users of the Site or expose them to liability.</li>
            </ul>
          </section>

          <section>
            <h2>6. User Contributions</h2>
            <p>
              The Site may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin boards, blog comment sections and other interactive features (collectively, "Interactive Services") that allow users to post, submit, publish, display, or transmit to other users or other persons (hereinafter, "post") content or materials (collectively, "User Contributions") on or through the Site.
            </p>
            <p>
              All User Contributions must comply with the Content Standards set out in these Terms. Any User Contribution you post to the site will be considered non-confidential and non-proprietary. By providing any User Contribution on the Site, you grant us and our licensees, successors, and assigns the right to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material.
            </p>
          </section>

          <section>
            <h2>7. Monitoring and Enforcement; Termination</h2>
            <p>
              We have the right to:
            </p>
            <ul>
              <li>Remove or refuse to post any User Contributions for any or no reason in our sole discretion.</li>
              <li>Take any action with respect to any User Contribution that we deem necessary or appropriate in our sole discretion.</li>
              <li>Terminate or suspend your access to all or part of the Site for any or no reason, including without limitation, any violation of these Terms.</li>
            </ul>
          </section>

          <section>
            <h2>8. Disclaimer of Warranties</h2>
            <p>
              YOUR USE OF THE SITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE IS AT YOUR OWN RISK. THE SITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SITE.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              IN NO EVENT WILL THE COMPANY, ITS AFFILIATES OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SITE OR SUCH OTHER WEBSITES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR OTHERWISE, EVEN IF FORESEEABLE.
            </p>
          </section>

          <section>
            <h2>10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Site.
            </p>
          </section>

          <section>
            <h2>11. Governing Law and Jurisdiction</h2>
            <p>
              All matters relating to the Site and these Terms and any dispute or claim arising therefrom or related thereto shall be governed by and construed in accordance with the internal laws of Lebanon without giving effect to any choice or conflict of law provision or rule.
            </p>
            <p>
              Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Site shall be instituted exclusively in the courts of Lebanon. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
            </p>
          </section>

          <section>
            <h2>12. Waiver and Severability</h2>
            <p>
              No waiver by the Company of any term or condition set out in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of the Company to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
            <p>
              If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.
            </p>
          </section>

          <section>
            <h2>13. Entire Agreement</h2>
            <p>
              The Terms and our Privacy Policy constitute the sole and entire agreement between you and Boffo Consulting Group regarding the Site and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Site.
            </p>
          </section>

          <section>
            <h2>14. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <p>
              By email: <a href="mailto:info@boffoconsulting.net">info@boffoconsulting.net</a>
            </p>
            <p>
              By phone: <a href="tel:+96171553322">(+961) 71 55 33 22</a>
            </p>
          </section>
        </div>
      </LegalModal>
    </LegalModalsContext.Provider>
  );
};

export default LegalModals; 