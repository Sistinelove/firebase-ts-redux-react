import { ReactNode, MouseEvent } from "react";

interface Props {
    children?: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({ children, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className="rounded-lg border w-20 h-[38px] text-center items-center justify-center flex text-base pt-2 pb-2 pr-4 pl-4"
        >
            {children}
        </button>
    );
};
