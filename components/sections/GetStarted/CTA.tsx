'use client'

import { motion } from "motion/react"
import { Button } from "../../ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

const GetStarted = () => {
    const [copied, setCopied] = useState(false)

    const repoCmd = "git clone https://github.com/umerzafar4598/nextjs-todo-list-app.git"

    const handleCopy = async () => {
        await navigator.clipboard.writeText(repoCmd)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section id="get-started" className="my-20 flex justify-center px-5">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl border rounded-4xl p-8 bg-white/5 backdrop-blur-xl flex flex-col gap-6 ring-1 ring-primary"
            >
                {/* TEXT */}
                <div className="flex flex-col gap-2 text-center">
                    <h2 className="sm:text-3xl text-lg font-bold text-white/80">
                        Get started in seconds
                    </h2>
                    <p className="text-gray-500 sm:text-base text-sm">
                        Clone the repo, install dependencies, and launch your own Tasko instance locally.
                    </p>
                </div>

                {/* COMMAND BOX */}
                <div className="relative flex items-center justify-between bg-black/70 border rounded-xl px-4 py-3 font-mono text-sm text-green-400">
                    <span className="truncate">{repoCmd}</span>

                    <button
                        onClick={handleCopy}
                        className="ml-4 text-white/70 hover:text-white transition"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                    <Button
                        asChild
                        className="px-6"
                    >
                        <a
                            href="https://github.com/your-username/tasko"
                            target="_blank"
                        >
                            Clone Repository
                        </a>
                    </Button>
                </div>
            </motion.div>
        </section>
    )
}

export default GetStarted