"use client";

// providers/ReduxProvider.tsx

import { useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import type { Todo } from "@/types/todos";

interface Props {
    initialTodos?: Todo[];
    children: React.ReactNode;
}

export function ReduxProvider({ initialTodos = [], children }: Props) {
    // useMemo with an empty dep array creates the store exactly once per mount.
    // This avoids reading ref.current during render (React 19 lint rule) and
    // correctly types the value since makeStore() returns the store directly.
    const store = useMemo(() => makeStore(initialTodos), []);

    return <Provider store={store}>{children}</Provider>;
}