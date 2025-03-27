import { TitleCase } from "../common/string";
import "../css/components/author-card.css";
import { Link } from "react-router-dom";

const AuthorCard = ({ author, addBorder }) => {
  let { name, username, profile_img } = author;
  name = TitleCase(name);
  return (
    <Link to={`/author/${username}`} className="atc-container">
      <img src={profile_img} className="atc-img" />

      <div className="atc-text-container">
        <h1 className="atc-name text-clamp"> { name } </h1>
        <p className="atc-username"> @{ username } </p>
      </div>
    </Link>
  )
}

export default AuthorCard;
