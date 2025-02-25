import React from "react";
import Spinner from "./Spinner";
// import Spinner from "./Spinner";

interface ButtonProps {
  children: React.ReactNode; // Correct type for children
  type: "button" | "submit" | "reset"; // Can be 'button', 'submit', or 'reset'
  fn?: () => void; // The function to be executed when the button is clicked
  loading?: boolean;
  disabled?: boolean;
  style: "primary" | "secondary" | "google"; // Can be 'primary', 'secondary', or 'tertiary'
  css?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  fn,
  loading,
  disabled,
  style,
  css,
}) => {
  return (
    <button
      onClick={fn}
      disabled={loading || disabled} // Disable the button when loading or manually disabled
      type={type}
      className={`flex h-12 items-center justify-center whitespace-nowrap rounded px-[16.29px] py-[9.55px] text-[16px] duration-150 font-semibold ${css} 
      ${
        style === "primary" &&
        "bg-primary hover:bg-primary-hover active:bg-primary-pressed text-white"
      }
      ${
        style === "secondary" &&
        "border-2  border-primary text-primary hover:text-white hover:bg-primary-hover active:bg-primary-pressed"
      }
      ${
        style === "google" &&
        "border  border-black-base-bg text-black-secondary-bg hover:text-white hover:bg-black-base-bg active:bg-primary-pressed"
      }
      `}
    >
      {loading ? <Spinner /> : children}
      {/* {children} */}
    </button>
  );
};

export default Button;
