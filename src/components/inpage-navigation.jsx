import {useContext, useEffect, useRef, useState} from "react";
import "../css/components/inpage-navigation.css";
import FilterBy from "./filterby";
import {FilterContext} from "./blogs-component";

const InPageNavigation = ({ routes, defaultHidden = [ ], defaultActiveIndex = 0, children}) => {
  const [activePageIndex, setActivePageIndex] = useState(defaultActiveIndex);
  const hrRef = useRef(null);
  const activeTabRef = useRef(null);
  let {filterVals, setFilterVals} = useContext(FilterContext);


  const changePageState = (btn, i) => {
    const { offsetWidth, offsetLeft } = btn;

    hrRef.current.style.width = offsetWidth + "px";
    hrRef.current.style.left= offsetLeft + "px";

    setActivePageIndex(i);
  }


  useEffect(() => {
    changePageState(activeTabRef.current, defaultActiveIndex);
  }, []);


  const handleFilter = ({tags, date}) => {
    setFilterVals({ tagsVal: tags, dateVal: date.toString()});
  }

  return (
    <>
      <div className="ipn-container">
        {
          routes.map((route, i) => {
            return (
              <button key={i}
                ref = { i == defaultActiveIndex? activeTabRef: null }
                className={
                  `ipn-route-btn ${activePageIndex == i && "active"} `
                  + (defaultHidden.includes(route) ? 'md-hidden':'')
                }
                onClick = {(e) => changePageState(e.target, i)}
              >
                {route}
              </button>
            )
          })
        }
        <FilterBy availableTags={["Finance", "Chess"]} onFilter={handleFilter}/>
        <hr className="ipn-routes-hr" ref={hrRef} />
      </div>

      { Array.isArray(children)? children[activePageIndex] : children}
    </>
  )
}

export default InPageNavigation;
