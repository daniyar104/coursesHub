import { useState, useRef, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface DropdownItem {
    text: ReactNode;
    link: string;
}

interface DropdownMenuProps {
    elements: ReactNode;
    items: DropdownItem[];
    position?: "left" | "right";
}

export default function DropdownMenu({
    elements,
    items,
    position,
}: DropdownMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const navigator = useNavigate();

    // Закрытие при клике вне меню
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer"
            >
                {elements}
            </div>

            <div
                className={`absolute ${
                    position === "left" ? "left-0" : "right-0"
                } mt-2 w-44 bg-white shadow-lg rounded-md overflow-hidden z-10 border border-gray-300 transition-all duration-300 ease-in-out ${
                    open
                        ? "max-h-60 opacity-100 visible"
                        : "max-h-0 opacity-0 invisible"
                }`}
            >
                <ul className="text-gray-700">
                    {items.map((item, index) => (
                        <li key={index}>
                            <div
                                onClick={() => {
                                    navigator(item.link);
                                    setOpen(false);
                                }}
                                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {item.text}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
