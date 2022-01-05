import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken(
            token
        );

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshToken.expires_in * 1000, // = 1 HOUR AS 3600 RETURNS FROM SPOTIFY API
            refreshToken: refreshedToken.refresh_token ?? token.refresh_token, //REPLACE IF NEW ONE CAME BACK ELSE FALL BACK TO OLD REFRESH TOKEN
        };
    } catch (error) {
        console.log(error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
            authorization: LOGIN_URL,
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, account, user }) {
            //INITIAL SIGN IN
            if (account && user) {
                return {
                    ...token,
                    access_token: account.access_token,
                    refresh_token: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000, //HANDLING EXPIRY IN MILLISECONDS
                };
            }

            //RETURN PREVIOUS ACCESS TOKEN IF NOT YET EXPIRED
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            //ACCESS TOKEN HAS EXPIRED, THEN REFRESH TOKEN
            return await refreshAccessToken(token);
        },

        async session({ session, token }) {
            session.user.accessToken = token.access_token;
            session.user.refresToken = token.refresh_token;
            session.user.username = token.username;

            return session;
        },
    },
});
