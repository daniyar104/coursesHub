import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/icon/Logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigator = useNavigate();

    return (
        <nav className="bg-white shadow-sm fixed w-full">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-24">
                <div className="flex items-center gap-6">
                    <img src={Logo} alt="logo" className="h-10 w-auto" />
                </div>

                {/* Десктоп меню */}
                <div className="hidden md:flex gap-6 text-gray-600 text-sm md:text-base">
                    <a className="hover:text-gray-800">Возможности</a>
                    <a href="#benefits" className="hover:text-gray-800">
                        Преимущества
                    </a>
                    <a href="#contacts" className="hover:text-gray-800">
                        Контакты
                    </a>
                </div>

                {/* Десктоп кнопки */}
                <div className="hidden md:flex gap-2">
                    <button
                        onClick={() => navigator("/login")}
                        className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                    >
                        Войти
                    </button>
                    <button
                        onClick={() => navigator("/register")}
                        className="border px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Зарегистрироваться
                    </button>
                </div>

                {/* Мобильное меню */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={25} /> : <Menu size={25} />}
                    </button>
                </div>
            </div>

            {/* Выпадающее мобильное меню */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <a
                        href="#features"
                        className="block text-gray-600 hover:text-gray-800"
                    >
                        Возможности
                    </a>
                    <a
                        href="#benefits"
                        className="block text-gray-600 hover:text-gray-800"
                    >
                        Преимущества
                    </a>
                    <a
                        href="#contacts"
                        className="block text-gray-600 hover:text-gray-800"
                    >
                        Контакты
                    </a>
                    <div className="flex flex-col gap-2 mt-2">
                        <button className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100">
                            Войти
                        </button>
                        <button className="border px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
