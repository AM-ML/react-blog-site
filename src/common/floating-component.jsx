import "../css/common/floating-component.css";

const FloatingComponent = ({ children, noNavbar=false, style={}, className = ""}) => {
  return (
    <div style={style} className={"ftgc-element " + (noNavbar && "ftgc-no-nav ") + className}>
      {children}
    </div>
  )
}

export default FloatingComponent;
