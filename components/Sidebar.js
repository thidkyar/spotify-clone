import {
    HomeIcon,
    LibraryIcon,
    SearchIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LockClosedIcon,
    LockOpenIcon,
} from "@heroicons/react/outline";
import { getProviders, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar({ providers }) {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    return (
        <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div className="space-y-4">
                {session ? (
                    <button className="sidebar-btn" onClick={() => signOut()}>
                        <LockClosedIcon className="h-5 w-5" />
                        <p>Logout</p>
                    </button>
                ) : (
                    <Link href="/login">
                        <button className="sidebar-btn">
                            <LockOpenIcon className="h-5 w-5" />
                            <p>Login</p>
                        </button>
                    </Link>
                )}
                <button className="sidebar-btn">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="sidebar-btn">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="sidebar-btn">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Library</p>
                </button>
                <hr className="border-t=[0.1px] border-gray-400" />

                <button className="sidebar-btn">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="sidebar-btn">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="sidebar-btn">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t=[0.1px] border-gray-400" />

                {/* Playlists... */}
                {playlists.map((playlist) => (
                    <p
                        key={playlist.id}
                        onClick={() => setPlaylistId(playlist.id)}
                        className="cursor-pointer hover:text-white"
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
