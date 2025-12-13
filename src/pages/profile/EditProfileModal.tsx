import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EditProfileModal({
    open,
    onClose,
    user,
    onSave,
}: {
    open: boolean;
    onClose: () => void;
    user: { first_name: string; sur_name: string; email: string };
    onSave: (data: { first_name: string; sur_name: string; email: string }) => void;
}) {
    if (!open) return null;

    const [firstName, setFirstName] = useState<string>(user.first_name || '');
    const [surName, setSurName] = useState<string>(user.sur_name || '');
    const [email, setEmail] = useState<string>(user.email || '');

    const save = () => {
        onSave({ first_name: firstName, sur_name: surName, email });
    };

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">Редактировать профиль</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Имя</label>
                        <input
                            className="w-full mt-1 p-2 border rounded-lg"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Фамилия</label>
                        <input
                            className="w-full mt-1 p-2 border rounded-lg"
                            value={surName}
                            onChange={(e) => setSurName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            className="w-full mt-1 p-2 border rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Закрыть
                    </button>
                    <button
                        onClick={save}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Сохранить
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
