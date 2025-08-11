import type { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

function ErrorMessage({ children }: ErrorMessageProps) {
  return <span className="mt-1 text-sm text-red-600">{children}</span>;
}

export default ErrorMessage;
