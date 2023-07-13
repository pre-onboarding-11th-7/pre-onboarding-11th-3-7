import { InputHTMLAttributes } from "react";

export const Input = ({ label, ...attbs }: InputProps) => {
  return (
    <>
      <div className="relative flex flex-col items-start rounded-md">
        <input
          id={attbs.name}
          className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0 focus:ring-black dark:text-white"
          placeholder={" "}
          {...attbs}
        />
        <label
          className="absolute top-3 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-gray-600 dark:text-white dark:peer-focus:text-amber-500"
          htmlFor={attbs.name}>
          {label}
        </label>
      </div>
    </>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
