interface FileCardProps {
    name: string;
    url: string;
}
const fileColors: Record<string, string> = {
    png: "bg-yellow-500",
    jpg: "bg-yellow-500",
    jpeg: "bg-yellow-500",
    pdf: "bg-red-500",
    docx: "bg-blue-500",
    xlsx: "bg-green-500",
    txt: "bg-gray-500",
};
export default function FileCard({ name, url }: FileCardProps) {
    const format = name.split(".").pop() || "FILE";
    const color = fileColors[format] || "bg-gray-500";

    const handleDownload = async () => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();

            // определяем тип
            const mimeType = blob.type;
            const realExtension = mimeType.split("/")[1]; // например "png"

            // берём оригинальное имя без расширения
            const fileBaseName = name.includes(".")
                ? name.substring(0, name.lastIndexOf("."))
                : name;

            // правильное имя
            const correctName = `${fileBaseName}.${realExtension}`;

            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = correctName; // теперь скачивается правильно
            a.click();

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Ошибка скачивания:", error);
        }
    };

    return (
        <div
            onClick={handleDownload}
            className="w-full h-13 bg-white rounded-xl p-2 flex gap-3 border-[#3F3F8F] border items-center font-medium cursor-pointer hover:bg-gray-100"
        >
            <div
                className={`${color} min-w-15 w-auto px-2 h-full text-white font-bold text-center flex items-center justify-center rounded-sm`}
            >
                {format.toUpperCase()}
            </div>
            <p className="text-[#333931]">{name}</p>
        </div>
    );
}
