import "../css/themes/light.css";
import "../css/components/main-panel.css";
import { useContext } from "react";
import {UserContext} from "../Router";
import { TitleCase } from "../common/string";

const MainPanel = () => {
  let {userAuth: {access_token, name, username, email,  profile_img}} = useContext(UserContext);
  return (
    <>
    <div className="mp-container bg">
      <div className="mt-3 mp-grid-item mp-item-1 bg cspan-12 rspan-2 mp-r1-item">
        <div className="gen-1 c-id-1">
          <img className="id-1" src={profile_img}/>
        </div>
        <div className="gen-1 c-id-2"> 
          <h1 className="id-2">Ali M. Moumneh</h1>
          <h1 className="id-3">@ali1</h1>
        </div>
        <div className="gen-1"></div>
      </div>

      <div className="mb-3 mp-grid-item mp-item-2 bg cspan-4 rspan-3 mp-r2-item">
        <div className="sections-3-title">
          <h3 className="font-bolder">Interests</h3>
        </div>
        <div className="mp-section-content border-end border-dark">

        </div>
      </div> 
      <div className="mb-3 mp-grid-item mp-item-3 bg cspan-4 rspan-3 mp-r2-item">
        <div className="sections-3-title">
          <h3 className="font-bolder">Favorite Articles</h3>
        </div>
        <div className="mp-section-content border-end border-dark">

        </div>
      </div>
      <div className="mb-3 mp-grid-item mp-item-4 bg cspan-4 rspan-3 mp-r2-item">
        <div className="sections-3-title">
          <h3 className="font-bolder">
            Social Links
          </h3>
        </div>
        <div className="mp-section-3-content border-end border-dark">
          <div className="mp-social-row mp-social-twitter">
            <div className="social-1">
              <i className="fa-brands fa-twitter fs-64px"></i>
            </div>
            <div className="social-2">
              <a target="_blank" href="https://x.com/ali-moumneh_2">Twitter</a>
            </div>
          </div>
          <div className="mp-social-row mp-social-facebook">
            <div className="social-1">
              <i className="fa-brands fa-facebook fs-64px"></i>
            </div>
            <div className="social-2">
              <a target="_blank" href="https://facebook.com/ali-moumneh">Facebook</a>
            </div>
          </div>
          <div className="mp-social-row mp-social-instagram">
            <div className="social-1">
              <i className="fa-brands fa-instagram fs-64px"></i>
            </div>
            <div className="social-2">
              <a target="_blank" href="https://instagram.com/ali-moumneh">Instagram</a>
            </div>
          </div>
          <div className="mp-social-row mp-social-linkedin">
            <div className="social-1">
              <i className="fa-brands fa-linkedin fs-64px"></i>
            </div>
            <div className="social-2">
              <a target="_blank" href="https://linkedin.com/ali-moumneh">LinkedIn</a>
            </div> 
          </div>
        </div>
      </div>
    </div>

    <div className="mp-container bg2">  
      <div className="mt-3 mp-grid-item mp-item-1 bg cspan-12 rspan-2 mp-r1-item">
      </div>
      <div className="mb-3 mp-grid-item mp-item-2 bg cspan-4 rspan-3 mp-r2-item">
      </div> 
      <div className="mb-3 mp-grid-item mp-item-3 bg cspan-4 rspan-3 mp-r2-item">
      </div>
      <div className="mb-3 mp-grid-item mp-item-4 bg cspan-4 rspan-3 mp-r2-item">
      </div>
    </div>
  </>
  )
}

export default MainPanel;