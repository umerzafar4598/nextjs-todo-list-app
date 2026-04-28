import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const Dashboard = async () => {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
        redirect('/login')
    }
    return (
        <div>
            <h1 className="text-center text-3xl">Welcome {session.user.name}</h1>
        </div>
    )
}

export default Dashboard
