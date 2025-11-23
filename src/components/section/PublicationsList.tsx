import type { Publication } from "../../service/types";

interface PublicationsListProps {
    publications: Publication[];
}

const publicationTypeLabels: Record<Publication['type'], string> = {
    article: "Статья",
    book: "Книга",
    conference: "Конференция",
    journal: "Журнал"
};

const publicationTypeColors: Record<Publication['type'], string> = {
    article: "bg-blue-100 text-blue-700",
    book: "bg-purple-100 text-purple-700",
    conference: "bg-green-100 text-green-700",
    journal: "bg-orange-100 text-orange-700"
};

export default function PublicationsList({ publications }: PublicationsListProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="grid grid-cols-1 gap-6">
            {publications.map((pub) => (
                <div key={pub.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 flex-1">{pub.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ml-4 ${publicationTypeColors[pub.type]}`}>
                            {publicationTypeLabels[pub.type]}
                        </span>
                    </div>

                    <div className="space-y-2 mb-4">
                        <p className="text-gray-700">
                            <span className="font-semibold">Издатель:</span> {pub.publisher}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Дата публикации:</span> {formatDate(pub.publishDate)}
                        </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">{pub.description}</p>

                    {pub.url && (
                        <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
                        >
                            Читать полностью
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}
