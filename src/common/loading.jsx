import "../css/common/loading.css";

const Loading = ({ height = "100vh" }) => {
  return (
    <div className="loading-container" style={{"height": height}}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
