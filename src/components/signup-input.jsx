import logo from "/new3.png"
import "../css/components/signup-input.css";
import { Link } from "react-router-dom";
import { useRef } from "react";

const SignupInput = ({ func, toast, Toaster, googleAuthFunc }) => {
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;  // regex for password
    
    const formdata = new FormData(form.current);
    let fd = {};

    for(let [key, value] of formdata.entries()) {
      fd[key] = value;
    }

    const {name, email, password} = fd;

    if(name.length < 5) {
      toast.error("name must be atleast 5 letters long");
    }
    if (!email.length) {
      toast.error("Enter Email");
    }  if (!emailRegex.test(email)) {
      toast.error("Invalid Email");
    }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be 6 to 20 characters with a numeric and 1 lowercase letter ");
    }

    let serverRoute = '/signup';
    const dataToSend = {
      email,
      password,
      name
    }

    func(serverRoute, dataToSend);
  }

  return <div className="signup-form-container">
    <form ref={form} onSubmit={handleSubmit} className="signup-form">
      <img src={logo} width={64} />

      <h3 className="signup-title text-bold text-google mt-3">
        Sign Up
      </h3>
      <Toaster />
      <div className="input-group" style={{ "marginTop": "12%" }}>
        <i className="input-group-text fa fa-user"></i>
        <input
          className="signup-name-input form-control mt-0"
          type="text"
          placeholder="Full Name"
          name="name" id="signup-name"
          required />
      </div>

      <div className="input-group mt-2">
        <i className="input-group-text fa fa-envelope"></i>
        <input
          className="signup-username-input form-control mt-0"
          type="text"
          placeholder="Email"
          name="email" id="signup-username signup-email"
          required />
      </div>

      <div className="input-group mt-2">
        <i className="input-group-text fa fa-lock"></i>
        <input
          className="signup-password-input mt-0 form-control mb-0"
          type="password"
          placeholder="Password"
          name="password" id="signup-password"
          required />
      </div>

      <button className="signup-button" style={{ "marginTop": "10%" }}>Sign Up</button>
      <button  onClick={googleAuthFunc} type="button" className="signup-with-google-btn" >
        Continue with Google
      </button>
      <p className="mt-3 text-sm">Already have an account? <Link to="/signin" className="auth-link text-primary">Sign In</Link></p>
    </form>
  </div>
}

export default SignupInput;