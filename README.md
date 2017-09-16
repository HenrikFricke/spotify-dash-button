# Spotify Dash Button
> Control your Spotify playback with an AWS IoT Button

## Introduction

I wanted to play around with the AWS IoT platform to learn more about the concepts behind it. Therefore I bought an [AWS IoT Button] with the idea to control my Spotify account.

## Setup

1. Buy an [AWS Iot Button] and wait for delivery
2. Go to [Spotify Developer] and create a new application
3. Add `http://localhost:8080/` to the list of Redirect URIs (we just need it once for the oAuth flow)
4. Create your URL to authorize your Spotify account againt the new Application, use this and replace the placeholder with your Client ID:
    `https://accounts.spotify.com/authorize?client_id=<-- CLIENT ID -->&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&scope=user-read-playback-state%20user-modify-playback-state`
5. After that you will be redirected to `http://localhost:8080/`: The important part here is the code in the URL. Copy that to your clipboard, we will use it in the next step.
6. Run `curl -X POST 'https://accounts.spotify.com/api/token' -d 'grant_type=authorization_code' -d 'code=<-- YOUR CODE HERE -->' -d 'redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F' -H 'Authorization: Basic <-- base64 encoded client_id:client_secret -->'`
7. You will hopefully get the following response:
    ```json
    {
        "access_token":"<-- TOKEN -->",
        "token_type":"Bearer",
        "expires_in":3600,
        "refresh_token":"<-- TOKEN -->",
        "scope":"user-modify-playback-state user-read-playback-state"
    }
    ```
8. Copy the refresh token for later use
9. Now you can start to configure your IoT Button, please follow the guide [here](https://aws.amazon.com/iotbutton/getting-started/?nc1=h_ls)
10. Checkout this repository
11. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` to your environment
12. Install dependencies with `yarn install`
13. Replace `'iotbutton/G030PT0243371VGF'` in the `serverless.yml` with the topic name of your IoT Button
14. Run `yarn run deploy`
15. You should have everything in place to control your playback in Spotify :)

[AWS IoT Button]: https://aws.amazon.com/de/iotbutton/
[Spotify Developer]: https://developer.spotify.com/my-applications