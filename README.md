# Desert Islands For Deserters

## Overview

For our second project, we were tasked with applying our knowledge of Google Map API's to making an API of our own. Some chose bars, some chose restaurants. I chose uninhabited islands because I have a soft spot for eerie places with storied pasts. Am I glad I did.

## The Build

I used: jQuery, SCSS/SASS, Mongoose, MongoDB, Node.js, Express, HTML5, API’s, Github, Heroku, Gulp

I started off by constructing the MEAN stack and setting up the basic framework with Node.js and Express.js. When I had all the correct config, controller, authentications and view folders set up and correctly routed, it was now time for functionality. I had to seed the islands myself, as there is no existing API for uninhabited islands. Understandable, as there are 2 million of them in the entire world. 

I put these islands with their latlng points and descriptions in a seeds file and created a function to loop through them when the map was loaded. The islands then appeared on the map at the correct latlng points with daggers as markers. I then added a function that caused a window to appear when a marker was clicked, containing all the data that I seeded into my database. To this window, I also included the weather at each location by adding an existing weather API by Open Weather Map. To augment the user experience, I added a callback function that zoomed onto an island's location when its marker was clicked and zoomed back out to the map when its info window was closed. 

For styling, I used Snazzy Maps and customised the colours myself. I also coded vintage drawings of sea monsters at random latlng points for some added flair.

## Pluses 

Without a doubt, this was my favourite app to build. It was the crucial moment when I discovered that writing and coding were far from incompatible disciplines. I wrote all the descriptions myself, which I had immense enjoyment doing because the islands' histories were so rich and singularly peculiar. I truly felt that I had left my mark on the app through storytelling. As a writer, I felt incredibly fulfilled.

## Challenges

There was no existing API for all 2 million of the world's uninhabited islands, so I had to seed the information myself and I had to be judicious about which islands I picked. But frankly, I'd consider that a plus.

## Potential Developments

I might make use of some API's that indicate the modes of transport the next intrepid explorer might take to one of these islands. I might also see if I can make the waves on the ocean part of the map move as a homage to my previous app.

## Overall

I began to see myself as a writer AND a web developer from this point onward. I also began to envision a potential career in creative direction.    
