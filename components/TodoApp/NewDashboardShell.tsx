'use client'

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setTodos } from "@/store/slices/todoSlice";
import type { Todo } from "@/types/todos";

interface Props {
    initialTodos: Todo[];
    userName?: string;
}

export default function NewDashboardShell({ initialTodos, userName }: Props) {
    const dispatch = useAppDispatch();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        dispatch(setTodos(initialTodos));
    }, []);

    return (
        <div>

        </div>
    )
}


