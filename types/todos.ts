
export type TodoStatus = "all" | "completed" | "pending" | "overdue";

export interface Todo {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    deadline: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
    userId: string;
}

export interface CreateTodoInput {
    title: string;
    description?: string;
    deadline: string;
}

export interface UpdateTodoInput {
    id: string;
    title?: string;
    description?: string;
    deadline?: string;
    completed?: boolean;
}

export type ActionResult<T = void> =
    | { success: true; data: T }
    | { success: false; error: string };