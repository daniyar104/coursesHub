import { useTestStore } from '../../store/useTestStore';
import { CheckCircle } from 'lucide-react';

export default function TestSection() {
    const { currentTest, setAnswer, submitTest, result } = useTestStore();

    if (!currentTest) return null;

    // Если тест сдан успешно, показываем только результат
    if (result && result.passed) {
        return (
            <div className="w-full mx-auto p-8 bg-white rounded-2xl shadow-md text-center">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">{currentTest.title}</h2>
                <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-2xl border border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-700 mb-2">Тест успешно сдан!</p>
                    <p className="text-lg text-green-600">
                        Ваш результат: <span className="font-bold">{result.score}%</span>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">{currentTest.title}</h2>
            {result && !result.passed && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center font-medium">
                    Тест не сдан. Результат: {result.score}%. Попробуйте еще раз.
                </div>
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
                className="mt-8 w-full py-3 rounded-xl bg-[#5344B6] text-white text-lg font-semibold hover:bg-[#312679] transition shadow-lg hover:shadow-xl transform active:scale-95"
            >
                Отправить тест
            </button>
        </div>
    );
}
