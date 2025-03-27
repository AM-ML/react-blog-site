import { useState } from "react";
import "../css/components/newsletter-subscribe.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic email validation regex
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validateEmail = (email) => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return toast.error(error || "Please enter a valid email address");
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/newsletter/subscribe",
        { email },
        { timeout: 10000 } // Add timeout to prevent long-hanging requests
      );
      
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      
      if (error.response) {
        // Server responded with an error
        const errorMessage = error.response.data.error || "Failed to subscribe";
        setError(errorMessage);
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        setError("Network error - please try again later");
        toast.error("Network error - please try again later");
      } else {
        // Something else happened while setting up the request
        setError("Subscription failed - please try again");
        toast.error("Subscription failed - please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <Toaster />
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
          <p className="newsletter-description">
            Get the latest updates, news, and special offers delivered directly to your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) validateEmail(e.target.value);
                }}
                className={`newsletter-input ${error ? "newsletter-input-error" : ""}`}
                required
                aria-label="Email address for newsletter"
                aria-describedby="newsletter-error"
                disabled={loading}
              />
              <button 
                type="submit" 
                className="newsletter-button"
                disabled={loading}
                aria-label="Subscribe to newsletter"
              >
                {loading ? (
                  <div className="newsletter-spinner" aria-hidden="true"></div>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
            {error && <div id="newsletter-error" className="newsletter-error">{error}</div>}
          </form>
          
          <p className="newsletter-privacy">
            By subscribing, you agree to our <a href="#">Privacy Policy</a> and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe; 