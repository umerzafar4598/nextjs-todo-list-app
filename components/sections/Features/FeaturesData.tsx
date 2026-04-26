

import { VscWand } from "react-icons/vsc";
import { IoPricetagOutline } from "react-icons/io5";
import { HiMiniMoon } from "react-icons/hi2";
import { PiLockKeyFill } from "react-icons/pi";
import { TbLayoutFilled } from "react-icons/tb";
import { TbTargetArrow } from "react-icons/tb";

export const featuresData = [
    {
        id: 1,
        icon: <VscWand className="text-yellow-500" size={24} />,
        title: 'Instant Updates',
        content: 'Optimistic UI with React Server Components keeps interactions snappy — no loading spinners.',
        accent: 'rgba(124,109,250,.15)'

    },
    {
        id: 2,
        icon: <IoPricetagOutline className="text-white" size={24} />,
        title: 'Smart Tagging',
        content: 'Organize tasks with colorful tags. Filter by work, personal, urgent — exactly what you need.',
        accent: 'rgba(250, 109, 109, 0.15)'

    },
    {
        id: 3,
        icon: <HiMiniMoon className="text-yellow-300" size={24} />,
        title: 'Dark Mode First',
        content: "Eyes-friendly by default. Tailwind's dark mode class strategy with zero flash.",
        accent: 'rgba(77,208,225,.15)'

    },
    {
        id: 4,
        icon: <TbLayoutFilled className="text-green-300" size={24} />,
        title: 'Fully Responsive',
        content: 'Tailwind CSS utility-first layout that looks perfect from 320px to 4K wide.',
        accent: 'rgba(124,109,250,.15)'

    },
    {
        id: 5,
        icon: <PiLockKeyFill className="text-yellow-400" size={24} />,
        title: 'Auth & Sync',
        content: 'NextAuth.js + Drizzle keeps your tasks safe and in sync across every device.',
        accent: 'rgba(74,222,128,.15)'

    },
    {
        id: 6,
        icon: <TbTargetArrow className="text-red-600" size={24} />,
        title: 'Focus-Driven Design',
        content: 'Minimal UI to help you focus on completing tasks, not managing tools.',
        accent: 'rgba(240,98,146,.15)'

    },
]