import "../css/common/content-block.css";
import { useEffect, useRef } from "react";

function convertInlineCodeLinks(html) {
  const div = document.createElement("div");
  div.innerHTML = html;

  const codes = div.querySelectorAll("code.inline-code");
  codes.forEach((code) => {
    const match = code.textContent.match(/^(.+?)\[(.+?)\]$/);
    if (match) {
      const a = document.createElement("a");
      a.href = match[1];
      a.textContent = match[2];
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      code.replaceWith(a);
    }
  });

  return div.innerHTML;
}

// Function to detect and make YouTube iframes responsive
function makeYouTubeIframesResponsive(element) {
  if (!element) return;
  
  // Find all iframes within the element
  const iframes = element.querySelectorAll('iframe');
  
  iframes.forEach(iframe => {
    // Check if it's a YouTube iframe
    const isYouTube = iframe.src && (
      iframe.src.includes('youtube.com/embed') ||
      iframe.src.includes('youtube-nocookie.com/embed') ||
      iframe.src.includes('youtu.be')
    );
    
    if (isYouTube) {
      // Create responsive wrapper if not already wrapped
      if (!iframe.parentElement.classList.contains('responsive-youtube-container')) {
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'responsive-youtube-container';
        
        // Replace iframe with wrapped iframe
        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
        
        // Apply responsive styles to iframe
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
      }
    }
  });
}

const ContentBlock = ({ block }) => {
  let { id, type, data } = block;
  const blockRef = useRef(null);
  
  const parsedHTML = data?.text ? convertInlineCodeLinks(data.text) : "";

  // Apply YouTube iframe responsiveness after rendering
  useEffect(() => {
    if (blockRef.current) {
      makeYouTubeIframesResponsive(blockRef.current);
    }
  }, [parsedHTML, data, type]);

  if (type == "paragraph")
    return (
      <div
        ref={blockRef}
        className="ctb-container ctb-paragraph"
        dangerouslySetInnerHTML={{ __html: parsedHTML }}
        key={id}
      ></div>
    );

  if (type == "header")
    return (
      <div
        ref={blockRef}
        className={"ctb-element ctb-header level-" + data.level}
        dangerouslySetInnerHTML={{ __html: parsedHTML }}
        key={id}
      ></div>
    );

  if (type == "image") {
    if (!data.file?.url) return <></>;
    return (
      <div
        ref={blockRef}
        className={
          "ctb-element ctb-image " +
          (data.stretched && " stretched ") +
          (data.withBorder && " border ") +
          (data.withBackground && " background")
        }
      >
        <img src={data.file.url} alt="" />
        <span
          className="ctb-image-caption"
          dangerouslySetInnerHTML={{
            __html: convertInlineCodeLinks(data.caption || ""),
          }}
        ></span>
      </div>
    );
  }

  if (type == "quote")
    return (
      <div 
        ref={blockRef}
        className={"ctb-element ctb-quote " + data.alignment}>
        <div
          className="ctb-quote-text"
          dangerouslySetInnerHTML={{
            __html: convertInlineCodeLinks(data.text),
          }}
        ></div>
        <span
          className="ctb-quote-caption"
          dangerouslySetInnerHTML={{
            __html: convertInlineCodeLinks(data.caption || ""),
          }}
        ></span>
      </div>
    );

  if (type == "link")
    return (
      <div
        ref={blockRef}
        className="ctb-element ctb-link"
        dangerouslySetInnerHTML={{
          __html: convertInlineCodeLinks(data.link || ""),
        }}
      ></div>
    );

  if (type == "list") {
    const items = data.items.map((item, i) => (
      <li
        className="ctb-list-item"
        dangerouslySetInnerHTML={{ __html: convertInlineCodeLinks(item) }}
        key={i}
      ></li>
    ));

    return data.style == "ordered" ? (
      <ol ref={blockRef} className="ctb-element ctb-list ctb-ol">{items}</ol>
    ) : (
      <ul ref={blockRef} className="ctb-element ctb-ul ctb-list">{items}</ul>
    );
  }

  return (
    <div ref={blockRef} className="ctb-container" key={id}>
      <br />
    </div>
  );
};

export default ContentBlock;
