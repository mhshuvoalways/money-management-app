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
      className={`btn flex items-center justify-center gap-2 hover:bgGradientHover ${className}`}
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
