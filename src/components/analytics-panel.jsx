import "../css/components/analytics-panel.css"
import "../css/themes/light.css";
import AnalyticsPanelChart from "./analytics-panel-chart";

const AnalyticsPanel = () => {
  // bg = "#FCFCFD";
  // bg2 = "#F3F3F6";
  // main = "#9192A4";
  // main2 = "#5C5CF7";
  // color = "#5E5D75";
  // color2 = "#5656F2";

  return (
    <div className="ap-container bg2 container-fluid w-100 m-0 p-0">
      <div className="ap-grid-item shadow ap-r1-item bg">
        
      </div>
      <div className="ap-grid-item shadow ap-r1-item bg">
        
      </div>
      <div className="ap-grid-item shadow ap-r1-item bg">
        
      </div>
      <div className="ap-grid-item shadow ap-r2-item bg">
        <AnalyticsPanelChart />
      </div>
    </div>
  )
}

export default AnalyticsPanel;