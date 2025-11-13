import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/icon/Logo.png";
import Avatar from "../../../assets/images/Avatar.png";
import SearchBar from "../ui/Input/SearchBar";
import DropdownMenu from "../ui/DropdownMenu/DropdownMenu";
import { Bell } from "lucide-react";

export default function Header() {
    const navigator = useNavigate();

    const notifications = [
        { text: "Вы не закончили курс 'Frontend Basics'", unread: true },
        { text: "Новая скидка на курс 'React Pro'", unread: true },
        { text: "Вы успешно завершили курс 'HTML & CSS'", unread: false },
    ];
    return (
        <header className="w-full bg-white/90 backdrop-blur-[10px] shadow-[0_1px_3px_0_rgba(18,20,32,0.14)] h-[95px] flex items-center ">
            <div className="max--w-[1320px] w-[90%] mx-auto flex items-center justify-between h-15 ">
                <div className="flex justify-between max-w-[930px] w-[90%] items-center">
                    {/* Логотип */}
                    <img
                        src={Logo}
                        alt="Logo"
                        className="cursor-pointer"
                        onClick={() => {
                            navigator("/home");
                        }}
                    />

                    {/* Поисковик */}
                    <div className="hidden md:block w-[370px]">
                        <SearchBar />
                    </div>

                    {/* Навигация */}
                    <nav className="hidden md:block mr-10">
                        <ul className="flex gap-10 items-center ">
                            <li className="cursor-pointer">Все курсы</li>

                            <DropdownMenu
                                elements={
                                    <li className="cursor-pointer">
                                        Мое обучение
                                    </li>
                                }
                                items={[
                                    { text: "Профиль", link: "/profile" },
                                    { text: "Настройки", link: "/settings" },
                                    { text: "Выход", link: "/logout" },
                                ]}
                                position="left"
                                arrow={true}
                            />
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-5">
                    <DropdownMenu
                        elements={
                            <div className="relative cursor-pointer rounded-full hover:bg-gray-200 p-2 transition duration-300">
                                <Bell color="#37368C" />
                                {notifications.some((n) => n.unread) && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </div>
                        }
                        items={notifications.map((n) => ({
                            text: (
                                <div
                                    className={`flex items-center gap-2 ${
                                        n.unread
                                            ? "font-medium text-[#37368C]"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {n.text}
                                </div>
                            ),
                            link: "#",
                        }))}
                        position="right"
                        arrow={false}
                    />

                    <DropdownMenu
                        elements={
                            <div className=" w-10 h-10 rounded-full overflow-hidden">
                                <img
                                    src={Avatar}
                                    alt="Profile image"
                                    className="w-full h-auto cursor-pointer"
                                />
                            </div>
                        }
                        items={[
                            { text: "Профиль", link: "/profile" },
                            { text: "Настройки", link: "/settings" },
                            { text: "Выход", link: "/logout" },
                        ]}
                        position="right"
                        arrow={false}
                    />
                </div>
            </div>
        </header>
    );
}
