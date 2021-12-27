import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
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
