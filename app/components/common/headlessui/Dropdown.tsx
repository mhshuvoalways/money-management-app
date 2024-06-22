import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";

interface Items {
  id: number;
  icon: React.ReactElement;
  name: string;
  href: string;
}

interface Props {
  btnIcon: React.ReactElement;
  items: Items[];
  className: string;
}

const index: React.FC<Props> = ({ btnIcon, items, className }) => {
  return (
    <Menu>
      <MenuButton>{btnIcon}</MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className={`z-20 bg-white dark:bg-slate-700 shadow rounded-lg p-2 w-48 sm:w-56 ${className}`}
        >
          {items.map((item, index) => (
            <div key={item.id}>
              <MenuItem>
                <Link
                  href={item.href}
                  className={`cursor-pointer text2 flex items-center gap-3 hover:bgGradient hover:text-slate-200 p-2 rounded ${
                    items.length !== index + 1 &&
                    "border-b dark:border-slate-500"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </MenuItem>
            </div>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default index;
