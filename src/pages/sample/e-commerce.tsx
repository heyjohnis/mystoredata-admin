import SectionTitle from "@/components/ui/section-title";
import Widget from "@/components/ui/widget";
import Products from "@/components/sample/e-commerce/products";

const Index: React.FC = () => {
  return (
    <>
      <SectionTitle title="Pages" subtitle="E-commerce" />
      <Widget>
        <div className="w-full">
          <Products />
        </div>
      </Widget>
    </>
  );
};
export default Index;
