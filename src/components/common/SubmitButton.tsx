import type { ReactNode } from "react";

type SubmitButtonProps = {
  children: ReactNode;
  disabled: boolean;
};

function SubmitButton({ children, disabled }: SubmitButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {children}
    </button>
  );
}

export default SubmitButton;
