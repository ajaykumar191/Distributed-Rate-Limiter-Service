# Distributed Rate Limiter Service

A production-style distributed rate limiter built using the **Token Bucket Algorithm** to regulate API traffic across multiple backend instances.

## Features

- Distributed rate limiting using Redis
- Token Bucket Algorithm
- Atomic Redis Lua scripting
- Configurable per-route rate limiting
- Express middleware integration
- HTTP 429 handling
- Dockerized deployment
- Redis shared state management

## Tech Stack

- Node.js
- Express.js
- Redis
- Docker
- REST APIs

## Project Structure

```txt
src/
├── config/
├── middleware/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js



API Endpoints
Test API
GET /api/test
Strict API
GET /api/strict
Run Locally
Install dependencies
npm install
Start Redis
docker run -d -p 6379:6379 redis
Start Server
npm run dev
Run with Docker
docker compose up --build
Example Response
Success
{
  "success": true,
  "message": "API request successful"
}
Rate Limited
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
Future Improvements
Rate limit headers
User-based throttling
Metrics endpoint
Sliding window algorithm
Horizontal scaling support