'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="text-center max-w-lg">

                {/* 404 Heading */}
                <h1 className="text-7xl font-bold text-gray-900 mb-4">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Page not found
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                    The page you’re looking for doesn’t exist or may have been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">

                    {/* Go Home */}
                    <Link
                        href="/"
                        className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition"
                    >
                        Go to Home
                    </Link>

                    {/* Go Back */}
                    <button
                        onClick={() => router.back()}
                        className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    )
}