import React, { useState } from 'react';
import uni from '../../../assets/images/University.png';
import logo from '../../../assets/images/UniversityIcon.png';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.ts';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { loginUser, loading, error } = useAuthStore();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (field: 'email' | 'password', value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            // вызываем zustand метод loginUser
            await loginUser(form);

            // после успешного логина редиректим на профиль
            navigate('/home');
        } catch (err: any) {
            // Ошибка в store уже установлена, но можно локально показать дополнительно
            console.error('Ошибка при входе:', err);
        }
    };
    return (
        <div className="flex min-h-screen">
            {/* Левая часть */}
            <div className="hidden md:flex bg-gray-100 items-center justify-center w-[60%]">
                {/* Можно вставить изображение */}
                <img src={uni} alt="Background" className="object-cover w-[684px] h-[486px]" />
            </div>

            <div className="w-[40%] p-8">
                <div className="flex items-center justify-between w-full">
                    <img
                        src={logo}
                        alt="AIU Logo"
                        onClick={() => {
                            navigate('/welcome');
                        }}
                        className="w-[163px] h-[51px] cursor-pointer"
                    />
                    <p className="flex">
                        Courses <b className="text-[#3F3F8F]">HUB</b>
                    </p>
                </div>

                <div className="w-[350px] mx-auto my-[12%]">
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold">Рады вас видеть снова!</h2>
                        <p className="text-gray-500 mt-2 text-[12px]">
                            Войдите чтобы снова получить доступ к курсам
                        </p>
                    </div>

                    <div>
                        <Input
                            label="Почта"
                            name="email"
                            value={form.email}
                            onChange={(val) => handleChange('email', val)}
                        />
                        <PasswordInput
                            label="Пароль"
                            forgotPasswordLink="sad"
                            name="password"
                            value={form.password}
                            onChange={(val) => handleChange('password', val)}
                        />
                        <Button
                            className="w-full"
                            onClick={handleSubmit}
                            variant="primary"
                            loading={loading}
                            size="medium"
                        >
                            Войти
                        </Button>
                    </div>
                    {error && <p className="text-red-500">Неправильная почта или пароль</p>}
                    <div className="my-4 flex items-center">
                        <hr className="flex-1 border-gray-300" />
                        <span className="mx-2 text-gray-400">или</span>
                        <hr className="flex-1 border-gray-300" />
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
                        Войти с помощью Google
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Нет аккаунта?{' '}
                        <a href="/register" className="text-indigo-600">
                            Создать аккаунт
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
