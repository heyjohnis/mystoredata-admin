import {useForm, FormProvider} from "react-hook-form";
import {InputWrapper} from "@/components/react-hook-form/input-wrapper";
import {Label} from "@/components/react-hook-form/label";
import {ErrorMessage} from "@/components/react-hook-form/error-message";
import {Input} from "@/components/react-hook-form/input";
import axios from "axios";
import {handleLogin} from "@/utils/auth";
import {POST} from "@/utils/restApi";
export type FormProps = {
  userId: string;
  password: string;
};

const Index: React.FC = () => {
  const methods = useForm<FormProps>({
    defaultValues: {
      userId: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: {errors},
  } = methods;

  const onSubmit = async (data: FormProps) => {
    POST("/auth/login", data).then((res: any) => {
      console.log(res);
      handleLogin(res.data.token, "/admin");
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-y-1 gap-x-2 sm:grid-cols-12">
            <InputWrapper outerClassName="sm:col-span-12">
              <Label id="userId">ID</Label>
              <Input
                id="userId"
                name="userId"
                type="text"
                rules={{required: "로그인 아이디를 입력해주세요"}}
              />
              {errors?.userId?.message && (
                <ErrorMessage>{errors.userId.message}</ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper outerClassName="sm:col-span-12">
              <Label id="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                rules={{
                  required: "패스워드를 입력해주세요",
                  minLength: {
                    value: 4,
                    message: "패스워드는 4자리 이상이어야 합니다",
                  },
                }}
              />
              {errors?.password?.message && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
              )}
            </InputWrapper>
          </div>
        </div>

        <div className="flex justify-start space-x-2">
          <button
            onClick={() => {
              reset();
            }}
            type="button"
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            취소
          </button>
          <button
            type="submit"
            className="inline-flex justify-center px-3 py-2 ml-3 text-sm font-medium text-white bg-blue-500 border border-transparent shadow-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            로그인
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
export default Index;
