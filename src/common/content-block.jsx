import "../css/common/content-block.css";

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

const ContentBlock = ({ block }) => {
  let { id, type, data } = block;

  const parsedHTML = data?.text ? convertInlineCodeLinks(data.text) : "";

  if (type == "paragraph")
    return (
      <div
        className="ctb-container ctb-paragraph"
        dangerouslySetInnerHTML={{ __html: parsedHTML }}
        key={id}
      ></div>
    );

  if (type == "header")
    return (
      <div
        className={"ctb-element ctb-header level-" + data.level}
        dangerouslySetInnerHTML={{ __html: parsedHTML }}
        key={id}
      ></div>
    );

  if (type == "image") {
    if (!data.file?.url) return <></>;
    return (
      <div
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
      <div className={"ctb-element ctb-quote " + data.alignment}>
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
      <ol className="ctb-element ctb-list ctb-ol">{items}</ol>
    ) : (
      <ul className="ctb-element ctb-ul ctb-list">{items}</ul>
    );
  }

  return (
    <div className="ctb-container" key={id}>
      <br />
    </div>
  );
};

export default ContentBlock;
