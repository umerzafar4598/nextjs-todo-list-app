'use client'

import { gridCards, gridContainer, headerContainer, headerData } from '@/variants/featureVariants'
import { featuresData } from './FeaturesData'
import { motion } from 'motion/react'


const Features = () => {
    return (
        <section
            id="features"
            className="mt-20"
        >
            <motion.div
                variants={headerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-col gap-2 md:mx-10"
            >
                <motion.div variants={headerData} className="text-sm text-pink-400 tracking-widest">
                    {"// FEATURES"}
                </motion.div>
                <div
                    className="flex flex-col gap-1 font-extrabold"
                >
                    <motion.h2 variants={headerData} className="text-4xl bg-linear-to-r from-white/80 to-pink-600 text-transparent bg-clip-text">Build different.</motion.h2>
                    <motion.h2 variants={headerData} className="text-4xl bg-linear-to-r from-white/80 to-pink-600 text-transparent bg-clip-text">Designed to ship.</motion.h2>
                </div>
                <div>
                    <motion.p variants={headerData} className='text-gray-500'>
                        Every feature is crafted to remove friction between your brain and your done list.
                    </motion.p>
                </div>
            </motion.div>

            <motion.div
                variants={gridContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 md:px-10 md:py-20 px-8 py-5"
            >
                {featuresData.map((card) => {
                    return (
                        <motion.div
                            variants={gridCards}
                            whileHover={{ y: -10, boxShadow: "0px 5px 30px 5px rgba(141, 88, 239, 0.525)" }}

                            key={card.id}
                            className="flex flex-col gap-5 items-start justify-start border rounded-4xl px-8 py-5 bg-white/5 "
                        >
                            <div
                                className=' p-2.5 rounded-lg'
                                style={{ background: card.accent }}
                            >
                                {card.icon}
                            </div>
                            <div className='flex flex-col gap-3'>
                                <h1 className='md:text-2xl text-lg font-bold text-white/70 '>{card.title}</h1>
                                <p className='text-gray-500 leading-6'>{card.content}</p>
                            </div>

                        </motion.div>
                    )
                })}

            </motion.div>
        </section>
    )
}

export default Features
