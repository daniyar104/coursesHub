import * as React from "react";
const SVGComponent = (props) => (
    <svg
        width={10}
        height={10}
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g clipPath="url(#clip0_201_9987)">
            <path
                d="M3.04962 7.01432L0.609863 4.87954L3.04962 2.74475"
                stroke="black"
                strokeWidth={0.609939}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.70947 7.01432L9.14923 4.87954L6.70947 2.74475"
                stroke="black"
                strokeWidth={0.609939}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.79417 1.82983L3.96436 7.92922"
                stroke="black"
                strokeWidth={0.609939}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_201_9987">
                <rect width={9.75902} height={9.75902} fill="white" />
            </clipPath>
        </defs>
    </svg>
);
export default SVGComponent;
