import React from "react";

interface DividerProps {
    color?: string;       // Цвет линии
    thickness?: string;   // Толщина линии (например, '1px', '2px')
    margin?: string;      // Отступ сверху и снизу
    className?: string;   // Доп. классы Tailwind
}

const Divider: React.FC<DividerProps> = ({
                                             color = "#E5E7EB",   // стандартный светло-серый
                                             thickness = "1px",
                                             margin = "1rem 0",
                                             className,
                                         }) => {
    return (
        <hr
            className={className}
            style={{
                border: "none",
                backgroundColor: color,
                height: thickness,
                margin,
            }}
        />
    );
};

export default Divider;
