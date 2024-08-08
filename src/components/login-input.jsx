import logo from "/new3.png"
import "../css/components/login-input.css";
import { Link } from "react-router-dom";
import { useRef } from "react";

const LoginInput = ({ func, toast, Toaster, googleAuthFunc }) => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;  // regex for password


    // access user input
    let formdata = new FormData(form.current);
    let fd = {};

    for (let [key, value] of formdata.entries()) { // for name, value of each input in the form element
      fd[key] = value; // store user data
    }
    const { email, password } = fd;

    // form validation
    if (!email.length) {
      toast.error("Enter Email");
    } if (!emailRegex.test(email)) {
      toast.error("Invalid Email");
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be 6 to 20 characters with a numeric and 1 lowercase letter ");
    }

    let serverRoute = '/signin';
    const dataToSend = {
      email,
      password
    }

    func(serverRoute, dataToSend);
  }

  return <div className="login-form-container">
    <form ref={form} className="login-form" onSubmit={handleSubmit}>
      <img src={logo} width={64} />

      <h3 className="login-title text-bold text-google mt-3">
        Sign In
      </h3>
      <Toaster />
      <div className="input-group" style={{ "marginTop": "12%" }}>
        <i className="input-group-text fa fa-envelope"></i>
        <input
          className="login-username-input form-control mt-0"
          type="text"
          placeholder="Email"
          name="email" id="login-username login-email"
          required />
      </div>

      <div className="input-group mt-2">
        <i className="input-group-text fa fa-lock"></i>
        <input
          className="login-password-input mt-0 form-control mb-0"
          type="password"
          placeholder="Password"
          name="password" id="login-password"
          required />
      </div>

      <button type="submit" className="login-button" style={{ "marginTop": "10%" }}>Sign In</button>
      <button onClick={googleAuthFunc} type="button" className="login-with-google-btn" >
        Continue with Google
      </button>
      <p className="mt-3 text-sm">
        Don't have an account?&nbsp;
        <Link to="/signup" className="auth-link text-primary">
          Sign Up
        </Link>
      </p>
    </form>
  </div>
}

export default LoginInput;