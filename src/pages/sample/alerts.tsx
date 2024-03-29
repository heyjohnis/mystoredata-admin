import SectionTitle from "@/components/ui/section-title";
import Alert from "@/components/ui/alerts";
import Widget from "@/components/ui/widget";
import {FiAlertCircle} from "react-icons/fi";

const Index: React.FC = () => (
  <>
    <SectionTitle title="Notifications" subtitle="Alerts" />

    <Widget
      title="Default alerts"
      description={
        <span>
          Use the <code>&lt;Alert /&gt;</code> component for simple alerts. Use
          the <code>size</code> prop for small alerts
        </span>
      }>
      <div className="flex flex-wrap">
        <div className="flex flex-col w-full space-y-4">
          <Alert
            padding="p-2"
            color="bg-red-500 text-white"
            icon={<FiAlertCircle className="w-4 h-4 mr-2 stroke-current" />}>
            This is an important alert. Check it out!
          </Alert>
          <Alert
            color="bg-blue-500 text-white"
            icon={<FiAlertCircle className="w-4 h-4 mr-2 stroke-current" />}>
            This is an important alert. Check it out!
          </Alert>
        </div>
      </div>
    </Widget>

    <Widget
      title="Raised alerts"
      description={
        <span>
          Use the <code>raised</code> prop for raised alerts
        </span>
      }>
      <div className="flex flex-wrap">
        <div className="flex flex-col w-full space-y-4">
          <Alert
            color="bg-white dark:bg-gray-800 text-red-500"
            raised
            icon={<FiAlertCircle className="w-4 h-4 mr-2 stroke-current" />}>
            This is an important alert. Check it out!
          </Alert>
          <Alert color="bg-white dark:bg-gray-800 text-blue-500" raised>
            This is an important alert. Check it out!
          </Alert>
        </div>
      </div>
    </Widget>

    <Widget
      title="Outlined alerts"
      description={
        <span>
          Use the <code>outlined</code> prop for outlined alerts
        </span>
      }>
      <div className="flex flex-col w-full space-y-4">
        <Alert color="bg-transparent border-red-500 text-red-500" outlined>
          This is an important alert. Check it out!
        </Alert>
        <Alert
          color="bg-transparent border-blue-500 text-blue-500"
          outlined
          rounded
          raised>
          This is an important alert. Check it out!
        </Alert>
      </div>
    </Widget>

    <Widget
      title="Left bordered alerts"
      description={
        <span>
          Use the <code>borderLeft</code> prop for outlined alerts
        </span>
      }>
      <div className="flex flex-col w-full space-y-4">
        <Alert
          color="bg-transparent border-red-500 text-red-500"
          borderLeft
          raised>
          This is an important alert. Check it out!
        </Alert>
        <Alert
          color="bg-transparent border-blue-500 text-blue-500"
          borderLeft
          raised>
          This is an important alert. Check it out!
        </Alert>
      </div>
    </Widget>
  </>
);
export default Index;
