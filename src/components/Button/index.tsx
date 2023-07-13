import { ButtonHTMLAttributes } from "react";

export const Button = ({ label, ...attbs }: ButtonProps) => {
  return (
    <button
      className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      {...attbs}>
      {label}
    </button>
  );
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}
