# BirdHouse

BirdHouse is a mobile birdwatching companion app that makes birdwatching fun and accessible for beginners.

![BirdHouse logo](https://github.com/ayerest/birdhouse-frontend/blob/master/assets/images/birdhouse_logo_drawn.png)

## Motivation

Birdwatching can be very intimidating for a burgeoning birder and many reference guides are bulky and can be difficult to use if you don't know exactly what you are looking for. BirdHouse was created as a way for a beginner to quickly look up birds that they see while out walking/hiking.

## Demo

[Link to quick demo video of birdhouse app](https://youtu.be/o_4FIHM3fbY)

## Tech/framework used

Built with Ruby on Rails backend and React Native with Expo SDK frontend. 

### Backend

Ruby on Rails backend ([BirdHouse backend](https://github.com/ayerest/birdhouse-backend)) with a Postgresql database. Seed data scraped from [Birds of North America](https://birdsna.org/Species-Account/bna/species/) using Mechanize Ruby gem. Authentication using BCrypt and JWT (check out my [blog post on JWT](https://dev.to/iris/jwt-stands-for-4nec)). 

### Frontend

React Native app with Expo SDK frontend. From Expo: Image Picker, Pedometer, MapView, Audio. Image Picker allows users to select an image from their camera library for an avatar on signup and also allows in-app camera use on the bird sighting form. Pedometer for live updating step count during app use - also updates overall step count for a date range upon login. MapView for live updating and static map views. Audio to play bird calls in app. Used React Hooks (checkout out my [blog post on Hooks](https://dev.to/iris/looky-looky-i-wrote-about-hook-s-y-28o7)) to manage local state and Redux.js for app-wide state.

## Credits

Bird species information including images and audio scraped from [Birds of North America](https://birdsna.org/Species-Account/bna/species/).


