import SectionTitle from "components/dashboard/section-title";
import Notification from "components/dashboard/notification";

const Index: React.FC = () => {
  return (
    <>
      <Notification />
      <SectionTitle title="Overview" subtitle="Dashboard" />
    </>
  );
};
export default Index;
