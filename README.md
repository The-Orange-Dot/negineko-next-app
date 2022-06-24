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

https://user-images.githubusercontent.com/92559518/171810257-69abfcb2-22d9-4053-b9e9-538093e9d3e1.mp4

## May 31, 2022

Added Features

- Connection with Mods and Streamer now allows mods to control streamers UI. When used in tandem with OBS studio, streamer can capture the window and key-color to allow obs studio and allow mods to control streamer functionality through websocket.
- Created window on juicebox toolbar to allow streamers and verified mods to see who's online when connected.

https://user-images.githubusercontent.com/92559518/171812986-59e67adb-4e7f-4687-9139-602e2d34d2c8.mp4

(Note: For the safety and security of the streamers who want to use this, you must press connect when to connect to the server rather than it always being on. I'll add functionality to allow streamer to control everything on mobile only in the near future.)


https://user-images.githubusercontent.com/92559518/171814961-be675775-3dda-4c4c-8e58-6b159b6fe151.mp4

(Note: Streamers and moderators will have full control of buttons and functionality of raffles)


## June 1, 2022

Added Features

- Created a moderator control room to centralize all controls while watching the streamer's stream
- Added Typescript for many components to fix the bugs created when mods column was eliminated and mods table was created instead.

https://user-images.githubusercontent.com/92559518/171818108-a45dcd17-d62f-443e-a14c-403be8322f22.mp4

(Note: Streamer can eliminate key color on OBS Studio to show only the font on their overlays and moderators can hide streamer overlay so there is a clean overlay for text. White text is added for streams that are dark or at night.)

## June 2, 2022

Added Features

- When user logs in for the first time, the user can declare if they are a streamer or moderator (as of now, you can only choose one, but this will change in the future). 
        => Streamer: Using the nextauth provider info, it was fetch data from Twitch API to find your mods. You can choose to take off any mods that are on the list. Any mods submitted will be put on the streamer's pending list. If the mods send a request, they will automatically be set as a mod for the streamer's channel.
        => Moderator: Using the form, the moderator will input a streamer's name, and the form will use the Twitch API to fetch a user if they exist. When submitted, the moderator will be put on a pending list. If the streamer has the resgistering mod already on their pending list, they will be automatically approved.
- Added logic to settings page to show streamers their mod list and their pending list. While moderators will only see the streamers they are registered with.

https://user-images.githubusercontent.com/92559518/171828822-44412eaf-ba82-4515-a573-982bbafa2c6f.mp4

(Note: Moderators will be taken off the pending list and added as a verified mod automatically when they register and send a request to mod for the channel)

## June 3, 2022

Update

- Seems like Netlify doesn't do websockets and aws amplify needs quite a lot of configuration with nextauth and prisma. Not sure about Heroku. No updates until that's fixed


## June 10, 2022

Update

- Couldn't get aws amplify's lambda functions to work properly for fetch data with prisma and nextauth. Need to get that working

Added feature

- Text overlay where you could add and edit text (basically for now: font size, color, and bold). 
- The raffle screen and controls have been split into seperate independant components where the screens for the text overlay, raffle screen, and key coloring sit together and can both be used at the same time along.

https://user-images.githubusercontent.com/92559518/172972896-e8e92f6b-d3ab-4a83-b96e-ec2211b3c279.mp4

## June 16, 2022

Update

- Finally got the websockets working and online!! It is now on Heroku rather than AWS

## June 17, 2022

Added feature

- Added control panel and color selector for text overlays. Control panel has replaced the double click method of editing text and will make it easier to attach websocket functions.
- Added control panel for text overlays in the mod control panel. Functionality on this page will affect the text overlays. 

![new_control_panel](https://user-images.githubusercontent.com/92559518/174315687-2a8e36c0-91d0-43dd-be51-cd6085cc17c7.png)
![mod_control_panel_text_overlay](https://user-images.githubusercontent.com/92559518/174315698-c554f410-e1ae-4bdf-a002-29fc9c365f17.png)

To do:

- Add websockets for text overlay editing
- Set up functionality for directional controls
- Add all the db info back in for travel-log


## June 21, 2022

Added feature

- Directional pad has been implemented and works with websocket. Moderators are now able to move selected text on streamers client browser. There is still a problem with syncing the fetch text button though. 

## June 22, 2022

Added feature

- Added a font family selector for text overlays. Moderators and streamers are now able to change the text input, font size, font weight, font family, color and position remotely!

![Screen Shot 2022-06-23 at 23 22 03](https://user-images.githubusercontent.com/92559518/175323041-0961183b-f00a-45a8-82d1-7b06726cd6a7.png)

- Dashboard will fetch streamer's public info and channel info through Twitch API to display for both streamer and moderators. They can also see the last 5 streams and by clicking on it, they can watch the VOD too. (Styling needs to be updated...but I'll do that whenever lol)

![Screen Shot 2022-06-23 at 23 27 44](https://user-images.githubusercontent.com/92559518/175323623-666bf14c-5ffb-4ec1-aa8c-6dda69944508.png)

## June 23, 2022

Added feature

- Added dashboard view support for mobile browser and updated the mod control for mobile browsers to support websocket

![Screen Shot 2022-06-23 at 23 29 41](https://user-images.githubusercontent.com/92559518/175324317-bd7c08fc-cc31-4d93-b247-2bd2bbbfaaa0.png)
![Screen Shot 2022-06-23 at 23 29 58](https://user-images.githubusercontent.com/92559518/175324333-217f64d5-d752-4879-ab36-c4f162d8892f.png)

## June 24. 2022

Added feature

- Added "Chat" tab in mobile mod control panel. This allows mods and streamers to watch the stream and read chat. Below the chat is a reference panel that has references for chat/bot commands (such as Twitch, streamlabs, stream elements, and nightbot). Commands are put into folders based on category of commands, and when folders are open, users can see what the commands do and the command syntax on individual cards. Users can tap the card to copy the commands onto their clipboards to paste into chat.

![Screen Shot 2022-06-24 at 22 27 49](https://user-images.githubusercontent.com/92559518/175546571-b0951b30-ef02-426a-9b48-26f9e368de1f.png)

![Screen Shot 2022-06-24 at 22 28 13](https://user-images.githubusercontent.com/92559518/175546586-2bf95c6e-d1dc-40ec-860d-2390be335354.png)

![Screen Shot 2022-06-24 at 22 28 01](https://user-images.githubusercontent.com/92559518/175546593-168db73c-89f7-4909-9c20-68ae6655fbdc.png)
