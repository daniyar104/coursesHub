import { useEffect } from 'react';
import { useTestStore } from '../../store/useTestStore';

export default function TestSection() {
    const { currentTest, setAnswer, submitTest, result } = useTestStore();

    useEffect(() => {
        console.log(result);
    }, [result]);

    if (!currentTest) return null;

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">{currentTest.title}</h2>
            {result && (
                <p
                    className={`text-xl font-semibold ${
                        result.passed ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    Результат: {result.score}%
                </p>
            )}

            <div className="space-y-8">
                {currentTest.questions.map((q, index) => (
                    <div
                        key={q.id}
                        className="p-4 border border-gray-200 hover:border-gray-400 rounded-xl transition"
                    >
                        <p className="text-lg font-medium mb-4">
                            {index + 1}. {q.text}
                        </p>

                        <div className="space-y-3">
                            {q.answers.map((a) => (
                                <label
                                    key={a.id}
                                    className="flex items-center gap-3 p-3 border border-gray-200 hover:border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                                >
                                    <input
                                        type="radio"
                                        name={q.id}
                                        className="w-4 h-4 accent-[#5344B6]"
                                        onChange={() => setAnswer(q.id, a.id)}
                                    />
                                    <span className="text-gray-800">{a.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={submitTest}
                className="mt-8 w-full py-3 rounded-xl bg-[#5344B6] text-white text-lg font-semibold hover:bg-[#312679] transition"
            >
                Отправить тест
            </button>
        </div>
    );
}
