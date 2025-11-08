import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // npm install react-icons

interface PasswordInputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    className?: string;
    error?: string;
    autoFocus?: boolean;
    maxLength?: number;
    onBlur?: () => void;
    onFocus?: () => void;
    forgotPasswordLink?: string;
}

export default function PasswordInput({
                                          label,
                                          placeholder,
                                          value,
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
                                          forgotPasswordLink,
                                      }: PasswordInputProps) {
    const [internalValue, setInternalValue] = useState<string>(value ?? "");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (onChange) onChange(newValue);
        setInternalValue(newValue);
    };

    return (
        <div className={`input-wrapper ${className}`} style={{ marginBottom: 16 }}>
            <div className="flex items-center justify-between">
                {label && (
                    <label
                        htmlFor={name}
                        style={{ display: "block", marginBottom: 4, fontWeight: 500 }}
                    >
                        {label} {required && "*"}
                    </label>
                )}
                {forgotPasswordLink && (
                    <div style={{textAlign: "right" }}>
                        <a
                            href={forgotPasswordLink}
                            style={{ fontSize: 13, color: "#3F3F8F", textDecoration: "none", marginBottom: 4, fontWeight: 500, textDecorationLine: "underline"}}
                        >
                            Забыли пароль?
                        </a>
                    </div>
                )}
            </div>
            <div style={{ position: "relative", width: "100%" }}>
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
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
                        padding: "8px 40px 8px 8px",
                        fontSize: 14,
                        borderRadius: 4,
                        background: "#D9D9D9",
                        height: '48px',
                        outline: "none",
                    }}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 16,
                        color: "#555",
                        padding: 0,
                    }}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            {error && (
                <span style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {error}
                </span>
            )}
        </div>
    );
}
