import { useContext, useEffect, useState } from "react";
import AnimationWrapper from "../../common/page-animation";
import axios from "axios";
import { UserContext } from "../../Router";
import "../../css/components/admin/newsletter.css";
import { formatDate } from "../../common/functions";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion, AnimatePresence } from "framer-motion";

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingNewsletter, setSendingNewsletter] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [newsletterForm, setNewsletterForm] = useState({
    subject: "",
    content: "",
  });
  const [formErrors, setFormErrors] = useState({
    subject: "",
    content: "",
  });

  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/newsletter/subscribers",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          timeout: 10000, // Add timeout
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
            Authorization: `Bearer ${access_token}`,
          },
          timeout: 10000, // Add timeout
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
    return results.every((result) => result === true);
  };

  const validateForm = () => {
    const errors = {
      subject: "",
      content: "",
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
    if (
      !window.confirm(
        `Are you sure you want to send this newsletter to ${subscribers.length} subscribers?`
      )
    ) {
      return;
    }

    setSendingNewsletter(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_DOMAIN + "/admin/newsletter/send",
        newsletterForm,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          timeout: 30000, // Longer timeout for sending emails
        }
      );

      const successMsg =
        response.data.failedCount > 0
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
      [name]: value,
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleContentChange = (content) => {
    setNewsletterForm((prev) => ({
      ...prev,
      content,
    }));

    // Clear content error when user types
    if (formErrors.content) {
      setFormErrors((prev) => ({
        ...prev,
        content: "",
      }));
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AnimationWrapper>
      <div className="admin-newsletter">
        <Toaster position="top-right" />

        <div className="admin-newsletter-header">
          <h1 className="admin-page-title">Newsletter Management</h1>
          <p className="admin-page-subtitle">
            Manage subscribers and send newsletters to your audience
          </p>
        </div>

        <div className="admin-newsletter-grid">
          <motion.div
            className="admin-newsletter-subscribers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="admin-section-header">
              <h2 className="admin-section-title">
                <i className="fi fi-rr-users"></i> Subscribers
              </h2>
              <div className="admin-section-count">
                {loading ? "Loading..." : `${subscribers.length} active`}
              </div>
            </div>

            {loading ? (
              <div className="admin-loading-container">
                <div className="admin-loading-spinner"></div>
                <p>Loading subscribers...</p>
              </div>
            ) : (
              <motion.div
                className="admin-subscribers-list"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {subscribers.length > 0 ? (
                  subscribers.map((subscriber) => (
                    <motion.div
                      key={subscriber._id}
                      className="admin-subscriber-item"
                      variants={item}
                    >
                      <div className="admin-subscriber-email">
                        <i className="fi fi-rr-envelope"></i>
                        {subscriber.email}
                      </div>
                      <div className="admin-subscriber-date">
                        <i className="fi fi-rr-calendar"></i>
                        Subscribed on {formatDate(subscriber.subscribedAt)}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="admin-no-data">
                    <i className="fi fi-rr-users"></i>
                    <h3>No subscribers yet</h3>
                    <p>
                      When users subscribe to your newsletter, they'll appear
                      here
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          <div className="admin-newsletter-history">
            <div className="admin-section-header">
              <h2 className="admin-section-title">
                <i className="fi fi-rr-envelope-open"></i> Newsletter History
              </h2>
              <button
                className="admin-compose-btn"
                onClick={() => setShowCompose(!showCompose)}
                disabled={sendingNewsletter}
              >
                {showCompose ? (
                  <>
                    <i className="fi fi-rr-cross-small"></i> Cancel
                  </>
                ) : (
                  <>
                    <i className="fi fi-rr-pencil"></i> Compose New
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {showCompose && (
                <motion.div
                  className="admin-compose-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSendNewsletter}>
                    <div className="admin-form-group">
                      <label htmlFor="subject">
                        <i className="fi fi-rr-text"></i> Subject Line
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder="Enter newsletter subject"
                        value={newsletterForm.subject}
                        onChange={handleInputChange}
                        className={
                          formErrors.subject ? "admin-input-error" : ""
                        }
                        disabled={sendingNewsletter}
                        maxLength={100}
                        required
                      />
                      {formErrors.subject && (
                        <div className="admin-form-error">
                          {formErrors.subject}
                        </div>
                      )}
                      <div className="admin-form-help">
                        {100 - newsletterForm.subject.length} characters
                        remaining
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label htmlFor="content">
                        <i className="fi fi-rr-document-signed"></i> Content
                      </label>
                      <div className="admin-quill-editor">
                        <ReactQuill
                          value={newsletterForm.content}
                          onChange={handleContentChange}
                          modules={modules}
                          formats={formats}
                          placeholder="Write your newsletter content..."
                          className={
                            formErrors.content ? "admin-input-error" : ""
                          }
                          disabled={sendingNewsletter}
                          theme="snow"
                        />
                      </div>
                      {formErrors.content && (
                        <div className="admin-form-error">
                          {formErrors.content}
                        </div>
                      )}
                    </div>

                    <div className="admin-form-actions">
                      <button
                        type="button"
                        className="admin-cancel-btn"
                        onClick={() => setShowCompose(false)}
                        disabled={sendingNewsletter}
                      >
                        Cancel
                      </button>
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
                          <>
                            <i className="fi fi-rr-paper-plane"></i>
                            Send to {subscribers.length} Subscribers
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {loading ? (
              <div className="admin-loading-container">
                <div className="admin-loading-spinner"></div>
                <p>Loading newsletter history...</p>
              </div>
            ) : (
              <motion.div
                className="admin-newsletters-list"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {newsletters.length > 0 ? (
                  newsletters.map((newsletter) => (
                    <motion.div
                      key={newsletter._id}
                      className="admin-newsletter-item"
                      variants={item}
                      whileHover={{
                        y: -3,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="admin-newsletter-subject">
                        <i className="fi fi-rr-envelope-open"></i>
                        {newsletter.subject}
                      </div>
                      <div className="admin-newsletter-meta">
                        <i className="fi fi-rr-calendar"></i>
                        Sent on {formatDate(newsletter.sentAt)}
                        <span className="admin-newsletter-recipients">
                          <i className="fi fi-rr-users"></i>
                          {newsletter.recipientCount} recipients
                        </span>
                      </div>
                      <div className="admin-newsletter-sender">
                        <i className="fi fi-rr-user"></i>
                        By {newsletter.sentBy.personal_info.name} (@
                        {newsletter.sentBy.personal_info.username})
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="admin-no-data">
                    <i className="fi fi-rr-envelope"></i>
                    <h3>No newsletters sent yet</h3>
                    <p>When you send newsletters, they'll appear here</p>
                    <button
                      className="admin-compose-btn"
                      onClick={() => setShowCompose(true)}
                      disabled={sendingNewsletter}
                    >
                      <i className="fi fi-rr-pencil"></i> Compose First
                      Newsletter
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default AdminNewsletter;

