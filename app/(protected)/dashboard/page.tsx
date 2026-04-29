import { fetchTodosAction } from "@/actions/todosAction"
import { DashboardShell } from "@/components/TodoApp/DashboardShell"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const Dashboard = async () => {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
        redirect('/login')
    }
    const result = await fetchTodosAction();
    const initialTodos = result.success ? result.data : [];
    return (
        <DashboardShell
            initialTodos={initialTodos}
            userName={session.user.name ?? session.user.email}
        />
    )
}

export default Dashboard
