import { Mail, MapPin, Phone } from "lucide-react";

interface TeacherProfileProps {
    name: string;
    role: string;
    description: string;
    education: string[];
    avatarUrl: string;
    phone: string;
    location: string;
    email: string;
}

export default function TeacherProfile({
    name,
    role,
    description,
    education,
    avatarUrl,
    phone,
    location,
    email,
}: TeacherProfileProps) {
    return (
        <div className="w-full bg-[#E8E8F4] py-20 mt-20">
            <div className="w-[90%] max-w-[1230px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
                {/* Левый блок с аватаркой и контактами */}
                <div className="flex flex-col items-start gap-6 w-[300px]">
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="w-60 h-60 rounded-xl object-cover"
                    />

                    <div className="flex flex-col gap-2 text-left text-xl text-gray-700">
                        <div className="flex items-center gap-2">
                            <span>
                                <Phone color="#FC6441" size={20} />
                            </span>
                            <span>{phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>
                                <MapPin color="#FC6441" size={20} />
                            </span>
                            <span>{location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>
                                <Mail color="#FC6441" size={20} />
                            </span>
                            <span>{email}</span>
                        </div>
                    </div>
                </div>

                {/* Правый блок с информацией */}
                <div className="flex-1 flex flex-col gap-6 bg-white p-15">
                    {/* Имя и роль */}
                    <div>
                        <h1 className="text-4xl font-bold text-[#0E2A46]">
                            {name}
                        </h1>
                        <p className="text-[#F15A29] text-xl font-medium">
                            {role}
                        </p>
                    </div>

                    {/* Описание */}
                    <div className="flex flex-col gap-4 text-xl text-gray-700">
                        {description}
                    </div>

                    {/* Образование */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-4xl font-bold text-[#0E2A46]">
                            Образование
                        </h2>
                        {education.map((edu, i) => (
                            <p key={i} className="text-xl text-gray-700">
                                {edu}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
