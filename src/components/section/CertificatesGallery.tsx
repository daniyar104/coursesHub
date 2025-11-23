import type { Certificate } from "../../service/types";

interface CertificatesGalleryProps {
    certificates: Certificate[];
}

export default function CertificatesGallery({ certificates }: CertificatesGalleryProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
                <div key={cert.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group">
                    {/* Certificate Image */}
                    <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                        <img
                            src={cert.imageUrl}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Certificate Info */}
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                            {cert.title}
                        </h3>

                        <div className="space-y-1 mb-4">
                            <p className="text-gray-700 font-medium">{cert.issuer}</p>
                            <p className="text-gray-600 text-sm">{formatDate(cert.issueDate)}</p>
                        </div>

                        {cert.credentialUrl && (
                            <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                            >
                                Проверить подлинность
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
