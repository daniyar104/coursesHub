import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Play, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { getPracticesByLessonId } from "../../../service/practiceService";
import type { Practice as PracticeType } from "../../../service/types";

export default function Practice() {
    const { lessonId } = useParams<{ lessonId: string }>();
    const [practices, setPractices] = useState<PracticeType[]>([]);
    const [activePracticeIndex, setActivePracticeIndex] = useState(0);
    const [code, setCode] = useState("");
    const [output, setOutput] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [testResult, setTestResult] = useState<{ passed: boolean; message: string } | null>(null);

    useEffect(() => {
        if (!lessonId) return;
        setLoading(true);
        getPracticesByLessonId(lessonId)
            .then((data) => {
                setPractices(data);
                if (data.length > 0) {
                    setCode(data[0].initial_code || "// Write your code here");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Не удалось загрузить практические задания.");
            })
            .finally(() => setLoading(false));
    }, [lessonId]);

    const activePractice = practices[activePracticeIndex];

    const handleRunCode = async () => {
        if (!activePractice) return;
        setIsRunning(true);
        setOutput([]);
        setTestResult(null);

        const logs: string[] = [];
        const customConsole = {
            log: (...args: any[]) => {
                logs.push(args.map(a => String(a)).join(' '));
            },
            error: (...args: any[]) => {
                logs.push("Error: " + args.map(a => String(a)).join(' '));
            }
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            // Logic: Iterate over test_cases, create a function with args, and run it.
            if (activePractice.test_cases && activePractice.test_cases.length > 0) {
                let allPassed = true;

                // If the backend provides arg_names, use them. 
                // Otherwise we can't properly inject arguments unless we guess or parse.
                // For now, we rely on arg_names being present if test_cases has input arrays.
                const argNames = activePractice.arg_names || [];

                for (let i = 0; i < activePractice.test_cases.length; i++) {
                    const testCase = activePractice.test_cases[i];
                    logs.length = 0; // Clear logs for execution context

                    // testCase.input is an array of arguments, e.g. [2, 3] or ["Alice"]
                    const args = testCase.input;

                    // Create function: new Function(arg1, arg2, ..., 'console', codeBody)
                    const fn = new Function(...argNames, 'console', code);

                    // Run it: fn(val1, val2, ..., customConsole)
                    fn(...args, customConsole);

                    // Check result
                    // The "output" from the console capture is what we compare against expected_output (if we capture logs)
                    // OR, if the function returns a value, we should check that too.
                    // The user prompt said: "Выведите результат в консоль" in descriptions, but also "test_cases: {input, output}".
                    // Usually "output" implies return value OR console output.
                    // Given the previous steps focused on console.log, let's stick to comparing console output.

                    const actualOutput = logs.join('\n').trim();
                    // testCase.output might be a number 15, or string "15".
                    // logs are strings. Safe comparison:
                    const expected = String(testCase.output).trim();

                    if (actualOutput !== expected) {
                        allPassed = false;
                        setOutput([
                            `Test Case #${i + 1} Failed:`,
                            `Input: ${argNames.map((n, j) => `${n}=${JSON.stringify(args[j])}`).join(', ')}`,
                            `Expected: "${expected}"`,
                            `Received: "${actualOutput}"`
                        ]);
                        setTestResult({ passed: false, message: `Ошибка в тесте #${i + 1}` });
                        break;
                    }
                }

                if (allPassed) {
                    setOutput(["All test cases passed successfully! 🚀"]);
                    setTestResult({ passed: true, message: "Выполнено! Все тесты пройдены." });
                }

            } else {
                // Legacy / Simple mode: No test cases, maybe just check expected_output against one run
                const run = new Function('console', code);
                run(customConsole);

                setOutput(logs);

                if (activePractice.expected_output) {
                    const actualOutput = logs.join('\n').trim();
                    const expected = activePractice.expected_output.trim();

                    if (actualOutput === expected) {
                        setTestResult({ passed: true, message: "Отлично! Результат совпадает с ожидаемым." });
                    } else {
                        setTestResult({
                            passed: false,
                            message: `Результат не совпадает. Ожидалось: "${expected}", Получено: "${actualOutput}"`
                        });
                    }
                } else {
                    setTestResult({ passed: true, message: "Код выполнен." });
                }
            }

        } catch (err: any) {
            setOutput(prev => [...prev, `Runtime Error: ${err.message}`]);
            setTestResult({ passed: false, message: "Ошибка выполнения кода." });
        } finally {
            setIsRunning(false);
        }
    };

    const handleSelectPractice = (index: number) => {
        setActivePracticeIndex(index);
        setCode(practices[index].initial_code || "");
        setOutput([]);
        setTestResult(null);
    };

    if (loading) {
        return <div className="p-10 text-center text-gray-500">Загрузка заданий...</div>;
    }

    if (error) {
        return (
            <div className="p-10 text-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    if (practices.length === 0) {
        return (
            <div className="p-10 text-center text-gray-500">
                <p>Для этого урока нет практических заданий.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full py-6">
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-2xl text-[#0E2A46]">Практическая работа</h3>
                {practices.length > 1 && (
                    <div className="flex gap-2">
                        {practices.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSelectPractice(idx)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${idx === activePracticeIndex
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                {/* Left Column: Task Info & Output */}
                <div className="flex flex-col gap-4 h-full overflow-hidden">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-y-auto">
                        <h4 className="text-xl font-bold text-indigo-900 mb-2">
                            {activePractice.title}
                        </h4>
                        <div className="prose prose-slate max-w-none text-gray-600 mb-4">
                            <p>{activePractice.description}</p>
                        </div>

                        {activePractice.expected_output && (
                            <div className="mt-4 bg-indigo-50 p-4 rounded-xl">
                                <p className="text-xs font-bold text-indigo-500 uppercase tracking-wide mb-1">
                                    Ожидаемый вывод:
                                </p>
                                <code className="text-sm text-indigo-900 font-mono">
                                    {activePractice.expected_output}
                                </code>
                            </div>
                        )}
                    </div>

                    <div className="bg-[#1e1e1e] rounded-2xl shadow-lg p-4 flex flex-col h-1/2 min-h-[200px]">
                        <div className="flex items-center justify-between mb-2 text-gray-400 text-xs border-b border-gray-700 pb-2">
                            <span className="font-mono">TERMINAL / CONSOLE</span>
                            <button onClick={() => setOutput([])} className="hover:text-white flex items-center gap-1">
                                <RefreshCw size={12} /> Clear
                            </button>
                        </div>
                        <div className="flex-1 font-mono text-sm overflow-y-auto text-green-400">
                            {output.length === 0 ? (
                                <span className="text-gray-600 italic opacity-50">Run code to see output...</span>
                            ) : (
                                output.map((line, i) => (
                                    <div key={i} className="whitespace-pre-wrap py-0.5 border-b border-gray-800/50">
                                        <span className="select-none text-gray-600 mr-2">$</span>
                                        {line}
                                    </div>
                                ))
                            )}
                        </div>
                        {testResult && (
                            <div className={`mt-2 p-2 rounded text-xs font-bold flex items-center gap-2 ${testResult.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                }`}>
                                {testResult.passed ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                {testResult.message}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Code Editor */}
                <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-400"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                            <span className="w-3 h-3 rounded-full bg-green-400"></span>
                            <span className="ml-2 text-sm font-semibold text-gray-600">
                                {activePractice.language || 'javascript'}
                            </span>
                        </div>
                        <button
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-white transition-all transform active:scale-95 ${isRunning
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-emerald-500/30"
                                }`}
                        >
                            {isRunning ? (
                                <>
                                    <RefreshCw className="animate-spin w-4 h-4" />
                                    <span>Running...</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 fill-current" />
                                    <span>Run Code</span>
                                </>
                            )}
                        </button>
                    </div>
                    <div className="flex-1 relative">
                        <Editor
                            height="100%"
                            defaultLanguage={activePractice.language || 'javascript'}
                            language={activePractice.language || 'javascript'}
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            theme="vs-dark"
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16, bottom: 16 },
                                fontLigatures: true,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
