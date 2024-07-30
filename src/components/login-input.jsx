import logo from "/new3.png"
import "../css/components/login-input.css";
import { Link } from "react-router-dom";

const LoginInput = () => {
  return <div className="login-form-container">
    <form className="login-form">
      <img src={logo} width={64} />

        <h3 className="login-title text-bold text-google mt-3">
          Sign In
        </h3>

        <div className="input-group" style={{"marginTop": "12%"}}>
          <i className="input-group-text fa fa-envelope"></i>
          <input className="login-username-input form-control mt-0"  type="text" placeholder="Email" id="login-username"/>
        </div>

        <div className="input-group mt-2">
          <i className="input-group-text fa fa-lock"></i>
          <input className="login-password-input mt-0 form-control mb-0" type="password" placeholder="Password" id="login-password"/>
        </div>

        <button className="login-button" style= {{"marginTop": "10%"}}>Sign In</button>
        <button type="button" className="login-with-google-btn" >
          Sign In with Google
        </button>
        <p className="mt-3 text-sm">Don't have an account? <Link to="/signup" className="auth-link text-primary">Sign Up</Link></p>
    </form>
  </div>
}

export default LoginInput;