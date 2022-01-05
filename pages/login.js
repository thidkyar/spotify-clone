import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

function Login({ providers }) {
    return (
        <div className="flex flex-col relative animate-fade-in-down justify-center bg-gradient-to-b from-indigo-900 to-black h-screen text-white p-5 items-center">
            <div className="flex font-bold drop-shadow-md space-x-2 absolute top-4">
                <Image
                    src="/images/spotify-logo.png"
                    alt="spotify-logo"
                    width="32"
                    height="32"
                />
                <Link href="/">
                    <a className="text-2xl">spotify</a>
                </Link>
            </div>
            <LoginForm providers={providers} />
        </div>
    );
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
