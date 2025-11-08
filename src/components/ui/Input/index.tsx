import React, { useState } from "react";

interface InputProps {
    label?: string;                    // Текст над полем
    placeholder?: string;              // Подсказка внутри поля
    type?: string;                     // Тип инпута
    value?: string | number;           // Значение (контролируемый компонент)
    defaultValue?: string | number;    // Начальное значение (неконтролируемый)
    onChange?: (value: string) => void; // Колбэк при изменении
    disabled?: boolean;                // Заблокированное поле
    required?: boolean;                // Обязательное поле
    name?: string;                     // Имя поля
    className?: string;                // Доп. CSS-классы
    error?: string;                    // Сообщение об ошибке
    autoFocus?: boolean;               // Автофокус
    maxLength?: number;                // Максимальная длина
    onBlur?: () => void;               // Событие blur
    onFocus?: () => void;              // Событие focus
}

export default function Input({
                                  label,
                                  placeholder,
                                  type = "text",
                                  value,
                                  defaultValue,
                                  onChange,
                                  disabled = false,
                                  required = false,
                                  name,
                                  className = "",
                                  error,
                                  autoFocus = false,
                                  maxLength,
                                  onBlur,
                                  onFocus,
                              }: InputProps) {
    const [internalValue, setInternalValue] = useState<string | number>(
        value ?? defaultValue ?? ""
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (onChange) onChange(newValue);
        setInternalValue(newValue);
    };

    return (
        <div className={`input-wrapper ${className}`} style={{ marginBottom: 16 }}>
    {label && (
        <label
            htmlFor={name}
        style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
    >
        {label} {required && "*"}
        </label>
    )}
    <input
        id={name}
    name={name}
    type={type}
    placeholder={placeholder}
    value={value ?? internalValue}
    onChange={handleChange}
    disabled={disabled}
    required={required}
    autoFocus={autoFocus}
    maxLength={maxLength}
    onBlur={onBlur}
    onFocus={onFocus}
    style={{
        width: "100%",
            padding: 8,
            fontSize: 14,
            borderRadius: 6,
            outline: "none",
            background: "#D9D9D9",
            height: '48px'
    }}
    />
    {error && (
        <span style={{ color: "red", fontSize: 12, marginTop: 4 }}>
        {error}
        </span>
    )}
    </div>
);
}
