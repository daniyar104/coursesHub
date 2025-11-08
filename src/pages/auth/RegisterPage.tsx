import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import uni from '../../../assets/images/University.png';
import logo from "../../../assets/images/UniversityIcon.png"

export default function RegisterPage(){
    return (
        <div className="flex min-h-screen">
            {/* Левая часть с изображением */}
            <div className="hidden md:flex bg-gray-100 items-center justify-center w-[50%]">
                <img src={uni} alt="University" className="object-cover w-[684px] h-[486px]" />
            </div>

            {/* Правая часть с формой */}
            <div className="w-full md:w-[50%] p-8 flex flex-col">
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
                        />
                        <Input
                            label="Фамилия"
                            name="lastName"
                            className="w-full"
                        />
                    </div>
                    <Input
                        label="Почта"
                        name="email"

                    />
                    <div className="flex gap-2">
                        <PasswordInput
                            label="Пароль"
                            name="password"
                            className="w-full"
                        />
                        <PasswordInput
                            label="Подтвердите пароль"
                            name="confirmPassword"
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="checkbox"
                            name="agree"
                            className="w-4 h-4"
                        />
                        <div className="text-[11px] text-gray-500">Я принимаю <span className="underline color-[#3F3F8F]">Условия использования</span> и <span className="underline color-[#3F3F8F]">Политику конфиденциальности</span></div>
                    </div>

                    <Button type="submit" className="w-full mt-6">Создать аккаунт</Button>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Есть аккаунт? <a href="/login" className="text-indigo-600">Войти</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
