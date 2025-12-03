import { useNavigate } from "react-router-dom";
import Arrow from "../../../../assets/icon/Arrow.svg";
import Loading from "../Loading/Loading";

interface ButtonProps {
    text?: string;
    link: string;
    direction?: "left" | "right";
    loading?: boolean;
}

export default function Button({
    text,
    link,
    direction = "left",
    loading = false,
}: ButtonProps) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => !loading && navigate(link)}
            disabled={loading}
            className={`relative rounded-[200px] text-white text-base flex items-center justify-center group ${
                loading
                    ? "bg-[#5d5d81] cursor-not-allowed"
                    : "bg-[#3F3F8F] cursor-pointer"
            } ${
                direction === "left" ? "justify-self-start" : "justify-self-end"
            } ${text ? "max-w-60 w-full min-w-30 min-h-15" : "w-15 h-15"}`}
        >
            <div
                className={`absolute w-15 h-15 rounded-full bg-[#5F52F8] ${
                    direction === "left"
                        ? "top-0 left-0 group-hover:-translate-x-2"
                        : "top-0 right-0 group-hover:translate-x-2"
                } flex items-center justify-center transition-transform duration-300`}
            >
                <img
                    src={Arrow}
                    alt="Arrow icon"
                    className={`w-full h-full max-w-7 ${
                        direction === "left" ? "rotate-180" : "rotate-0"
                    }`}
                />
            </div>

            {loading ? (
                <Loading size="small" color="white" />
            ) : (
                <span>{text}</span>
            )}
        </button>
    );
}
