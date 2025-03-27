import { useContext, useEffect, useState } from "react";
import AnimationWrapper from "../../common/page-animation";
import axios from "axios";
import { UserContext } from "../../Router";
import "../../css/components/admin/newsletter.css";
import { formatDate } from "../../common/functions";
import toast, { Toaster } from "react-hot-toast";

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [newsletterForm, setNewsletterForm] = useState({
    subject: "",
    content: ""
  });
  const [formErrors, setFormErrors] = useState({
    subject: "",
    content: ""
  });

  const {
    userAuth: { access_token }
  } = useContext(UserContext);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/newsletter/subscribers",
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          timeout: 10000 // Add timeout
        }
      );
      
      setSubscribers(response.data.subscribers);
      return true;
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please sign in again.");
        // Handle expired session (could redirect to login)
      } else {
        toast.error("Failed to fetch newsletter subscribers");
      }
      return false;
    }
  };

  const fetchNewsletters = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/newsletter/history",
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          timeout: 10000 // Add timeout
        }
      );
      
      setNewsletters(response.data.newsletters);
      return true;
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please sign in again.");
        // Handle expired session
      } else {
        toast.error("Failed to fetch newsletter history");
      }
      return false;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const results = await Promise.all([fetchSubscribers(), fetchNewsletters()]);
    setLoading(false);
    return results.every(result => result === true);
  };

  const validateForm = () => {
    const errors = {
      subject: "",
      content: ""
    };
    let isValid = true;
    
    if (!newsletterForm.subject.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    } else if (newsletterForm.subject.length > 100) {
      errors.subject = "Subject must be less than 100 characters";
      isValid = false;
    }
    
    if (!newsletterForm.content.trim()) {
      errors.content = "Content is required";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return toast.error("Please fix the form errors before sending");
    }
    
    if (subscribers.length === 0) {
      return toast.error("There are no subscribers to send to");
    }
    
    // Confirm sending
    if (!window.confirm(`Are you sure you want to send this newsletter to ${subscribers.length} subscribers?`)) {
      return;
    }
    
    setSendingNewsletter(true);
    
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/newsletter/send",
        newsletterForm,
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          timeout: 30000 // Longer timeout for sending emails
        }
      );
      
      const successMsg = response.data.failedCount > 0
        ? `Newsletter sent to ${response.data.recipientCount} subscribers (${response.data.failedCount} failed)`
        : `Newsletter sent to ${response.data.recipientCount} subscribers`;
      
      toast.success(successMsg);
      setNewsletterForm({ subject: "", content: "" });
      setShowCompose(false);
      fetchNewsletters();
    } catch (error) {
      console.error("Error sending newsletter:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please sign in again.");
        } else {
          toast.error(error.response.data.error || "Failed to send newsletter");
        }
      } else if (error.request) {
        toast.error("Network error - The request may still be processing");
      } else {
        toast.error("Failed to send newsletter");
      }
    } finally {
      setSendingNewsletter(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsletterForm({
      ...newsletterForm,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up refresh interval for subscribers
    const interval = setInterval(() => {
      if (!showCompose && !sendingNewsletter) {
        fetchSubscribers();
      }
    }, 60000); // Refresh subscriber list every minute
    
    return () => clearInterval(interval);
  }, [showCompose, sendingNewsletter]);

  return (
    <AnimationWrapper>
      <div className="admin-newsletter">
        <Toaster />
        <h1 className="admin-page-title">Newsletter Management</h1>
        
        <div className="admin-newsletter-grid">
          <div className="admin-newsletter-subscribers">
            <div className="admin-section-header">
              <h2 className="admin-section-title">Subscribers</h2>
              <div className="admin-section-count">{subscribers.length} active subscribers</div>
            </div>
            
            {loading ? (
              <div className="admin-loading">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="admin-subscribers-list">
                {subscribers.length > 0 ? (
                  subscribers.map((subscriber) => (
                    <div key={subscriber._id} className="admin-subscriber-item">
                      <div className="admin-subscriber-email">{subscriber.email}</div>
                      <div className="admin-subscriber-date">
                        Subscribed on {formatDate(subscriber.subscribedAt)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="admin-no-data">No subscribers yet</div>
                )}
              </div>
            )}
          </div>
          
          <div className="admin-newsletter-history">
            <div className="admin-section-header">
              <h2 className="admin-section-title">Newsletter History</h2>
              <button 
                className="admin-compose-btn"
                onClick={() => setShowCompose(!showCompose)}
                disabled={sendingNewsletter}
              >
                {showCompose ? "Cancel" : "Compose New"}
              </button>
            </div>
            
            {showCompose && (
              <div className="admin-compose-form">
                <form onSubmit={handleSendNewsletter}>
                  <div className="admin-form-group">
                    <label htmlFor="subject">Subject Line</label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="Newsletter subject"
                      value={newsletterForm.subject}
                      onChange={handleInputChange}
                      className={formErrors.subject ? "admin-input-error" : ""}
                      disabled={sendingNewsletter}
                      maxLength={100}
                      required
                    />
                    {formErrors.subject && (
                      <div className="admin-form-error">{formErrors.subject}</div>
                    )}
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                      id="content"
                      name="content"
                      placeholder="Write your newsletter content..."
                      value={newsletterForm.content}
                      onChange={handleInputChange}
                      className={formErrors.content ? "admin-input-error" : ""}
                      rows={10}
                      disabled={sendingNewsletter}
                      required
                    ></textarea>
                    {formErrors.content && (
                      <div className="admin-form-error">{formErrors.content}</div>
                    )}
                    <div className="admin-form-help">
                      Use plain text. Line breaks will be preserved.
                    </div>
                  </div>
                  
                  <div className="admin-form-actions">
                    <button 
                      type="submit" 
                      className="admin-send-btn"
                      disabled={sendingNewsletter || subscribers.length === 0}
                    >
                      {sendingNewsletter ? (
                        <>
                          <span className="admin-btn-spinner"></span>
                          Sending...
                        </>
                      ) : (
                        `Send to ${subscribers.length} Subscribers`
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {loading ? (
              <div className="admin-loading">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="admin-newsletters-list">
                {newsletters.length > 0 ? (
                  newsletters.map((newsletter) => (
                    <div key={newsletter._id} className="admin-newsletter-item">
                      <div className="admin-newsletter-subject">{newsletter.subject}</div>
                      <div className="admin-newsletter-meta">
                        Sent on {formatDate(newsletter.sentAt)} to {newsletter.recipientCount} subscribers
                      </div>
                      <div className="admin-newsletter-sender">
                        By {newsletter.sentBy.personal_info.name} (@{newsletter.sentBy.personal_info.username})
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="admin-no-data">No newsletters sent yet</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default AdminNewsletter; 