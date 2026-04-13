# Secure Auction Search API

## Project Overview
This project is a backend auction search API built with Node.js, Express, MongoDB, and Mongoose for local development and API testing.

It focuses on:
- clean Express app structure
- MongoDB integration with Mongoose
- schema validation for auction data
- defensive search input handling
- local seed and clear scripts for data management

## Installation
~~~bash
npm install
~~~

Create a `.env` file and add your MongoDB connection string:

~~~env
MONGO_URI=your_connection_string_here
~~~

## Running the Server
~~~bash
npm run dev
~~~

## CLI Commands
~~~bash
npm run seed
npm run clear
~~~

- `npm run seed` clears the auction collection and inserts sample auction data
- `npm run clear` removes all auction documents from the collection

## Search API
Start the backend server, then use the search endpoint below:

~~~http
GET /api/auctions/search?q=toyota
~~~

Example in browser or Postman:

~~~text
http://localhost:5000/api/auctions/search?q=toyota
~~~

The search endpoint:
- trims surrounding whitespace from input
- rejects empty queries
- escapes regex characters before building the search pattern
- searches both `title` and `description`
- sorts newest results first
- limits responses to 20 results

## Current Features
- MongoDB connection setup
- auction schema with validation
- auction search API
- seed script for sample data
- clear script for resetting the collection
- defensive handling for search input

## Testing
Tests cover the search contract for:
- valid search requests with matching results
- valid search requests with no matches
- missing query handling
- blank query handling
- regex-like input handling
- trimmed whitespace handling
- database failure response handling