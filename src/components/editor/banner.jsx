import "../../css/components/editor/banner.css";
import defaultBanner from "../../assets/blog_banner.png";
import axios from "axios";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EditorContext } from "../../pages/editor";

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };
  });
};

const EditorBanner = () => {
  let { blog, blog: { title, banner, content, tags, description }, setBlog } = useContext(EditorContext);


  const handleBannerUpload = async (e) => {
    const img = e.target.files[0];
    if (img) {
      const b64 = await convertToBase64(img);

      let toastId = toast.loading("Uploading Image...");
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/uploadBanner`, { base64: b64 });
        const urlget = response.data.url;
        setBlog({ ...blog, banner: urlget });

        toast.remove(toastId);
      } catch (err) {
        toast.remove(toastId);
        const errorMessage = err?.response?.data?.message || err.message || "An error occurred";
        toast.error(errorMessage);
      }
    }
  };

  const handleBannerError = () => {
    setBlog({ ...blog, banner: defaultBanner });
  }

  return (
    <>
      <Toaster />
      <div className="ep-banner-i aspect-video border border-2">
        <label htmlFor="ep-banner-input">
          <img src={banner} alt="" onError={handleBannerError} />
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="ep-banner-input"
            onChange={handleBannerUpload}
            hidden
          />
          <div className="ep-banner-text"></div>
        </label>
      </div>
    </>
  );
};

export default EditorBanner;
