import {
    HomeIcon,
    LibraryIcon,
    SearchIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
} from "@heroicons/react/outline";

function Sidebar() {
    return (
        <div className="text-gray-500 p-5 text-sm border-r border-gray-500">
            <div className="space-y-4">
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
                <p className="cursor-pointer hover:text-white">Playlist name</p>
            </div>
        </div>
    );
}

export default Sidebar;
