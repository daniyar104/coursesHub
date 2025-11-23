import React from "react";

export interface TimecodeItem {
    label: string;
    time: number; // секунды
}

interface TimecodeListProps {
    items: TimecodeItem[];
    onTimecodeClick: (time: number) => void;
}

const TimecodeList: React.FC<TimecodeListProps> = ({
    items,
    onTimecodeClick,
}) => {
    const formatTime = (totalSeconds: number) => {
        const m = Math.floor(totalSeconds / 60);
        const s = Math.floor(totalSeconds % 60);
        return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <div className="w-full">
            <h3 className="text-gray-900 font-bold uppercase text-sm tracking-wider mb-4 border-b pb-2 border-gray-100">
                Тайм-коды
            </h3>
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li key={idx}>
                        <button
                            onClick={() => onTimecodeClick(item.time)}
                            className="flex items-center w-full group p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                            {/* Время с акцентным цветом */}
                            <span className="text-[#5F52F8] font-mono text-sm bg-[#5F52F8]/10 px-2 py-1 rounded mr-3 group-hover:bg-[#5F52F8] group-hover:text-white transition-colors">
                                {formatTime(item.time)}
                            </span>
                            {/* Название */}
                            <span className="text-gray-700 text-sm font-medium group-hover:text-[#5F52F8] transition-colors">
                                {item.label}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimecodeList;
