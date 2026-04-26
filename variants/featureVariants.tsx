
import { stagger, type Variants } from 'motion'

export const headerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            when: "beforeChildren",
            delayChildren: stagger(0.25)
        }
    }
}
export const headerData: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeOut', duration: 0.3
        }
    }
}


export const gridContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            when: "beforeChildren",
            delayChildren: stagger(0.25)
        }
    }
}

export const gridCards: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring', damping: 9, stiffness: 80
        }
    }
}