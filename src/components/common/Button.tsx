import Link from "next/link";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ text, onClick, className, disabled }: ButtonProps) {
  return (
    <button
      className={`appearance-none cursor-pointer p-1 border hover:border-gray-500 disabled:bg-slate-50 disabled:text-slate-500 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

interface LinkButtonProps {
  text: string;
  href: string;
  className?: string;
  additionalText?: string;
}

export function LinkButton({ text, href, className, additionalText }: LinkButtonProps) {
  return (
    <Link href={href} className={`border border-sky-300 px-2 py-1 hover:border-sky-500 ${className}`}>
      {text}
      {additionalText && <span className="text-xs text-red-500">{`(${additionalText})`}</span>}
    </Link>
  );
}
