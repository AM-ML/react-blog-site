import AnimationWrapper from "../common/page-animation"
import AnalyticsPanel from "../components/analytics-panel"

const AnalyticsDashboard = () => {
  return (
    <AnimationWrapper key={"analytics-panel"}>
      <AnalyticsPanel />
    </AnimationWrapper>
  )
}

export default AnalyticsDashboard;