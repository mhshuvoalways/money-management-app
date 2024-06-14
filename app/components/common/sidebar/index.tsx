import HomeIcon from "@/app/components/common/icons/Home";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
}

const menus = [
  {
    id: 1,
    icon: HomeIcon,
    name: "Dashboard",
    href: "/",
  },
  {
    id: 2,
    icon: HomeIcon,
    name: "Category",
    href: "/category",
  },
  {
    id: 3,
    icon: HomeIcon,
    name: "Expense",
    href: "/expense",
  },
];

const Index: React.FC<Props> = ({ isOpen }) => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-white dark:bg-slate-700 h-screen transition-all duration-300 shadow-lg ${
        isOpen ? "translate-x-0 w-56 z-10 overflow-y-auto" : "w-20"
      }`}
    >
      <div>
        <p
          className={`font-bold text-3xl textGradient py-3 font-montserrat h-14 ${
            isOpen ? "px-5" : "px-7"
          }`}
        >
          ${isOpen && "Money"}
        </p>
        <div className="mt-10 px-5 space-y-5">
          {menus.map((menu) => (
            <Link
              href={menu.href}
              className={`flex items-center gap-2 p-2 h-9 ${
                menu.href === pathname && "bgGradient rounded"
              } ${!isOpen && "justify-center size-9"}`}
              key={menu.id}
            >
              {<menu.icon className="size-5" />}
              {isOpen && (
                <p className="cursor-pointer font-medium font-open-sans overflow-x-hidden">
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
