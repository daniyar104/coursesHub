import FileCard from "../Card/FileCard";

interface LessonMessageProps {
    text?: string;
    file?: { name: string; url: string }[];
    code?: string;
    isMine?: boolean; // флаг для определения своего сообщения
    avatarUrl?: string;
    time?: string;
}

export default function LessonMessage({
    text,
    file,
    code,
    isMine = false,
    avatarUrl = "https://via.placeholder.com/40",
    time = "12:00",
}: LessonMessageProps) {
    return (
        <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 ${isMine ? "flex-row-reverse" : ""}`}>
                {/* Аватарка */}
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                />

                {/* Сообщение */}
                <div className={`flex flex-col gap-2 max-w-[70%]`}>
                    <div
                        className={`p-4 rounded-2xl shadow-sm border ${
                            isMine
                                ? "bg-[#5F52F8] text-white border-[#5F52F8]"
                                : "bg-white text-gray-700 border-gray-200"
                        }`}
                    >
                        {text && <p className="text-base">{text}</p>}

                        {file && (
                            <div className="flex flex-col gap-2 mt-2">
                                <div className="text-sm font-medium text-white">
                                    Прикреплённые файлы:
                                </div>
                                {file.map((el, i) => (
                                    <FileCard
                                        key={i}
                                        name={el.name}
                                        url={el.url}
                                    />
                                ))}
                            </div>
                        )}

                        {code && (
                            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm overflow-x-auto mt-2">
                                {code}
                            </pre>
                        )}
                    </div>

                    {/* Время */}
                    <span
                        className={`text-xs text-gray-400 ${
                            isMine ? "text-right" : "text-left"
                        }`}
                    >
                        {time}
                    </span>
                </div>
            </div>
        </div>
    );
}
