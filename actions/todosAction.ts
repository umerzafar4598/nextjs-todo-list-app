"use server";


import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { and, eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db/index";
import { todos } from "@/db/schemas/auth-schema";
import type { Todo, CreateTodoInput, UpdateTodoInput, ActionResult } from "@/types/todos";


async function requireUser() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) throw new Error("Unauthorized");
    return session.user;
}

function serializeTodo(row: typeof todos.$inferSelect): Todo {
    return {
        ...row,
        deadline: row.deadline.toISOString(),
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
    };
}


export async function fetchTodosAction(): Promise<ActionResult<Todo[]>> {
    try {
        const user = await requireUser();

        const rows = await db
            .select()
            .from(todos)
            .where(eq(todos.userId, user.id))
            .orderBy(desc(todos.createdAt));

        return { success: true, data: rows.map(serializeTodo) };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}


export async function createTodoAction(
    input: CreateTodoInput
): Promise<ActionResult<Todo>> {
    try {
        const user = await requireUser();

        if (!input.title?.trim()) {
            return { success: false, error: "Title is required" };
        }
        if (!input.deadline) {
            return { success: false, error: "Deadline is required" };
        }

        const [todo] = await db
            .insert(todos)
            .values({
                title: input.title.trim(),
                description: input.description?.trim() || null,
                deadline: new Date(input.deadline),
                userId: user.id,
            })
            .returning();

        revalidatePath("/dashboard");
        return { success: true, data: serializeTodo(todo) };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}


export async function updateTodoAction(
    input: UpdateTodoInput
): Promise<ActionResult<Todo>> {
    try {
        const user = await requireUser();

        const [existing] = await db
            .select()
            .from(todos)
            .where(and(eq(todos.id, input.id), eq(todos.userId, user.id)))
            .limit(1);

        if (!existing) return { success: false, error: "Todo not found" };

        const [todo] = await db
            .update(todos)
            .set({
                ...(input.title !== undefined && { title: input.title.trim() }),
                ...(input.description !== undefined && {
                    description: input.description?.trim() || null,
                }),
                ...(input.completed !== undefined && { completed: input.completed }),
                ...(input.deadline !== undefined && {
                    deadline: new Date(input.deadline),
                }),
                updatedAt: new Date(),
            })
            .where(and(eq(todos.id, input.id), eq(todos.userId, user.id)))
            .returning();

        revalidatePath("/dashboard");
        return { success: true, data: serializeTodo(todo) };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}


export async function toggleTodoAction(
    id: string,
    completed: boolean
): Promise<ActionResult<Todo>> {
    try {
        const user = await requireUser();

        const [todo] = await db
            .update(todos)
            .set({ completed, updatedAt: new Date() })
            .where(and(eq(todos.id, id), eq(todos.userId, user.id)))
            .returning();

        if (!todo) return { success: false, error: "Todo not found" };

        revalidatePath("/dashboard");
        return { success: true, data: serializeTodo(todo) };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}


export async function deleteTodoAction(id: string): Promise<ActionResult> {
    try {
        const user = await requireUser();

        const [deleted] = await db
            .delete(todos)
            .where(and(eq(todos.id, id), eq(todos.userId, user.id)))
            .returning({ id: todos.id });

        if (!deleted) return { success: false, error: "Todo not found" };

        revalidatePath("/dashboard");
        return { success: true, data: undefined };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}