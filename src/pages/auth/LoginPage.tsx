import React from 'react';

import uni from '../../../assets/images/University.png';
import logo from "../../../assets/images/UniversityIcon.png"
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";

const LoginPage: React.FC = () => {
    // const navigate = useNavigate();
    // const loginUser = useAuthStore(state => state.loginUser);
    // const loading = useAuthStore(state => state.loading);
    // const error = useAuthStore(state => state.error);
    //
    // const [form, setForm] = useState<LoginRequest>({
    //     email: '',
    //     password: '',
    // });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // };
    //
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         await loginUser(form);
    //         navigate('/profile');
    //     } catch {
    //         // Ошибка уже в zustand
    //     }
    // };

    return (
        <div className="flex min-h-screen">
            {/* Левая часть */}
            <div className="hidden md:flex bg-gray-100 items-center justify-center w-[60%]">
                {/* Можно вставить изображение */}
                <img src={uni} alt="Background" className="object-cover w-[684px] h-[486px]"/>
            </div>

            <div className="w-[40%] p-4">
                <div className="flex items-center justify-between w-full">
                    <img src={logo} alt="AIU Logo" className="w-[163px] h-[51px]"/>
                    <p className="flex">Courses <b className="text-[#3F3F8F]">HUB</b></p>
                </div>

                <div className="w-[350px] mx-auto my-[12%]">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold">Рады вас видеть снова!</h2>
                        <p className="text-gray-500 mt-2 text-[12px]">Войдите чтобы снова получить доступ к курсам</p>
                    </div>

                    <div>
                        <Input label="Почта"/>
                        <PasswordInput label="Пароль" forgotPasswordLink="sad"/>
                        <Button className="w-full">Войти</Button>
                    </div>
                    <div className="my-4 flex items-center">
                        <hr className="flex-1 border-gray-300" />
                        <span className="mx-2 text-gray-400">или</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
                        Войти с помощью Google
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Нет аккаунта? <a href="/register" className="text-indigo-600">Создать аккаунт</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
