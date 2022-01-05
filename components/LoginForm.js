import { signIn } from "next-auth/react";
import Image from "next/image";

function LoginForm({ providers }) {
    return (
            <div className="flex flex-col items-center space-y-4">
                <p className="text-4xl font-bold">Log in</p>
                <div className="flex space-x-2 text-sm">
                    <p>Not registered on Spotify yet?</p>
                    <p className="text-red-400 font-bold cursor-pointer">
                        SIGN UP
                    </p>
                </div>
                <div>
                    {Object.values(providers).map((provider) => (
                        <div
                            key={provider.id}
                            className="flex space-x-2 animate-wiggle items-center bg-white rounded-xl text-black text-sm p-2 px-4 cursor-pointer"
                        >
                            <Image
                                src="/images/spotify-logo.png"
                                height={24}
                                width={24}
                            />
                            <p
                                className="font-bold text-monospace drop-shadow-lg"
                                onClick={() =>
                                    signIn(provider.id, { callbackUrl: "/" })
                                }
                            >
                                {provider.name.toUpperCase()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default LoginForm;
