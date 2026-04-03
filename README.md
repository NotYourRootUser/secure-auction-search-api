# Mission 5 Phase 1 Auction Backend

## Project Overview
This project is the Phase 1 backend setup for Mission 5.  
It uses Node.js, Express, MongoDB, and Mongoose to manage auction data for local development.

## Installation
```bash
npm install
```

Create a `.env` file and add your MongoDB connection string:

```env
MONGO_URI=your_connection_string_here
```

## Running the Server
```bash
npm run dev
```

## CLI Commands
```bash
npm run seed
npm run clear
```

- `npm run seed` resets the auction collection and inserts sample auction data
- `npm run clear` removes all auction documents from the collection

## Search API
Start the backend server, then use the search endpoint below:

```http
GET /api/auctions/search?q=toyota
```

Example in browser or Postman:

```text
http://localhost:5000/api/auctions/search?q=toyota
```

The search endpoint checks both the auction title and description fields and returns matching results from MongoDB.

## More Details
Phase 1 currently includes:
- MongoDB connection setup
- Auction model
- seed script
- clear script
- auction search API
