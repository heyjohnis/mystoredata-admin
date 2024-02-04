import Widget from "@/components/ui/widget";
import Todo from "@/components/ui/todo";

const Index: React.FC = () => (
  <>
    <Widget
      title="To do"
      description={
        <span>
          Use the <code>&lt;Todo&gt;</code> component for a sample todo list
          component.
        </span>
      }>
      <Todo />
    </Widget>
  </>
);
export default Index;
