import type { ReactNode } from "react";

type DeleteButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

function DeleteButton({ onClick, children }: DeleteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="ml-2 text-red-600 hover:text-red-800 font-bold w-8 h-8 flex items-center justify-center rounded-md bg-red-100 hover:bg-red-200"
    >
      {children}
    </button>
  );
}

export default DeleteButton;
