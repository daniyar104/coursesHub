import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
    name: string;
    path?: string; // если path есть — элемент кликабельный
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
        <nav className="flex text-sm text-gray-500 mb-6" aria-label="breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center">
                        {!isLast && item.path ? (
                            <Link
                                to={item.path}
                                className="hover:text-purple-600 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <span className="text-gray-800 font-medium">{item.name}</span>
                        )}

                        {!isLast && <span className="mx-2">/</span>}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
