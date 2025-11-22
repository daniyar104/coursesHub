import React, { useState } from "react";
import Logo from "../../../assets/icon/Logo.png";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email.includes("@")) {
            setIsSubscribed(true);
            setEmail("");
        }
    };
    return (
        <footer
            id="contacts"
            className="bg-white border-t border-gray-300 py-10"
        >
            <div className="max-w-7xl mx-auto px-8 text-center">
                <img
                    src={Logo}
                    alt="logo"
                    className="mx-auto w-auto h-12 mb-4"
                />
                <h4 className="text-lg font-semibold mb-3">
                    Подписка на новости
                </h4>
                {isSubscribed ? (
                    <p className="text-green-600 font-medium">
                        Спасибо за подписку!
                    </p>
                ) : (
                    <form
                        onSubmit={handleSubscribe}
                        className="flex justify-center gap-2"
                    >
                        <input
                            type="email"
                            placeholder="Ваш email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border px-3 py-2 rounded w-64"
                            required
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            Подписаться
                        </button>
                    </form>
                )}
            </div>
        </footer>
    );
}
