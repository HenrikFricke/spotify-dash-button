const SpotifyWebApi = require('spotify-web-api-node')

module.exports.handler = (event, context, callback) => {    
    const spotifyApi = new SpotifyWebApi({
        clientId : process.env.SPOTIFY_CLIENT_ID,
        clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri : encodeURI(process.env.SPOTIFY_REDIRECT_URI),
    });

    spotifyApi.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN)

    spotifyApi.refreshAccessToken()
        .then(resp => spotifyApi.setAccessToken(resp.body['access_token']))
        .then(() => spotifyApi.getMyCurrentPlaybackState())
        .then(resp => resp.body['is_playing'] ? spotifyApi.pause() : spotifyApi.play())
        .then(() => callback(null))
        .catch(callback)
}