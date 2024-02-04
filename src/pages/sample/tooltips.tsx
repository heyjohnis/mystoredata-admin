import SectionTitle from "@/components/ui/section-title";
import Tooltip, {Placement} from "@/components/ui/tooltips";
import Widget from "@/components/ui/widget";

const placements: Placement[] = ["left", "top", "right", "bottom"];
const Index: React.FC = () => (
  <>
    <SectionTitle title="Notifications" subtitle="Tooltips" />
    <Widget
      title="Tooltips"
      description={
        <span>
          Use the <code>&lt;Tooltip /&gt;</code> component for tooltips
        </span>
      }>
      <div className="flex flex-col items-start justify-start space-y-4">
        {placements.map((placement, i) => (
          <div key={i}>
            <Tooltip
              placement={placement}
              content="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.">
              Tooltip on {placement}
            </Tooltip>
          </div>
        ))}
      </div>
    </Widget>
  </>
);
export default Index;
