import clsx from "clsx";
import {FiX} from "react-icons/fi";
type Props = {
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpenMenu: boolean) => void;
};

type TitleProps = {
  children: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({children}) => (
  <div className="flex flex-row items-center justify-start w-full text-xs font-normal tracking-wider uppercase">
    {children}
  </div>
);

export function SideMenu({isOpenMenu, setIsOpenMenu}: Props) {
  return (
    <div
      className={clsx(
        "bg-white text-gray-900 dark:bg-gray-800 dark:text-white text-sm w-64 transform transition duration-300 ease-in-out shadow fixed top-0 bottom-0 h-full overflow-hidden z-[99] right-0",
        !isOpenMenu && "translate-x-64",
        isOpenMenu && "translate-x-0"
      )}>
      <div className="absolute top-0 left-0 bottom-0 h-full overflow-x-auto">
        <div className="w-64 h-full">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between h-16 px-4 text-white bg-blue-500">
              <div className="text-sm font-bold tracking-wider uppercase">
                마이스토어 데이터
              </div>
              <button
                onClick={() => setIsOpenMenu(false)}
                className="font-bold uppercase  text-xs h-8 w-8 rounded-full inline-flex items-center justify-center p-0">
                <FiX size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col p-4">
            <div>
              <div className="space-y-4">
                <div className="w-full px-4 space-y-2">
                  <Title>Categories</Title>
                </div>

                <div className="w-full px-4 space-y-2">
                  <Title>Rating</Title>
                </div>

                <div className="w-full px-4 space-y-2">
                  <Title>Color</Title>
                </div>

                <div className="w-full px-4 space-y-2">
                  <Title>Brand</Title>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
