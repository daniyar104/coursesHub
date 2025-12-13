interface DescriptionProps {
    content?: string;
}

export default function Description({ content }: DescriptionProps) {
    return (
        <div className="max-w-full  mb-10">
            <h2 className="text-2xl text-[#0E2A46] font-bold mb-4">
                ОПИСАНИЕ УРОКА
            </h2>
            <div className="text-[#333931] mb-6 text-xl whitespace-pre-wrap">
                {content || "Описание отсутствует."}
            </div>
        </div>
    );
}
