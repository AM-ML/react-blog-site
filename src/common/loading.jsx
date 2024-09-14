import "../css/common/loading.css";
const Loading = ({ height = "100vh" }) => {
  return (
    <div className="loading-container" style={{"height": height}}>
      <div className="outer-spinner"></div>
      <div className="inner-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
