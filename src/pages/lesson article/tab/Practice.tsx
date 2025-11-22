import FileCard from "../../../components/ui/Card/FileCard";
import Divider from "../../../components/ui/Divider/Divider";
import LessonMessage from "../../../components/ui/message/LessonMessage";

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
interface Message {
    id: string;
    text?: string;
    file?: { name: string; url: string }[];
    code?: string;
    isMine: boolean; // флаг — мое сообщение или чужое
    avatarUrl: string;
    time: string; // время отправки
}
// Пример данных с бэкэнда
const messageThisLesson: Message[] = [
    {
        id: "1",
        text: "Здравствуйте, я вот закончил свою практическую работу, не могли бы вы проверить?",
        file: [
            {
                name: "Logo.png",
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/1200px-Google_Gemini_logo_2025.svg.png",
            },
            {
                name: "Практическая работа.docx",
                url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/1200px-Google_Gemini_logo_2025.svg.png",
            },
        ],
        isMine: true,
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        time: "09:15",
    },
    {
        id: "2",
        text: "Здравствуйте, хорошо сейчас выставлю, вы мне код только скиньте",
        isMine: false,
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        time: "09:20",
    },
    {
        id: "3",
        code: `// Реализация простого ToDo-приложения на JavaScript

class TodoApp {
    constructor() {
        this.todos = [];
    }

    addTodo(title) {
        const todo = {
            id: Date.now(),
            title,
            completed: false,
            createdAt: new Date(),
        };
        this.todos.push(todo);
        return todo;
    }

    render() {
        console.log("=== Todo List ===");
        this.todos.forEach(t => {
            console.log(\`\${t.completed ? "[x]" : "[ ]"} \${t.title} (Created: \${t.createdAt.toLocaleTimeString()})\`);
        });
        console.log("=================");
    }
}

// Пример использования
app.render();`,
        isMine: true,
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        time: "09:25",
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

            <Divider />

            <div className="flex flex-col gap-5">
                <h3 className="font-bold text-xl text-[#0E2A46]">
                    Выполнение задания
                </h3>
                <input
                    type="text"
                    placeholder="Ваш ответ"
                    className="w-full rounded-full border border-[#5344B6] p-4 text-gray-700 focus:outline-none text-xl"
                />
                <p className="text-gray-500 text-center">
                    Ваши сообщения видит только преподователь
                </p>
            </div>

            <div className="flex flex-col gap-5">
                {messageThisLesson.map((el) => (
                    <LessonMessage
                        key={el.id}
                        text={el.text}
                        file={el.file} // или сразу передавать массив в компонент
                        code={el.code}
                        isMine={el.isMine}
                        avatarUrl={el.avatarUrl}
                        time={el.time}
                    />
                ))}
            </div>
        </div>
    );
}
