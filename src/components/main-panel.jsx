import "../css/themes/light.css";
import "../css/components/main-panel.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../Router";
import { TitleCase } from "../common/string";
import AnimationWrapper from "../common/page-animation";

const MainPanel = () => {
  let { userAuth, userAuth: { name, username, email, profile_img, social_links, interests, favorite_blogs } } = useContext(UserContext);
  name = TitleCase(name);

  console.log(name)

  return (
    <div className="mp-container">
      <div className="mp-submit-bc">
        <h1 className="mp-submit-bc-page-title">Edit Account</h1>
        <button className="btn btn-lg mp-submit-btn">Save Changes</button>
      </div>
      <div className="mp-input-container">

        <div className="mp-profile-img-ic">
          <img src={profile_img} alt="" className="mp-profile-img" />
        </div>

        <div className="mp-name-ic">
          <input defaultValue={TitleCase(name)} type="text"
            spellCheck="false"
            className="mp-name" />
        </div>

        <div className="mp-email-ic">
          <input type="text" defaultValue={email} className="mp-email"
            spellCheck="false"
          />
        </div>

      </div>

      <div className="mp-info-container">

        <div className="mp-info-ic mp-interests-ic">
          <h1 className="mp-interests-title mp-info-title">Interests</h1>

          <div className="mp-interests">
            <div className="mp-add-container">
              <i className="bx bx-plus mp-add-icon"></i>
            </div>
            {interests? <>
            </> :
              <div className="mp-no-data">
                <div className="mp-no-data-msg">
                  No Interests Selected.
                </div>
              </div>
            }
          </div>
        </div>

        <div className="mp-info-ic mp-fav-ic">
          <h1 className="mp-fav-title mp-info-title">Favorite Blogs</h1>

          {favorite_blogs? <>
            </> :
              <div className="mp-no-data">
                <div className="mp-no-data-msg">
                  No Blogs Selected.
                </div>
              </div>
            }
        </div>

        <div className="mp-info-ic mp-socials-ic ">
          <h1 className="mp-socials-title mp-info-title">Socials</h1>

          <div className="mp-socials">
            {
              <AnimationWrapper
                transition={{ duration: 0.3 }}
              >
                <div className="mp-social-link">
                  <i className="mp-social-icon instagram-icon bx bxl-instagram-alt"></i>
                  <input
                    spellCheck="false"
                    defaultValue={social_links.instagram} type="text" className="mp-social-url mp-instagram-url text-clamp" />
                </div>
              </AnimationWrapper>
            }
            {
              <AnimationWrapper
                transition={{ duration: 0.3 }}
              >
                <div className="mp-social-link">
                  <i className="mp-social-icon linkedin-icon bx bxl-linkedin-square"></i>
                  <input
                    spellCheck="false"
                    defaultValue={social_links.linkedin} type="text" className="mp-social-url mp-linkedin-url text-clamp" />
                </div>
              </AnimationWrapper>
            }
            {
              <AnimationWrapper
                transition={{ duration: 0.3 }}
              >
                <div className="mp-social-link">
                  <i className="mp-social-icon facebook-icon bx bxl-facebook-square"></i>
                  <input
                    spellCheck="false"
                    defaultValue={social_links.facebook} type="text" className="mp-social-url mp-facebook-url text-clamp" />
                </div>
              </AnimationWrapper>
            }
            {
              <AnimationWrapper
                transition={{ duration: 0.3 }}
              >
                <div className="mp-social-link">
                  <i className="mp-social-icon twitter-icon bx bxl-twitter"></i>
                  <input
                    spellCheck="false"
                    defaultValue={social_links.twitter} type="text" className="mp-social-url mp-twitter-url text-clamp" />
                </div>
              </AnimationWrapper>
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default MainPanel;
