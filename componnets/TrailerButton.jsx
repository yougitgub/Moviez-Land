"use client";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";

export default function TrailerButton({ trailerPath }) {
    const [trailer, setTrailer] = useState(false);

    return (
        <>
            <button
                onClick={() => setTrailer(true)}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl font-bold cursor-pointer min-w-[180px]"
            >
                <FaPlay className="text-sm" /> Watch Trailer
            </button>

            {trailer && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10 cursor-pointer"
                    onClick={() => setTrailer(false)}
                >
                    <div
                        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button Inside Container */}
                        <button
                            onClick={() => setTrailer(false)}
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all z-[120] hover:scale-110 border border-white/20"
                        >
                            <FaWindowClose size={24} />
                        </button>

                        {trailerPath ? (
                            <iframe
                                className="w-full h-full"
                                src={trailerPath}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-white gap-4 bg-gray-900">
                                <p className="text-2xl font-bold opacity-60">Trailer Not Available</p>
                                <button
                                    onClick={() => setTrailer(false)}
                                    className="px-8 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors font-bold"
                                >
                                    Close Player
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
