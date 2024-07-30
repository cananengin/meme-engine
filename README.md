# Meme Engine

Meme Engine provides a RESTful API for managing and searching memes. This API allows you to store and manage memes in a MongoDB database using Meme templates from Memegen.

## Features

- Import memes into MongoDB
- List all memes
- Search for specific memes
- Create new memes
- Update existing memes
- Delete memes
- Retrieve a random meme

## Technologies

- Node.js
- TypeScript
- NestJS
- MongoDB

## Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd meme-engine

2. **Install Dependencies:**
`npm install``

3. **Configure Database Connection:**
Open src/app.module.ts and replace the MongoDB connection string (mongodb://localhost:27017/meme-engine) with your own connection string.

4. **Load Database Schemas and Initial Data:**
This will be handled automatically when the application starts. It will fetch meme data from the Memegen API and load it into MongoDB.

## Usage

1. **Start the Application:**

`npm run start:dev
`

2. **Use the API Endpoints:**

##### List All Memes:
`curl -X GET http://localhost:3000/memes
`

##### Search for a Specific Meme:

`curl -X GET "http://localhost:3000/memes/search?query=Ancient%20Aliens%20Guy"
`

##### Get Specific Meme By Id:
`curl -X GET "http://localhost:3000/memes/aag" -H "Accept: application/json"
`

##### Create a New Meme:

`curl -X POST http://localhost:3000/memes \
-H "Content-Type: application/json" \
-d '{
  "name": "Test Meme",
  "url": "https://api.memegen.link/images/aag.png",
  "width": 800,
  "height": 600,
  "aspectRatio": "horizontal",
  "source": "http://knowyourmeme.com/memes/ancient-aliens",
  "keywords": ["History Channel"],
  "example": {
    "text": ["", "aliens"],
    "url": "https://api.memegen.link/images/aag/_/aliens.png"
  }
}'
`

##### Update a Meme:
`curl -X PUT http://localhost:3000/memes/<memeId> \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated Ancient Aliens Guy",
  "url": "https://api.memegen.link/images/aag_updated.png",
  "width": 850,
  "height": 650,
  "aspectRatio": "horizontal",
  "source": "http://knowyourmeme.com/memes/ancient-aliens-updated",
  "keywords": ["History Channel", "Aliens"]
}'
`

##### Delete a Meme:
`curl -X DELETE http://localhost:3000/memes/<memeId>
`

##### Get a Random Meme
`curl -X GET http://localhost:3000/memes/random
`