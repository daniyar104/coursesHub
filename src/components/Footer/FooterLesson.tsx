import React from "react";
import MapImage from "../../../assets/images/footer_map_image.png";
import { Facebook, Instagram, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FooterLinkProps {
    link: string;
    text: string;
}
function FooterLink({ link, text }: FooterLinkProps) {
    const navigate = useNavigate();
    return (
        <li
            onClick={() => {
                navigate(`${link}`);
            }}
            className="text-2xl hover:underline decoration-1 cursor-pointer"
        >
            {text}
        </li>
    );
}
export default function Footer() {
    return (
        <footer className="relative w-full bg-[#2A2F5B] text-white overflow-hidden font-sans min-h-[300px]">
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <img
                    src={MapImage}
                    alt="Map background"
                    className="w-full h-full object-cover object-left mix-blend-overlay"
                />
            </div>

            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-10 md:gap-24 lg:pr-12">
                    {/* Колонка ссылок */}
                    <nav className="">
                        <ul className=" flex-col space-y-6">
                            <FooterLink link="/home" text="Главная" />
                            <FooterLink link="/about-us" text="О нас" />
                            <FooterLink link="/faq" text="FAQ" />
                        </ul>
                    </nav>

                    {/* Колонка контактов */}
                    <div className="flex flex-col items-start md:items-end space-y-6">
                        {/* Телефон и Email */}
                        <div className="flex flex-col items-start md:items-end space-y-2 text-sm md:text-base opacity-90">
                            <a
                                href="tel:+77007007070"
                                className="text-2xl hover:underline decoration-1 cursor-pointer"
                            >
                                +7 (700) 700 70 70
                            </a>
                            <a
                                href="mailto:aluuniversity@gmail.com"
                                className="text-2xl hover:underline decoration-1 cursor-pointer"
                            >
                                aluuniversity@gmail.com
                            </a>
                        </div>

                        {/* Социальные иконки */}
                        <div className="flex gap-4">
                            {/* Facebook */}
                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E9E2FF] cursor-pointer hover:bg-[#c2badb]">
                                <Facebook size={20} color="#2B2C64" />
                            </div>
                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E9E2FF] cursor-pointer hover:bg-[#c2badb]">
                                <Instagram size={20} color="#2B2C64" />
                            </div>
                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#E9E2FF] cursor-pointer hover:bg-[#c2badb]">
                                <Send size={20} color="#2B2C64" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
