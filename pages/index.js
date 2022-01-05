import { useSession } from "next-auth/react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
    const { data: session } = useSession();
    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify 2.0</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/* Left SideBar */}
                <Sidebar />
                {/* dashboard */}
            </main>
            <div>{/* player  */}</div>
        </div>
    );
}
