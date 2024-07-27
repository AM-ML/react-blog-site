import logo from "/new3.png"
import "../css/components/signup-input.css";
import { Link } from "react-router-dom";

const SignupInput = () => {
  return <div className="signup-form-container">
    <form className="signup-form">
      <img src={logo} width={64} />

        <h3 className="signup-title text-bold text-google mt-3">
          Sign Up
        </h3>

        <div className="input-group" style={{"marginTop": "12%"}}>
          <i className="input-group-text fa fa-user"></i>
          <input className="signup-name-input form-control mt-0"  type="text" placeholder="Full Name" id="signup-name"/>
        </div>

        <div className="input-group mt-2">
          <i className="input-group-text fa fa-envelope"></i>
          <input className="signup-username-input form-control mt-0"  type="text" placeholder="Email" id="signup-username"/>
        </div>

        <div className="input-group mt-2">
          <i className="input-group-text fa fa-lock"></i>
          <input className="signup-password-input mt-0 form-control mb-0" type="password" placeholder="Password" id="signup-password"/>
        </div>

        <button className="signup-button" style= {{"marginTop": "10%"}}>Sign Up</button>
        <button type="button" className="signup-with-google-btn" >
          Sign Up with Google
        </button>
        <p className="mt-3 text-sm">Already have an account? <Link to="/signin" className="auth-link text-primary">Sign In</Link></p>
    </form>
  </div>
}

export default SignupInput;