import { useEffect } from "react";
import "../css/common/content-block.css";

const ContentBlock = ({ block }) => {
  useEffect(() => { console.log(block) }, []);

  let { id, type, data } = block;


  if (type == "paragraph") return (
    <div className="ctb-container ctb-paragraph"
      dangerouslySetInnerHTML={{ __html: data.text }}
      key={id}
    >
    </div>
  )

  if (type == "header") return (
    <div className={"ctb-element ctb-header level-" + data.level}
      dangerouslySetInnerHTML={{ __html: data.text }}
      key={id}
    >
    </div>
  )

  if (type == "image") return (
    <div className={"ctb-element ctb-image " + (data.stretched && " stretched ")
                                            + (data.withBorder && " border ")
                                            + (data.withBackground && " background")}
    >
      <img src={data.file.url} alt="" />
      <span className="ctb-image-caption"
        dangerouslySetInnerHTML={{ __html: data.caption }}
      >
      </span>
    </div>
  )
  if (type == "quote") return (
    <div className={"ctb-element ctb-quote " + (data.alignment) }>
      <div
        className="ctb-quote-text"
        dangerouslySetInnerHTML={{ __html: data.text }}
      >
      </div>
      <span
        className="ctb-quote-caption"
        dangerouslySetInnerHTML={{ __html: data.caption }}
      >
      </span>
    </div>
  )
  if (type == "link") return (
    <div href={data.link} className="ctb-element ctb-link"
      dangerouslySetInnerHTML={{ __html: data.link }}
    >
    </div>
  )

  if (type == "list") {
    if (data.style == "ordered") {
      return (
        <ol className="ctb-element ctb-list ctb-ol">
          {
            data.items.map((item, i) => {
              return <li className="ctb-list-item"
                dangerouslySetInnerHTML={{ __html: item}}
                key={i}
              >
              </li>
            })
          }
        </ol>
      )
    }
    else {
      return (
        <ul className="ctb-element ctb-ul ctb-list">
          {
            data.items.map((item, i) => {
              return <li className="ctb-list-item"
                dangerouslySetInnerHTML={{ __html: item}}
                key={i}
              >
              </li>
            })
          }
        </ul>
      )
    }
}

  else {
      return <div className="ctb-container"
        key = {id}
      >
      <br/ >
      </div>
    }
}

export default ContentBlock;
