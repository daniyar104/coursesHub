import Logo from "../../../assets/icon/Logo.png";
import Avatar from "../../../assets/images/Avatar.png";
import SearchBar from "../ui/Input/SearchBar";
export default function Header() {
    return (
        <header className="w-full bg-white/90 backdrop-blur-[10px] shadow-[0_1px_3px_0_rgba(18,20,32,0.14)] h-[95px] flex items-center ">
            <div className="max--w-[1320px] w-[90%] mx-auto flex items-center justify-between h-15 ">
                <div className="flex justify-between max-w-[830px] w-[90%] items-center">
                    {/* Логотип */}
                    <img src={Logo} alt="Logo" />

                    {/* Поисковик */}
                    <div className="hidden md:block ">
                        <SearchBar />
                    </div>

                    {/* Навигация */}
                    <nav className="hidden md:block mr-10">
                        <ul className="flex gap-10 items-center ">
                            <li>Все курсы</li>
                            <li>Мое обучение</li>
                        </ul>
                    </nav>
                </div>
                <div className=" w-10 h-10 rounded-full overflow-hidden">
                    <img
                        src={Avatar}
                        alt="Profile image"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </header>
    );
}
