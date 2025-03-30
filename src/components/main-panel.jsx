import "../css/themes/light.css";
import "../css/components/main-panel.css";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Router";
import cloud_img from "../assets/upload_to_cloud_white.webp";
import { TitleCase } from "../common/string";
import AnimationWrapper from "../common/page-animation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { convertToBase64 } from "./editor/banner";
import { Link } from "react-router-dom";

const MainPanel = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);
  const {
    id,
    name,
    access_token,
    username,
    email,
    profile_img,
    social_links,
    interests,
    favorite_blogs,
    google_auth,
    is_author,
  } = userAuth;

  const [backupImg, setBackupImg] = useState(profile_img);
  const [availableServices, setAvailableServices] = useState([
    "Civil Engineering",
    "Architecture",
    "Interior Design",
    "Electrical Engineering",
    "Project Management",
    "Sustainability Management",
    "Financial Analysis",
    "Insights",
  ]);
  const [selectedInterests, setSelectedInterests] = useState(interests || []);
  const [userFavoriteBlogs, setUserFavoriteBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  };
  const updateAccount = (id, access_token, info) => {
    let loadId = toast.loading("Updating Account...");

    const updatedInfo = { ...info };
    if (userAuth.isGoogleAccount) {
      delete updatedInfo.email;
    }

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/update-account",
        {
          id,
          personal_info: {
            name: updatedInfo.name,
            profile_img: updatedInfo.profile_img || profile_img,
          },
          social_links: updatedInfo.social_links,
          interests: updatedInfo.interests || selectedInterests,
        },
        config
      )
      .then(({ data }) => {
        setUserAuth((prev) => ({ ...prev, ...data }));
        toast.dismiss(loadId);
        toast.success("Account updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss(loadId);
        toast.error("Failed to update account. Please try again.");
      });
  };
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    setBackupImg(profile_img);

    if (file) {
      const b64 = await convertToBase64(file);

      let toastId = toast.loading("Uploading Image...");

      try {
        const response = await axios.post(
          import.meta.env.VITE_SERVER_DOMAIN + "/uploadImage",
          { base64: b64, is_profile_img: true }
        );

        let url = response.data.url;

        axios
          .post(
            import.meta.env.VITE_SERVER_DOMAIN + "/update-account",
            { id, personal_info: { profile_img: url } },
            config
          )
          .then((resp) => resp)
          .catch((err) => {
            throw new Error("Couldn't update account successfully");
          });

        setUserAuth({ ...userAuth, profile_img: url });
        toast.dismiss(toastId);
        toast.success("Uploaded Profile Image Successfully");
        updateAccount(id, access_token, { profile_img: url });
      } catch (err) {
        toast.dismiss(toastId);
        toast.error("Error Occurred While Uploading Profile Image");
      }
    }
  };

  const [updatedAccount, setUpdatedAccount] = useState({
    name: TitleCase(name),
    email: email,
    social_links: { ...social_links },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social_links")) {
      const key = name.split(".")[1];
      setUpdatedAccount((prev) => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [key]: value,
        },
      }));
    } else {
      setUpdatedAccount((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = () => {
    updateAccount(id, userAuth.access_token, updatedAccount);
  };

  const handleProfileImgError = () => {
    toast.error("Error Occurred While Uploading Profile Image");
    setUserAuth({ ...userAuth, profile_img: backupImg });
  };

  useEffect(() => {
    // Load favorite blogs if there are any
    if (favorite_blogs && favorite_blogs.length > 0) {
      setIsLoadingBlogs(true);
      axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-favorite-blogs", {
          ids: favorite_blogs,
        })
        .then(({ data }) => {
          setUserFavoriteBlogs(data.blogs);
        })
        .catch((err) => {
          console.error("Error fetching favorite blogs:", err);
        })
        .finally(() => {
          setIsLoadingBlogs(false);
        });
    } else {
      setIsLoadingBlogs(false);
    }

    // Set initial interests
    if (interests) {
      setSelectedInterests(interests);
    }
  }, [favorite_blogs, interests]);

  const toggleInterest = (interest) => {
    const isSelected = selectedInterests.includes(interest);
    let updatedInterests;

    if (isSelected) {
      updatedInterests = selectedInterests.filter((item) => item !== interest);
    } else {
      updatedInterests = [...selectedInterests, interest];
    }

    setSelectedInterests(updatedInterests);

    // Update account with new interests
    updateAccount(id, access_token, { interests: updatedInterests });
  };

  const handleAddInterest = () => {
    // Show dialog to select interest
    const remainingServices = availableServices.filter(
      (service) => !selectedInterests.includes(service)
    );

    if (remainingServices.length === 0) {
      toast.error("You've added all available interests!");
      return;
    }

    // This is a simplified dialog. In a real app, you'd create a proper modal with selection
    const service = window.prompt(
      "Select an interest:\n\n" + remainingServices.join("\n")
    );

    if (service && remainingServices.includes(service)) {
      toggleInterest(service);
    } else if (service) {
      toast.error("Please select a valid interest from the list.");
    }
  };

  const removeFromFavorites = (blogId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/toggle-favorite",
        { blogId, userId: id },
        config
      )
      .then(({ data }) => {
        if (!data.favorited) {
          // Remove from UI immediately
          setUserFavoriteBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => blog._id !== blogId)
          );
          toast.success("Removed from favorites");

          // Update the userAuth favorites list
          setUserAuth((prev) => ({
            ...prev,
            favorite_blogs: prev.favorite_blogs.filter((id) => id !== blogId),
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating favorites");
      });
  };

  return (
    <main className="mp-container">
      <Toaster />
      <section className="mp-submit-bc">
        <h1 className="mp-submit-bc-page-title">Edit</h1>
        <button
          className="btn btn-lg mp-submit-btn cpwd-submit"
          onClick={handleSaveChanges}
        >
          Save
        </button>
      </section>

      <section className="mp-input-container">
        <article className="mp-profile-img-ic">
          <label htmlFor="mp-profile-img-input" className="mp-img-overlay">
            <img
              src={cloud_img}
              alt="Upload to cloud"
              className="mp-overlay-img"
              loading="lazy"
            />

            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="mp-profile-img-input"
              onChange={handleFileSelect}
              hidden
            />
          </label>
          <img
            src={profile_img}
            onError={handleProfileImgError}
            alt="Profile Image"
            className="mp-profile-img"
            loading="lazy"
          />
        </article>

        <article className="mp-text-ic">
          <div className="mp-name-ic">
            <input
              name="name"
              value={updatedAccount.name}
              onChange={handleInputChange}
              type="text"
              spellCheck="false"
              className={"mp-name " + (google_auth ? "disabled" : "")}
              disabled={google_auth}
            />
          </div>

          <div className="mp-email-ic">
            <input
              name="email"
              type="text"
              value={updatedAccount.email}
              onChange={handleInputChange}
              className={"mp-email " + (google_auth ? "disabled" : "")}
              spellCheck="false"
              disabled={google_auth}
            />
          </div>
        </article>
      </section>

      <section className="mp-info-container">
        {/* Interests Section */}
        <section className="mp-info-ic mp-interests-ic">
          <h2 className="mp-interests-title mp-info-title">Interests</h2>
          <div className="mp-interests">
            {selectedInterests &&
              selectedInterests.map((interest, index) => (
                <div key={index} className="mp-interest-tag">
                  {interest}
                  <i
                    className="bx bx-x"
                    onClick={() => toggleInterest(interest)}
                  ></i>
                </div>
              ))}
            <div className="mp-add-container" onClick={handleAddInterest}>
              <i className="bx bx-plus mp-add-icon"></i>
            </div>
          </div>
        </section>

        {/* Favorite Blogs Section */}
        <section className="mp-info-ic mp-fav-ic">
          <h2 className="mp-fav-title mp-info-title">Favorite Blogs</h2>
          {isLoadingBlogs ? (
            <div className="mp-loading">Loading favorite blogs...</div>
          ) : userFavoriteBlogs?.length ? (
            <div className="mp-favorite-blogs">
              {userFavoriteBlogs.map((blog) => (
                <div key={blog._id} className="mp-favorite-blog-item">
                  <Link
                    to={`/blog/${blog.blog_id}`}
                    className="mp-fav-blog-title"
                  >
                    {TitleCase(blog.title)}
                  </Link>
                  <div className="mp-fav-blog-actions">
                    <i
                      className="bx bx-trash"
                      onClick={() => removeFromFavorites(blog._id)}
                      title="Remove from favorites"
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mp-no-data">
              <div className="mp-no-data-msg">No Blogs Selected.</div>
            </div>
          )}
        </section>

        {/* Social Links Section */}
        {is_author && (
          <section className="mp-info-ic mp-socials-ic">
            <h2 className="mp-socials-title mp-info-title">Socials</h2>
            <div className="mp-socials">
              <AnimationWrapper transition={{ duration: 0.3 }}>
                <div className="mp-social-link">
                  <i className="mp-social-icon instagram-icon bx bxl-instagram-alt"></i>
                  <input
                    name="social_links.instagram"
                    value={updatedAccount.social_links.instagram}
                    onChange={handleInputChange}
                    spellCheck="false"
                    type="text"
                    className="mp-social-url mp-instagram-url text-clamp"
                  />
                </div>
              </AnimationWrapper>
              <AnimationWrapper transition={{ duration: 0.3 }}>
                <div className="mp-social-link">
                  <i className="mp-social-icon linkedin-icon bx bxl-linkedin-square"></i>
                  <input
                    name="social_links.linkedin"
                    value={updatedAccount.social_links.linkedin}
                    onChange={handleInputChange}
                    spellCheck="false"
                    type="text"
                    className="mp-social-url mp-linkedin-url text-clamp"
                  />
                </div>
              </AnimationWrapper>
              <AnimationWrapper transition={{ duration: 0.3 }}>
                <div className="mp-social-link">
                  <i className="mp-social-icon facebook-icon bx bxl-facebook-square"></i>
                  <input
                    name="social_links.facebook"
                    value={updatedAccount.social_links.facebook}
                    onChange={handleInputChange}
                    spellCheck="false"
                    type="text"
                    className="mp-social-url mp-facebook-url text-clamp"
                  />
                </div>
              </AnimationWrapper>
              <AnimationWrapper transition={{ duration: 0.3 }}>
                <div className="mp-social-link">
                  <i className="mp-social-icon twitter-icon bx bxl-twitter"></i>
                  <input
                    name="social_links.twitter"
                    value={updatedAccount.social_links.twitter}
                    onChange={handleInputChange}
                    spellCheck="false"
                    type="text"
                    className="mp-social-url mp-twitter-url text-clamp"
                  />
                </div>
              </AnimationWrapper>
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default MainPanel;
