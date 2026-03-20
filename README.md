# Mission 5 Phase 1 Readme

## Project Overview
This project is the Phase 1 backend setup for Mission 5.  
It uses Node.js, Express, MongoDB, and Mongoose to manage auction data for local development.

## Installation
```bash
npm install
```

Create a `.env` file and add your MongoDB connection string:

```env
MONGODB_URI=your_connection_string_here
```

## CLI Commands
```bash
npm run seed
npm run clear
```

- `npm run seed` — resets the auction collection and inserts sample auction data
- `npm run clear` — removes all auction documents from the collection

## More Details
Phase 1 currently includes:
- MongoDB connection setup
- Auction model
- seed script
- clear script
