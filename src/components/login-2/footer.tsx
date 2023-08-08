import {useAppSelector} from "store";
import Link from "next/link";

const Footer: React.FC = () => {
  const config = useAppSelector((state) => state.config);
  const {name} = config;
  return (
    <div className="flex flex-row items-center justify-between w-full text-xs z-10">
      <div className="text-white">&copy; {name} 2021</div>
      <div className="flex flex-row ml-auto space-x-2">
        <Link href="/privacy-policy">
          Privacy policy
        </Link>
        <Link href="/terms-of-service">
          Terms of service
        </Link>
        <Link href="/contact-us">
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default Footer;
