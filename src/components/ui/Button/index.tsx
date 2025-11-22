import React from "react";

interface ButtonProps {
    children: React.ReactNode; // Текст или содержимое кнопки
    onClick?: () => void; // Обработчик клика
    type?: "button" | "submit" | "reset";
    disabled?: boolean; // Заблокированная кнопка
    className?: string; // Доп. CSS-классы
    variant?: "primary" | "secondary" | "danger" | "none"; // Варианты стилей
    size?: "small" | "medium" | "large"; // Размер кнопки
}

export default function Button({
    children,
    onClick,
    type = "button",
    disabled = false,
    className = "",
    variant = "primary",
    size = "medium",
}: ButtonProps) {
    // Цвета для разных вариантов
    const variantStyles: Record<string, string> = {
        primary: "bg-[#3F3F8F] text-white hover:bg-blue-700",
        secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700",
        none: "",
    };

    // Размеры кнопки
    const sizeStyles: Record<string, string> = {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${variantStyles[variant]} ${sizeStyles[size]} ${className} rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {children}
        </button>
    );
}
