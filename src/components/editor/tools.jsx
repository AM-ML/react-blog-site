import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { convertToBase64 } from "./banner";
import axios from "axios";

const uploadImgByUrl = async (url) => {
  return new Promise((resolve, reject) => {
    // Validate URL (basic example)
    const isValidUrl = (string) => {
      const res = string.match(/(http|https):\/\/[^ "]+/);
      return (res !== null);
    };

    if (isValidUrl(url)) {
      // If the URL is valid, resolve with the expected format
      resolve({
        success: 1,
        file: { url }, // Return the URL as expected
      });
    } else {
      reject('Invalid URL');
    }
  });
};


const uploadImgByFile = async (e) => {
  const b64 = await convertToBase64(e);
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/uploadImage`, { base64: b64 });
    
    // Check if the response contains the expected data
    const url = response.data.url; // Change to 'url' to match the expected response format
    console.log("Image uploaded successfully:", url);
    
    return {
      success: 1,
      file: { url }, // Make sure to return 'url' as expected
    };
  } catch (err) {
    console.error("Image upload failed:", err);
    return {
      success: 0,
      message: "Image upload failed",
    }; // Return a failure response
  }
};

export const tools = {
  embed: Embed,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImgByUrl,
        uploadByFile: uploadImgByFile,
      },
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  link: Link,
  header: {
    class: Header,
    config: {
      placeholder: "Header...",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};
