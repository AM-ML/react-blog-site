import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../css/pages/unsubscribe.css";

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("initial"); // initial, loading, success, error

  useEffect(() => {
    // Get email from URL params
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      return toast.error("Please enter your email address");
    }
    
    setLoading(true);
    setStatus("loading");
    
    try {
      await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/newsletter/unsubscribe",
        { email },
        { timeout: 10000 }
      );
      
      setStatus("success");
      toast.success("Successfully unsubscribed from newsletter");
    } catch (error) {
      console.error("Error unsubscribing:", error);
      
      if (error.response) {
        if (error.response.status === 404) {
          setStatus("error");
          toast.error("Email not found in our subscribers list");
        } else {
          setStatus("error");
          toast.error(error.response.data.error || "Failed to unsubscribe");
        }
      } else {
        setStatus("error");
        toast.error("Network error - please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimationWrapper>
      <div className="unsubscribe-container">
        <Toaster />
        <div className="unsubscribe-card">
          <h1 className="unsubscribe-title">Unsubscribe from Newsletter</h1>
          
          {status === "success" ? (
            <div className="unsubscribe-success">
              <div className="unsubscribe-icon">
                <i className="fi fi-sr-check-circle"></i>
              </div>
              <h2>Successfully Unsubscribed</h2>
              <p>
                You have been successfully unsubscribed from our newsletter.
                We're sorry to see you go!
              </p>
              <p>
                If you'd like to subscribe again in the future, you can visit our website.
              </p>
              <a href="/" className="unsubscribe-home-btn">
                Return to Homepage
              </a>
            </div>
          ) : (
            <>
              <p className="unsubscribe-description">
                Please confirm your email address to unsubscribe from our newsletter.
              </p>
              
              <form onSubmit={handleUnsubscribe} className="unsubscribe-form">
                <div className="unsubscribe-input-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="unsubscribe-input"
                    required
                    disabled={loading || status === "success"}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="unsubscribe-button"
                  disabled={loading || status === "success"}
                >
                  {loading ? (
                    <div className="unsubscribe-spinner"></div>
                  ) : (
                    "Unsubscribe"
                  )}
                </button>
              </form>
              
              {status === "error" && (
                <div className="unsubscribe-error-message">
                  There was an error processing your request. Please try again or contact support.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default UnsubscribePage; 