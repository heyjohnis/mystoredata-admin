import SectionTitle from "@/components/ui/section-title";
import Widget from "@/components/ui/widget";
import {FaBox} from "react-icons/fa";
import {IoIosAttach} from "react-icons/io";
import {MdCached} from "react-icons/md";
import {TiBookmark} from "react-icons/ti";
import {GoAlert} from "react-icons/go";
import {FiActivity} from "react-icons/fi";
import {GiAbstract103} from "react-icons/gi";
import {WiCloudy} from "react-icons/wi";
import {DiReact} from "react-icons/di";
import {AiFillChrome} from "react-icons/ai";
import {IconContext} from "react-icons";

/*
https://react-icons.netlify.com/#/icons/fa
*/

const sizes = [16, 24, 32, 40];
const Index: React.FC = () => (
  <>
    <SectionTitle title="Icons" subtitle="React icons" />
    <Widget
      title="React icons"
      description={
        <span>
          Include popular icons in your React projects easily with{" "}
          <code>react-icons</code>, which utilizes ES6 imports that allows you
          to include only the icons that your project is using. For more
          information and to view all the available icons, go to{" "}
          <a
            href="https://react-icons.github.io/react-icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500">
            this url
          </a>
          .
        </span>
      }>
      {sizes.map((size, i) => (
        <div
          className="flex flex-row flex-wrap items-center justify-start mb-8"
          key={i}>
          <IconContext.Provider
            value={{
              className: "react-icons stroke-current text-blue-500 mr-4 mb-4",
            }}>
            <FaBox size={size} />
            <IoIosAttach size={size} />
            <MdCached size={size} />
            <TiBookmark size={size} />
            <GoAlert size={size} />
            <FiActivity size={size} />
            <GiAbstract103 size={size} />
            <WiCloudy size={size} />
            <DiReact size={size} />
            <AiFillChrome size={size} />
          </IconContext.Provider>
        </div>
      ))}
    </Widget>
  </>
);
export default Index;
