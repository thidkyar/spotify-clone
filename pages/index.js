import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

export default function Home() {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify 2.0</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex">
                {/* Left SideBar */}
                <Sidebar />
                <Center />
            </main>
            <div>{/* player  */}</div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}
