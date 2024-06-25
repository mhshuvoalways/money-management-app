import AnalyticsIcon from "@/app/components/common/icons/Analytics";
import MinusIcon from "@/app/components/common/icons/Minus";
import PlusIcon from "@/app/components/common/icons/Plus";
import SettingIcon from "@/app/components/common/icons/Setting";
import UserIcon from "@/app/components/common/icons/User";
import WalletIcon from "@/app/components/common/icons/Wallet";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
}

const menus = [
  {
    id: 1,
    icon: AnalyticsIcon,
    name: "Analytics",
    href: "/",
  },
  {
    id: 2,
    icon: WalletIcon,
    name: "Wallets",
    href: "/wallets",
  },
  {
    id: 3,
    icon: PlusIcon,
    name: "Income",
    href: "/income",
  },
  {
    id: 4,
    icon: MinusIcon,
    name: "Expense",
    href: "/expense",
  },
  {
    id: 5,
    icon: UserIcon,
    name: "Profile",
    href: "/profile",
  },
  {
    id: 6,
    icon: SettingIcon,
    name: "Settings",
    href: "/settings",
  },
];

const Index: React.FC<Props> = ({ isOpen }) => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-white dark:bg-slate-700 sm:h-screen transition-all duration-300 shadow-lg fixed sm:sticky bottom-0 sm:top-0 w-full py-2 sm:py-0 z-10 ${
        isOpen ? "translate-x-0 sm:w-56 z-10 overflow-y-auto" : "sm:w-20"
      }`}
    >
      <div>
        <p
          className={`font-bold text-xl xl:text-2xl textGradient py-3 font-montserrat h-14 hidden sm:block ${
            isOpen ? "px-5" : "px-7"
          }`}
        >
          {isOpen && "PennyCalc"}
        </p>
        <div className="sm:mt-10 px-5 sm:space-y-5 flex sm:block items-center justify-between">
          {menus.map((menu) => {
            const isActive =
              menu.href === "/"
                ? pathname === menu.href
                : pathname.includes(menu.href);
            return (
              <Link
                href={menu.href}
                className={`flex items-center gap-2 p-2 h-9 ${
                  isActive && "btn"
                } ${!isOpen && "justify-center size-9"}`}
                key={menu.id}
              >
                {<menu.icon className="size-5" />}
                {isOpen && (
                  <p className="cursor-pointer overflow-x-hidden font-medium">
                    {menu.name}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
