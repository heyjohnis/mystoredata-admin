import {useAppSelector} from "@/store";
import Link from "next/link";
import Login from "@/components/auth/Login";
import Logo from "@/components/sample/login-2/logo";
import Footer from "@/components/sample/login-2/footer";

const Index: React.FC = () => {
  const config = useAppSelector((state) => state.config);
  const {name} = config;
  return (
    <>
      <div className="flex flex-row w-full h-screen overflow-hidden">
        <div className="relative items-start justify-between hidden w-1/2 p-8 text-white lg:flex lg:flex-col bg-login-2">
          <Logo />
          <Footer />
        </div>
        <div className="flex flex-col items-start justify-center w-full p-8 text-gray-900 bg-white dark:bg-gray-900 dark:text-white lg:w-1/2 lg:p-24">
          <p className="mb-2 text-2xl font-bold text-blue-500">
            Login to {name}
          </p>
          <Login />
          <div className="flex flex-row w-full mt-8">
            <span className="mr-1 text-secondary">처음 사용하시나요?</span>
            <span>
              <Link href="/create-account" className="text-blue-500">
                회원가입
              </Link>
            </span>
          </div>
          <div className="w-full">
            <span>
              <Link href="/forgot-password" className="text-blue-500">
                패스워드를 잊어버리셨나요?
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
