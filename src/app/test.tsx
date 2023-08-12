import Link from "next/link";

const TestPage: React.FC = () => {
  console.log("server side rendering...");
  return (
    <div className="flex flex-col w-full max-w-xl text-center">
        test 페이지
    </div>
  );
};

export default TestPage;
