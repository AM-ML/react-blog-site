import {useEffect, useRef, useState} from "react";
import "../css/components/inpage-navigation.css";
import FilterBy from "./filterby";

const InPageNavigation = ({ blogs = [], filterFunc = ({tags, date}) => {}, routes, defaultHidden = [], defaultActiveIndex = 0, children }) => {
  const [activePageIndex, setActivePageIndex] = useState(defaultActiveIndex);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768); // State for screen size
  const hrRef = useRef(null);
  const activeTabRef = useRef(null);

  const changePageState = (btn, i) => {
    const { offsetWidth, offsetLeft } = btn;

    hrRef.current.style.width = offsetWidth + "px";
    hrRef.current.style.left = offsetLeft + "px";

    setActivePageIndex(i);
  }

  // Check screen size on mount and when resized
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex);
  }, [defaultActiveIndex]);

  const handleFilter = ({ tags, date }) => {
    filterFunc({ tags, date });
  };

  return (
    <>
      <div className="ipn-container">
        {
          routes.map((route, i) => {
            return (
              <button key={i}
                ref={i === defaultActiveIndex ? activeTabRef : null}
                className={
                  `ipn-route-btn ${activePageIndex === i && "active"} `
                  + (defaultHidden.includes(route) ? 'md-hidden' : '')
                }
                onClick={(e) => changePageState(e.target, i)}
              >
                {route}
              </button>
            );
          })
        }
        <FilterBy blogs={blogs} onFilter={handleFilter} />
        <hr className="ipn-routes-hr" ref={hrRef} />
      </div>

      {/* Display active page and defaultHidden pages based on screen width */}
      <div className="ipn-content">
        {Array.isArray(children) ? (
          <>
            {children[activePageIndex]}
            {isWideScreen && defaultHidden.map(route => {
              const hiddenIndex = routes.indexOf(route);
              if (hiddenIndex !== -1 && hiddenIndex !== activePageIndex) {
                return children[hiddenIndex];
              }
              return null;
            })}
          </>
        ) : (
          children
        )}
      </div>
    </>
  );
}

export default InPageNavigation;
