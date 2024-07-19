import UserAvatar from "@/app/components/common/userAvatar";
import { authenticate } from "@/app/lib/features/userSlice";
import { useAppDispatch } from "@/app/lib/hooks";
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
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(authenticate());
  };

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
          className={`z-20 bg-white dark:bg-slate-700 shadow rounded-lg p-2 ${className}`}
        >
          <UserAvatar
            mainClass="p-2 border-b dark:border-slate-500"
            imageClass="size-10"
            isVerified={false}
          />
          {items.map((item, index) => {
            return (
              <div key={item.id}>
                <MenuItem>
                  {item.name === "Logout" ? (
                    <p
                      onClick={logoutHandler}
                      className="cursor-pointer flex items-center gap-3 hover:bgGradient hover:text-slate-100 p-2 rounded"
                    >
                      {item.icon}
                      {item.name}
                    </p>
                  ) : (
                    <Link
                      href={item.href}
                      className={`cursor-pointer flex items-center gap-3 hover:bgGradient hover:text-slate-100 p-2 rounded border-b dark:border-slate-500`}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  )}
                </MenuItem>
              </div>
            );
          })}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default index;
