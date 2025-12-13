import { useState } from 'react';

import Logo from '../../../assets/icon/Logo.png';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-sm fixed w-full z-100">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-24">
                <div className="flex items-center gap-6">
                    <img src={Logo} alt="logo" className="h-10 w-auto" />
                </div>

                {/* Десктоп меню */}
                <nav className="hidden md:flex gap-6 text-gray-600 text-sm md:text-base">
                    <p
                        className="hover:text-gray-800 cursor-pointer"
                        onClick={() => {
                            navigate('/categories');
                        }}
                    >
                        Все курсы
                    </p>
                    <p
                        className="hover:text-gray-800 cursor-pointer"
                        onClick={() => {
                            navigate('/about-us');
                        }}
                    >
                        О нас
                    </p>
                </nav>

                {/* Десктоп кнопки */}
                <div className="hidden md:flex gap-2">
                    <button
                        onClick={() => navigate('/login')}
                        className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                    >
                        Войти
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="border px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Зарегистрироваться
                    </button>
                </div>

                {/* Мобильное меню */}
                <nav className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={25} /> : <Menu size={25} />}
                    </button>
                </nav>
            </div>

            {/* Выпадающее мобильное меню */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <p
                        className="hover:text-gray-800 cursor-pointer"
                        onClick={() => {
                            navigate('/categories');
                        }}
                    >
                        Все курсы
                    </p>
                    <p
                        className="hover:text-gray-800 cursor-pointer"
                        onClick={() => {
                            navigate('/about-us');
                        }}
                    >
                        О нас
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                        <button
                            className="border px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
                            onClick={() => navigate('/login')}
                        >
                            Войти
                        </button>
                        <button
                            className="border px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                            onClick={() => navigate('/register')}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
