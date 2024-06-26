"use client";

import { motion } from "framer-motion";

interface Props {
  name: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
}

const Button: React.FC<Props> = ({
  name,
  onClick,
  className,
  disabled,
  icon,
}) => {
  return (
    <motion.button
      className={`py-2 px-5 bg-red-600 rounded-md hover:rounded-lg transition-all text-slate-100 font-medium hover:shadow flex items-center justify-center gap-2 ${className}`}
      whileTap={{
        scale: 0.9,
      }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <p className="text-nowrap">{name}</p>
    </motion.button>
  );
};

export default Button;
