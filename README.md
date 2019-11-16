# BirdHouse README (Work in progress!)

BirdHouse is a mobile birdwatching companion app aimed at making birdwatching fun and accessible for beginners.

## Motivation

Birdwatching can be very intimidating for a burgeoning birder and many reference guides are bulky and can be difficult to use if you don't know exactly what you are looking for. BirdHouse was created as a way for a beginner to quickly look up birds that they see while out walking/hiking.

## Screenshots and Demo

![BirdHouse logo](https://github.com/ayerest/birdhouse-frontend/blob/master/BirdHouse/assets/images/birdhouse_logo_drawn.png)

Check out the demo below:
[![Link to quick demo video of birdhouse app](https://i9.ytimg.com/vi/o_4FIHM3fbY/mq2.jpg?sqp=CJ_0tu4F&rs=AOn4CLChztTKMu5IrQcB_bm3LLX-iD-SPg)](https://youtu.be/o_4FIHM3fbY)


## Tech/framework used

Built with Ruby on Rails backend and React Native with Expo SDK frontend. 

### Backend

Created Ruby on Rails app for the backend ([BirdHouse backend](https://github.com/ayerest/birdhouse-backend)). Postgresql database with seed data scraped from [Birds of North America](https://birdsna.org/Species-Account/bna/species/) using Mechanize Ruby gem. Authentication using BCrypt and JWT (check out my [blog post on JWT](https://dev.to/iris/jwt-stands-for-4nec)). 

### Frontend

React Native app with Expo SDK frontend. Expo APIs used: Image Picker, Pedometer, MapView, Audio. Image Picker allows users to select an image from their camera library for an avatar on signup and also allows in-app camera use on the bird sighting form. Pedometer for live updating step count during app use - also updates overall step count for a date range upon login. MapView for live updating and static map views. Audio to play bird calls in app.

## Installation
Provide step by step series of examples and explanations about how to get a development env running.

## How to use?
If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project.

## Credits


