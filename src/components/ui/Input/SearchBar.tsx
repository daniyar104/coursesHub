import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex items-center border border-[#37368C] rounded-full pl-1 px-3 py-1.5 w-full max-w-[470px] h-12 bg-white">
            <div className="flex items-center justify-center w-10 h-10 bg-[#37368C] rounded-full">
                <Search size={20} className="text-white" />
            </div>
            <input
                type="text"
                placeholder="Найти..."
                className="ml-3 flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-800"
            />
        </div>
    );
}
