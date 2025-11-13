import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex items-center border border-[#37368C] rounded-full pl-1 px-3 py-1.5 w-full max-w-[370px] h-8 bg-white">
            <div className="flex items-center justify-center w-6 h-6 bg-[#37368C] rounded-full">
                <Search size={14} className="text-white" />
            </div>
            <input
                type="text"
                placeholder="Найти..."
                className="ml-3 flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-800"
            />
        </div>
    );
}
