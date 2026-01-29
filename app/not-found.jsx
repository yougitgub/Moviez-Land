import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/404-bg.png"
                    alt="404 Cinema"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                <div className="mb-8 relative inline-block">
                    <h1 className="text-9xl font-extrabold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(43,127,255,0.5)]">
                        404
                    </h1>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#2B7FFF] rounded-full shadow-[0_0_10px_#2B7FFF] animate-pulse" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Oops! You've reached a dead end.
                </h2>

                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                    The movie or page you are looking for seems to have been removed from our premiere list or never existed in this theater.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="px-8 py-3 bg-[#2B7FFF] hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(43,127,255,0.3)] active:scale-95"
                    >
                        Return to Premiere
                    </Link>
                    <Link
                        href="/trendings"
                        className="px-8 py-3 border border-gray-700 hover:border-[#2B7FFF] text-white font-semibold rounded-full transition-all duration-300 hover:bg-[#2B7FFF]/10"
                    >
                        See What's Trending
                    </Link>
                </div>
            </div>

            <div className="absolute top-10 left-10 w-32 h-32 bg-[#2B7FFF]/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </main>
    );
}
