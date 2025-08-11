import type { ReactNode } from "react";

type EditButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

function EditButton({ onClick, children }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="ml-2 text-blue-600 hover:text-blue-800 font-bold w-8 h-8 flex items-center justify-center rounded-md bg-blue-100 hover:bg-blue-200"
    >
      {children}
    </button>
  );
}

export default EditButton;
