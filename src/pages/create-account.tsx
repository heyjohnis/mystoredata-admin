import Link from "next/link";
import CenteredForm from "layouts/centered-form";
import CreateAccount from "components/sample-forms/create-account";

const Index: React.FC = () => {
  return (
    <CenteredForm
      title="Create account"
      subtitle="회원가입을 위해 로그인 아이디와 이메일을 등록해주세요.">
      <CreateAccount />

      <div className="flex flex-row w-full mt-4">
        <span className="mr-1">이미 회원가입 하셨나요?</span>
        <span>
          <Link href="/login" className="text-blue-500">
            로그인 하기
          </Link>
        </span>
      </div>
      <div className="w-full">
        <span>
          <Link href="/forgot-password" className="text-blue-500">
            패스워드를 잊으셨나요?
          </Link>
        </span>
      </div>
    </CenteredForm>
  );
};

export default Index;
