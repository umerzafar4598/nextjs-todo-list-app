
import { stagger, type Variants } from 'motion'

export const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            when: "beforeChildren",
            delayChildren: stagger(0.15, { startDelay: 0.2, })
        }
    }
}
export const children: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { ease: "easeInOut", duration: 0.4 }
    }
}