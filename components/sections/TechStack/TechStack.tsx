'use client'

import { headerData } from '@/variants/featureVariants'
import { badgeContainer, badgeItem, headerContainer } from '@/variants/techVariants'
import { motion } from 'motion/react'


const stack = [
    { label: 'Next.js', color: '#9c9c9c' },
    { label: 'TypeScript', color: '#42d9ff' },
    { label: 'Tailwind CSS', color: '#38bdf8' },
    { label: 'Drizzle ORM', color: '#51f803' },
    { label: 'Auth.js', color: '#c707e9' },
    { label: 'React', color: '#00cfcc' },
    { label: 'Zod Validation', color: '#5456ea' },
    { label: 'App Router', color: '#b566cb' },
]

const TechStack = () => {
    return (
        <section
            id="tech-stack"
            className="my-10 flex flex-col justify-center items-center"
        >
            <motion.div
                variants={headerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-col gap-2 md:mx-10"
            >
                <motion.div variants={headerData} className="text-sm text-pink-400 tracking-widest">
                    {"// TECH STACK"}
                </motion.div>
                <div
                    className="flex flex-col gap-1 font-extrabold"
                >
                    <motion.h2 variants={headerData} className="sm:text-4xl text-3xl bg-linear-to-r from-white/80 to-pink-600 text-transparent bg-clip-text">Powered by the best</motion.h2>
                </div>
            </motion.div>

            <motion.div
                variants={badgeContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-wrap max-w-2xl  gap-4 mt-10 items-center justify-center"
            >
                {stack.map((s) => {
                    return (
                        <motion.div
                            variants={badgeItem}
                            whileHover={{ color: s.color }}
                            key={s.label}
                            className="flex items-center gap-[0.6rem] bg-white/5 border rounded-2xl px-4 py-1.5 text-sm text-gray-500"
                        >
                            <div className={`w-2 h-2 border rounded-[50%]`} style={{ backgroundColor: s.color }} />
                            {s.label}
                        </motion.div>
                    )
                })}
            </motion.div>
        </section >
    )
}

export default TechStack
