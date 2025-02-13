import { useContext, useRef, useState } from "react";
import "../css/components/dashboard-change-pwd.css";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../Router";
import axios from "axios";

const ChangePassword = () => {
  const {
    userAuth: { access_token },
  } = useContext(UserContext);
  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const submitBtnRef = useRef(null);
  const CPRef = useRef(null);
  const NPRef = useRef(null);

  let pwdRegex = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;

  const handleCPChange = (e) => {
    setCurPwd(e.target.value);
  };
  const handleNPChange = (e) => {
    setNewPwd(e.target.value);
  };
  const handleSubmit = () => {
    if (!curPwd.length || !newPwd.length) {
      return toast.error("Fill All Inputs");
    }
    if (!pwdRegex.test(newPwd) || !pwdRegex.test(curPwd)) {
      return toast.error(
        "Password must be 6 to 20 characters with a numeric and 1 lowercase letter."
      );
    }
    submitBtnRef.current.disabled = true;
    submitBtnRef.current.classList.add("disabled");

    let loadingToast = toast.loading("Updating Password...");

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/change-password",
        { currentPassword: curPwd, newPassword: newPwd },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(() => {
        toast.dismiss(loadingToast);
        submitBtnRef.current.disabled = false;
        submitBtnRef.current.classList.remove("disabled");
        return toast.success("Password Updated");
      })
      .catch(({ response }) => {
        toast.dismiss(loadingToast);
        submitBtnRef.current.disabled = false;
        submitBtnRef.current.classList.remove("disabled");
        return toast.error(response.data.error);
      })
      .finally(() => {
        CPRef.current.value = "";
        NPRef.current.value = "";
      });
  };

  return (
    <div className="cpwd-container">
      <Toaster />
      <div className="mp-submit-bc cpwd-header">
        <h1 className="cpwd-title">Change Password</h1>
        <button
          ref={submitBtnRef}
          onClick={handleSubmit}
          className="btn btn-lg mp-submit-btn"
        >
          Submit
        </button>
      </div>
      <form
        className="cpwd-form"
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            handleSubmit();
          }
        }}
      >
        <div className="cpwd-input-container">
          <input
            ref={CPRef}
            placeholder="Current Password"
            type="password"
            className="cpwd-input input-box form-control"
            onChange={handleCPChange}
          />
        </div>

        <div className="cpwd-input-container">
          <input
            ref={NPRef}
            placeholder="New Password"
            type="password"
            className="cpwd-input input-box form-control"
            onChange={handleNPChange}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
