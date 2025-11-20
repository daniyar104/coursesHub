import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import uni from '../../../assets/images/University.png';
import logo from "../../../assets/images/UniversityIcon.png"
import { useAuthStore } from "../../store/authStore.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const registerUser = useAuthStore((state) => state.registerUser);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const handleRegister = async () => {
        if (!agree) {
            alert("Пожалуйста, примите условия использования");
            return;
        }
        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        try {
            await registerUser({
                firstName,
                surname: surName,
                email,
                password,
            });
            if (!loading) {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="flex min-h-screen">
            {/* Левая часть с изображением */}
            <div className="hidden md:flex bg-gray-100 items-center justify-center w-[60%]">
                <img src={uni} alt="University" className="object-cover w-[684px] h-[486px]" />
            </div>

            {/* Правая часть с формой */}
            <div className="w-full md:w-[40%] p-8 flex flex-col">
                <div className="flex items-center justify-between mb-12">
                    <img src={logo} alt="AIU Logo" className="w-[163px] h-[51px]" />
                    <p className="flex text-sm">Courses <b className="text-[#3F3F8F]">HUB</b></p>
                </div>

                <div className="mx-auto w-full max-w-[450px]">
                    <h2 className="text-2xl font-bold mb-2">Создать аккаунт</h2>

                    <div className="flex gap-2">
                        <Input
                            label="Имя"
                            name="firstName"
                            className="w-full"
                            value={firstName}
                            onChange={setFirstName}
                            required
                        />
                        <Input
                            label="Фамилия"
                            name="surname"
                            value={surName}
                            onChange={setSurName}
                            className="w-full"
                            required
                        />
                    </div>
                    <Input
                        label="Почта"
                        name="email"
                        type="email"
                        value={email}
                        onChange={setEmail}
                        required
                    />
                    <div className="flex gap-2">
                        <PasswordInput
                            label="Пароль"
                            name="password"
                            value={password}
                            onChange={setPassword}
                            className="w-full"
                            required
                        />
                        <PasswordInput
                            label="Подтвердите пароль"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            name="agree"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <div className="text-[11px] text-gray-500">Я принимаю <span className="underline color-[#3F3F8F]">Условия использования</span> и <span className="underline color-[#3F3F8F]">Политику конфиденциальности</span></div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                    )}
                    <Button
                        onClick={handleRegister}
                        className="w-full mt-6"
                        disabled={loading}
                    >
                        {loading ? "Создание..." : "Создать аккаунт"}
                    </Button>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Есть аккаунт? <a href="/login" className="text-indigo-600">Войти</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
