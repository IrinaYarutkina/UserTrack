"use client";
import ErrorCard from "@components/ErrorCard";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <ErrorCard message={error.message || "Произошла ошибка"} />
                <button
                onClick={() => reset()}
                className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                > Попробовать снова
                </button>
        </div>
    );
}
