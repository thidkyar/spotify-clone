import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET_ID,
});

function useSpotify() {
    const { data: session } = useSession();

    //WILL RUN ON MOUNT AND WHENEVER SESSION CHANGES [HENCE THE DEPENDENCY]
    useEffect(() => {
        if (session) {
            //IF REFRESH ACCESS TOKEN ATTEMPT FAILS -> REDIRECT TO LOGIN
            if (session.error === "RefreshAccessTokenError") {
                signIn();
            }
            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
}

export default useSpotify;
