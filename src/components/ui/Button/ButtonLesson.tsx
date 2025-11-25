import { useNavigate } from "react-router-dom";
import Arrow from "../../../../assets/icon/Arrow.svg";

interface ButtonProps {
    text?: string;
    link: string;
}

export default function Button({ text, link }: ButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => {
                navigate(`${link}`);
            }}
            className="relative max-w-60 w-full min-w-30 min-h-15 rounded-[200px] cursor-pointer bg-[#3F3F8F] text-white text-base group"
        >
            <div className="absolute w-15 h-15 rounded-full bg-[#5F52F8] top-0 left-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
                <img
                    src={Arrow}
                    alt="Arrow icon"
                    className="w-full h-full max-w-7 rotate-180"
                />
            </div>
            {text}
        </button>
    );
}
