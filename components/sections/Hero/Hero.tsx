'use client'
import { children, container } from '@/variants/heroVariants'
import { motion } from 'motion/react'
import { Button } from '../../ui/button'
import Link from 'next/link'

const Hero = () => {
    return (
        <motion.section
            variants={container}
            initial="hidden"
            animate="visible"
            id="hero"
            className=" flex items-center justify-center flex-col space-y-8 py-10"
        >
            <motion.div variants={children} className="flex items-center justify-center gap-2 text-sm bg-purple-400/20 px-4 py-2 rounded-full">
                <div className="bg-[radial-gradient(circle_at_center,rgba(255,63,127,1),rgba(140,0,255,0.5))] h-3 w-3 rounded-full" />
                <p className="tracking-widest text-purple-400/50">Build with next.js + Typescript</p>
            </motion.div>
            <div className="">
                <motion.h1
                    variants={children}
                    className="sm:text-3xl md:text-4xl text-2xl text-center bg-[linear-gradient(120deg,rgba(140,0,255,1),rgba(255,63,127,1))] text-transparent bg-clip-text">
                    Organize your life without the chaos
                </motion.h1>
            </div>
            <div className="max-w-2xl flex flex-col items-center gap-2 justify-center sm:text-lg text-white/55">
                <motion.p variants={children} >
                    A beautifully minimal todo app engineered for focus.
                </motion.p>
                <motion.p variants={children} className="sm:text-center leading-10">
                    Tasko is a fast, distraction-free todo app that helps you plan, track, and finish what actually matters — without overcomplicating your workflow.
                </motion.p>
            </div>
            <motion.div variants={children} className='flex items-center justify-center gap-8'>
                <Link href='/'><Button size='lg'>Get Started - It&apos;s free</Button></Link>
                <Link href='https://github.com/umerzafar4598/nextjs-todo-list-app'><Button size='lg' variant='outline'>View on GitHub</Button></Link>
            </motion.div>
        </motion.section>
    )
}

export default Hero
