import FileCard from "../../../components/ui/Card/FileCard";

const data = [
    {
        name: "Logo.png",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/1200px-Google_Gemini_logo_2025.svg.png",
    },
    {
        name: "Практическая работа.docx",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/1200px-Google_Gemini_logo_2025.svg.png",
    },
    {
        name: "Logo.png",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/1200px-Google_Gemini_logo_2025.svg.png",
    },
];
export default function Practice() {
    return (
        <div className="flex flex-col gap-10 w-full ">
            <div className="flex flex-col gap-5">
                <h3 className="font-bold text-xl text-[#0E2A46]">
                    Прикреплённые файлы
                </h3>
                <div className="flex gap-2 flex-col">
                    {data.map((el, i) => (
                        <FileCard key={i} name={el.name} url={el.url} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <h3 className="font-bold text-xl text-[#0E2A46]">
                    Практические задание
                </h3>

                <div className="flex flex-col gap-2.5">
                    <h5 className="text-[#5F52F8] text-xl">Задание №1</h5>
                    <p className="text-[#333931] text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Асылхан лох. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nullaDuis
                        aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim..
                    </p>
                    <p className="text-[#333931] text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Асылхан лох. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nullaDuis
                        aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim..
                    </p>
                </div>
            </div>
        </div>
    );
}
