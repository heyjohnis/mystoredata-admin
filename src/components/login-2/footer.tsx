import {useAppSelector} from "store";
import Link from "next/link";

const Footer: React.FC = () => {
  const config = useAppSelector((state) => state.config);
  const {name} = config;
  return (
    <div className="flex flex-row items-center justify-between w-full text-xs z-10">
      <div className="text-white">&copy; {name} 2023</div>
      <div className="flex flex-row ml-auto space-x-2">
        <Link href="/privacy-policy">
          개인정보처리방침
        </Link>
        <Link href="/terms-of-service">
          서비스 이용약관
        </Link>
        <Link href="/contact-us">
          문의하기
        </Link>
      </div>
    </div>
  );
};

export default Footer;
