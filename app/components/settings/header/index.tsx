"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    name: "Categories",
    href: "/settings",
  },
  {
    name: "Currency",
    href: "/settings/currency",
  },
  {
    name: "Support",
    href: "/settings/support",
  },
];

interface Props {}

const Header: React.FC<Props> = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-5 mt-10">
      {menus.map((menu) => {
        const isActive =
          menu.href === "/settings"
            ? pathname === menu.href
            : pathname.includes(menu.href);
        return (
          <Link href={menu.href} key={menu.href}>
            <p
              className={`text3 cursor-pointer font-medium hover:text-primary ${
                isActive && "text-primary"
              }`}
            >
              {menu.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Header;
