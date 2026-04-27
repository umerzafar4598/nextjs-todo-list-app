'use client'

import { useState } from "react"
import { Button } from "../../ui/button"
import { FaArrowRightLong } from "react-icons/fa6"
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from "lucide-react"
import Link from "next/link"

const navItem = [
    { name: "Features", href: "#features" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Get Started", href: "#get-started" }
]

const Header = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* HEADER */}
            <motion.header
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 8, stiffness: 300 }}
                className="h-14 w-[95%] md:w-fit px-5 bg-white/10 flex items-center justify-between border rounded-2xl"
            >

                <h2 className="text-2xl bg-linear-to-r from-[rgb(171,75,255)] to-[rgba(255,63,127,1)] bg-clip-text text-transparent md:pr-5">
                    Tasko
                </h2>

                {/* DESKTOP NAV */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-2">
                        {navItem.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                whileHover={{ backgroundColor: 'rgba(0,0,0,1)', color: 'rgba(255,255,255,1' }}
                                className="text-sm text-white/55 py-2 px-3 rounded-full"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </ul>
                </nav>

                {/* DESKTOP CTA */}
                <div className="hidden md:block md:pl-5">
                    <Button >
                        <Link href='/dashboard' className="flex items-center justify-center gap-2">
                            Try Free
                            <FaArrowRightLong />
                        </Link>
                    </Button>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </motion.header>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] bg-white/10 backdrop-blur-md border rounded-2xl p-5 md:hidden"
                    >
                        <ul className="flex flex-col gap-4 text-center">
                            {navItem.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="text-white/80 hover:text-white transition"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </ul>

                        <div className="mt-5">
                            <Button className="w-full">
                                <Link href='/dashboard' className="flex items-center justify-center gap-2">
                                    Try Free
                                    <FaArrowRightLong />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header