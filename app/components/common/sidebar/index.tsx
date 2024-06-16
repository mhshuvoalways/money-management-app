import AnalyticsIcon from "@/app/components/common/icons/Analytics";
import MinusIcon from "@/app/components/common/icons/Minus";
import PlusIcon from "@/app/components/common/icons/Plus";
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
          className={`font-bold text-3xl textGradient py-3 font-montserrat h-14 hidden sm:block ${
            isOpen ? "px-5" : "px-7"
          }`}
        >
          ${isOpen && "Money"}
        </p>
        <div className="sm:mt-10 px-5 sm:space-y-5 flex sm:block items-center justify-between">
          {menus.map((menu) => (
            <Link
              href={menu.href}
              className={`flex items-center gap-2 p-2 h-9 ${
                menu.href === pathname && "btn"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
