#NegiNeko_Tokyo Home Page

> NegiNeko + Orange

## Table of contents

1. [General](#general)
2. [Project Demo](#project)
3. [Updates](#updates)

<a name="general"></a>

## General info

<a name="project"></a>

## Project Demo

<a name="updates"></a>

https://user-images.githubusercontent.com/92559518/166092386-06b388c7-f6af-4d67-b229-dc8a772891e0.mp4

## Updates

- First init
- Navbar and pages created
- Multi-view iframe embedded video created
- Travel-log back-end created with Prisma
- Travel page created
- travelId dynamic routing created
- Added Twitch API OAUTH keys used for Negi's video and stream info
- Multi-view replaced iframe with react-twitch-embed dependency
- Raffle-tool created
- Raffle-tool options and timers added
- About page created
- GSAP library added for animation
- Home page images and animation is added
- Hover text animation added for NavBar and Homepage
- Media-query added for mobile responsiveness
- Travel-log style updated, and map replaced with thumbnails
- Trave-log searchbar and category selector created and works!
- Next-auth added for Twitch sign-in (omg, took forever)
- Added redux store
- CORS has been added to API routes to prevent unauthorized access to servers
- Store page with product back end
- Stripe integration in store page

## May 23, 2022

Added Features

- Added Dashboard and darkmode

https://user-images.githubusercontent.com/92559518/171800503-62db3047-c6b6-446d-91a2-db76ea53f32c.mp4

## May 26, 2022

Added Features

- Changed Dashboard to Juicebox and moved raffle-tool to Juicebox section
- Added socket.io to connect streamers and moderators for the streamers together

## May 28, 2022

Added Features

- Use Twitch API to verify streamer information to POST to back end.
- Added redux and optimized and eliminated prop drilling on raffle page.
- Created emitters and listeners when connecting with the server. When connection is establish, a channel is open to the streamer

## May 30, 2022

Added Features

- Added redux persist to store user info, dark mode, raffle-tool, and other functionality
- Eliminated "mod" column in user db and created a mod table to associate with user table
- Added scope to find mods on Twitch API on streamer's account to verify mods so users can't randomly inject their own info into streamer's mods list
- Continued work on emitters and listeners. When streamer logs in, a channel verifies mods through Twitch API and connects ONLY verified mods

## May 31, 2022

Added Features

- Connection with Mods and Streamer now allows mods to control streamers UI. When used in tandem with OBS studio, streamer can capture the window and key-color to allow obs studio and allow mods to control streamer functionality through websocket.

## June 1, 2022

Added Features

- Created a moderator control room to centralize all controls while watching the streamer's stream
- Added Typescript for many components to fix the bugs created when mods column was eliminated and mods table was created instead.

## June 2, 2022

Added Features

- When user logs in for the first time, the user can declare if they are a streamer or moderator (as of now, you can only choose one, but this will change in the future). 
        => Streamer: Using the nextauth provider info, it was fetch data from Twitch API to find your mods. You can choose to take off any mods that are on the list. Any mods submitted will be put on the streamer's pending list. If the mods send a request, they will automatically be set as a mod for the streamer's channel.
        => Moderator: Using the form, the moderator will input a streamer's name, and the form will use the Twitch API to fetch a user if they exist. When submitted, the moderator will be put on a pending list. If the streamer has the resgistering mod already on their pending list, they will be automatically approved.
- Added logic to settings page to show streamers their mod list and their pending list. While moderators will only see the streamers they are registered with.
