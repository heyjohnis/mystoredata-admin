import {createSlice} from "@reduxjs/toolkit";
import {
  FiToggleLeft,
  FiUser,
  FiPieChart,
  FiCompass,
  FiHelpCircle,
  FiHome,
} from "react-icons/fi";
import {AiOutlineDashboard} from "react-icons/ai";
import {BiCategory} from "react-icons/bi";
import {BsCreditCard, BsFillBuildingsFill} from "react-icons/bs";
import {LuBanknote} from "react-icons/lu";
import {BiTransfer, BiBuildings} from "react-icons/bi";
import {TbReceiptTax, TbDirectionsOff, TbDirections} from "react-icons/tb";
import {LiaMoneyCheckSolid} from "react-icons/lia";
import {AiOutlineCreditCard} from "react-icons/ai";
import {MdPeopleOutline, MdOutlineLeaderboard} from "react-icons/md";
import {LiaMoneyBillAlt} from "react-icons/lia";
import {AiOutlineMinusCircle} from "react-icons/ai";

export type NavigationState = {
  title: string;
  url?: string | undefined;
  items: NavigationState[];
  icon?: React.ReactNode;
  badge?: {
    color: string;
    text: string | number;
  };
};

const initialState: NavigationState[] = [
  {
    title: "사용자정보",
    items: [
      {
        url: "/",
        icon: <FiCompass size={20} />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/personal",
        icon: <FiUser size={20} />,
        title: "개인사용자",
        items: [],
      },
      {
        url: "/corp",
        icon: <BiBuildings size={20} />,
        title: "사업자",
        items: [],
      },
      {
        url: "/category-my",
        icon: <BiCategory size={20} />,
        title: "계정별 카테고리",
        items: [],
      },
    ],
  },
  {
    title: "거래데이터",
    items: [
      {
        url: "/account",
        icon: <LuBanknote size={20} />,
        title: "계좌데이터",
        items: [],
      },
      {
        url: "/card",
        icon: <BsCreditCard size={20} />,
        title: "카드데이터",
        items: [],
      },

      {
        url: "/trans-money",
        icon: <BiTransfer size={20} />,
        title: "개래내역취합",
        items: [],
      },
    ],
  },
  {
    title: "기초데이터",
    items: [
      {
        url: "/fin-item",
        icon: <LiaMoneyBillAlt size={20} />,
        title: "금융상품",
        items: [],
      },
      {
        url: "/tax",
        icon: <TbReceiptTax size={20} />,
        title: "세금계산서",
        items: [],
      },
      {
        url: "/trade-corp",
        icon: <BsFillBuildingsFill size={20} />,
        title: "거래처정보",
        items: [],
      },
      {
        url: "/employee",
        icon: <MdPeopleOutline size={20} />,
        title: "직원정보",
        items: [],
      },
      {
        url: "/asset",
        icon: <LiaMoneyCheckSolid size={20} />,
        title: "자산정보",
        items: [],
      },
      {
        url: "/debt",
        icon: <AiOutlineMinusCircle size={20} />,
        title: "부채정보",
        items: [],
      },
      {
        url: "/credit-card",
        icon: <AiOutlineCreditCard size={20} />,
        title: "신용카드정보",
        items: [],
      },
    ],
  },

  {
    title: "처리 로직설정",
    items: [
      {
        url: "/category",
        icon: <BiCategory size={20} />,
        title: "키워드 통한 카테고리",
        items: [],
      },
      {
        url: "/category-rule",
        icon: <TbDirections size={20} />,
        title: "거래적요 통한 카테고리",
        items: [],
      },
      {
        url: "/non-category",
        icon: <TbDirectionsOff size={20} />,
        title: "임시 카테고리",
        items: [],
      },
    ],
  },

  {
    title: "재정상태",
    items: [
      {
        url: "/fin-fs",
        icon: <AiOutlineDashboard size={20} />,
        title: "재무현황표",
        items: [],
      },
      {
        url: "/fin-class",
        icon: <MdOutlineLeaderboard size={20} />,
        title: "재무상태표",
        items: [],
      },
    ],
  },

  {
    title: "",
    items: [
      {
        url: "/sample/",
        title: "",
        items: [
          {
            url: "/sample/",
            title: "Dashboard",
            items: [
              {
                url: "/sample/",
                title: "Dashboard",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "Apps",
            items: [
              {
                url: "/sample/social-feed",
                title: "Social feed",
                items: [],
              },
              {
                url: "/sample/tasks",
                title: "Tasks",
                items: [],
              },
              {
                url: "/sample/inbox",
                title: "Inbox",
                items: [],
              },
              {
                url: "/sample/todo",
                title: "Todo",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "Menu levels",
            items: Array.from(Array(4).keys()).map((i) => {
              return {
                url: "/sample/",
                title: `Level 1-${i + 1}`,
                items: Array.from(Array(4).keys()).map((j) => {
                  return {
                    url: "/sample/",
                    title: `Level 2-${j + 1}`,
                    items: Array.from(Array(4).keys()).map((k) => {
                      return {
                        url: "/sample/",
                        title: `Level 3-${k + 1}`,
                        items: Array.from(Array(4).keys()).map((l) => {
                          return {
                            url: "/sample/",
                            title: `Level 4-${l + 1}`,
                            items: [],
                          };
                        }),
                      };
                    }),
                  };
                }),
              };
            }),
          },
          {
            url: "/sample/",
            title: "Demos",
            badge: {
              color: "bg-indigo-500 text-white",
              text: 6,
            },
            items: [
              {
                url: "/sample/demo-1",
                title: "Light background",
                items: [],
              },
              {
                url: "/sample/demo-2",
                title: "Dark background",
                items: [],
              },
              {
                url: "/sample/demo-3",
                title: "Small sidebar",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "E-commerce",
            items: [
              {
                url: "/sample/e-commerce",
                title: "Products",
                items: [],
              },
              {
                url: "/sample/invoice",
                title: "Invoice",
                items: [],
              },
              {
                url: "/sample/pricing-tables",
                title: "Pricing tables",
                items: [],
              },
            ],
          },

          {
            url: "/sample/",
            title: "UI Elements",
            items: [
              {
                url: "/sample/badges",
                title: "Badges",
                items: [],
              },
              {
                url: "/sample/breadcrumbs",
                title: "Breadcrumbs",
                items: [],
              },
              {
                url: "/sample/buttons",
                title: "Buttons",
                items: [],
              },
              {
                url: "/sample/dropdowns",
                title: "Dropdowns",
                items: [],
              },
              {
                url: "/sample/images",
                title: "Images",
                items: [],
              },
              {
                url: "/sample/lists",
                title: "Lists",
                items: [],
              },
              {
                url: "/sample/progress-bars",
                title: "Progress bars",
                items: [],
              },
              {
                url: "/sample/pagination",
                title: "Pagination",
                items: [],
              },
              {
                url: "/sample/tabs",
                title: "Tabs",
                items: [],
              },
              {
                url: "/sample/typography",
                title: "Typography",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "Forms",
            badge: {
              color: "bg-indigo-500 text-white",
              text: 6,
            },
            items: [
              {
                url: "/sample/default-forms",
                title: "Default forms",
                items: [],
              },
              {
                url: "/sample/switches",
                title: "Switches",
                items: [],
              },
              {
                url: "/sample/steps",
                title: "Form steps",
                items: [],
              },
              {
                url: "/sample/validation",
                title: "Form validation",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "Tables",
            items: [
              {
                url: "/sample/default-tables",
                title: "Default tables",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "Notifications",
            badge: {
              color: "bg-indigo-500 text-white",
              text: 2,
            },
            items: [
              {
                url: "/sample/alerts",
                title: "Alerts",
                items: [],
              },
              {
                url: "/sample/notifications",
                title: "Notifications",
                items: [],
              },
              {
                url: "/sample/modals",
                title: "Modals",
                items: [],
              },
              {
                url: "/sample/popovers",
                title: "Popovers",
                items: [],
              },
              {
                url: "/sample/tooltips",
                title: "Tooltips",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "Authentication",
            badge: {
              color: "bg-indigo-500 text-white",
              text: 7,
            },
            items: [
              {
                url: "/sample/contact-us-1",
                title: "Contact us",
                items: [],
              },
              {
                url: "/sample/login-1",
                title: "Login 1",
                items: [],
              },
              {
                url: "/sample/login-2",
                title: "Login 2",
                items: [],
              },
              {
                url: "/sample/login-3",
                title: "Login 3",
                items: [],
              },
              {
                url: "/sample/create-account",
                title: "Create account",
                items: [],
              },
              {
                url: "/sample/email-confirmation",
                title: "Email confirmation",
                items: [],
              },
              {
                url: "/sample/logout",
                title: "Logout",
                items: [],
              },
              {
                url: "/sample/reset-password",
                title: "Reset password",
                items: [],
              },
              {
                url: "/sample/forgot-password",
                title: "Forgot password",
                items: [],
              },
              {
                url: "/sample/lock-screen",
                title: "Lock screen",
                items: [],
              },
              {
                url: "/sample/subscribe",
                title: "Subscribe",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "User",
            items: [
              {
                url: "/sample/user-profile",
                title: "User profile",
                items: [],
              },
              {
                url: "/sample/social-feed",
                title: "Social feed",
                items: [],
              },
            ],
          },
          {
            url: "/sample/",
            title: "Pages",
            items: [
              {
                url: "/sample/support-1",
                title: "Support",
                items: [],
              },
              {
                url: "/sample/empty-page",
                title: "Empty page",
                items: [],
              },
              {
                url: "/sample/terms-of-service",
                title: "Terms of service",
                items: [],
              },
              {
                url: "/sample/privacy-policy",
                title: "Privacy policy",
                items: [],
              },
              {
                url: "/sample/error-page",
                title: "Error page",
                items: [],
              },
            ],
          },
          {
            title: "Other",
            items: [
              {
                url: "/sample/",
                icon: <FiPieChart size={20} />,
                title: "Charts",
                badge: {
                  color: "bg-indigo-500 text-white",
                  text: 4,
                },
                items: [
                  {
                    url: "/sample/bar-charts",
                    title: "Bar charts",
                    items: [],
                  },
                  {
                    url: "/sample/line-charts",
                    title: "Line and area charts",
                    items: [],
                  },
                  {
                    url: "/sample/pie-charts",
                    title: "Pie and doughnut charts",
                    items: [],
                  },
                ],
              },
              {
                url: "/sample/",
                icon: <FiToggleLeft size={20} />,
                title: "Icons",
                items: [
                  {
                    url: "/sample/react-icons",
                    title: "React icons",
                    items: [],
                  },
                  {
                    url: "/sample/country-flags",
                    title: "Country flags",
                    items: [],
                  },
                ],
              },

              {
                url: "/sample/documentation",
                icon: <FiHelpCircle size={20} />,
                title: "Documentation",
                items: [],
              },

              {
                title: "Intro",
                items: [
                  {
                    url: "/sample/landing",
                    icon: <FiHome size={20} />,
                    title: "Home page",
                    items: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Define the initial state using that type

export const navigationSlice = createSlice({
  name: "navigation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export default navigationSlice.reducer;
