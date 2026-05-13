# Distributed Rate Limiter Service

A production-style **distributed rate limiter** built using the **Token Bucket Algorithm** to regulate API traffic across multiple backend instances.

This service uses **Redis as a shared distributed store** and **Lua scripting for atomic operations**, ensuring consistency and scalability in a multi-instance environment.

---

## Features

- Distributed rate limiting using Redis
- Token Bucket Algorithm implementation
- Atomic Redis Lua scripting
- Configurable per-route rate limiting
- Express middleware integration
- HTTP `429 Too Many Requests` handling
- Dockerized deployment
- Shared distributed state management
- Production-style backend architecture

---

## Tech Stack

- **Node.js**
- **Express.js**
- **Redis**
- **Docker**
- **Lua Scripting**
- **REST APIs**

---

## System Design

### Flow

1. Incoming request hits Express middleware
2. Middleware checks Redis token bucket
3. Lua script atomically:
   - Refills tokens
   - Consumes token if available
4. Request is:
   - **Allowed** → forwarded to API
   - **Rejected** → returns HTTP `429`

---

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
```

---

## API Endpoints

### Test API
```http
GET /api/test
```

### Strict Rate Limited API
```http
GET /api/strict
```

---

## Run Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Redis

```bash
docker run -d -p 6379:6379 redis
```

### 3. Start Development Server

```bash
npm run dev
```

---

## Run with Docker

```bash
docker compose up --build
```

---

## Example Responses

### Success Response

```json
{
  "success": true,
  "message": "API request successful"
}
```

### Rate Limited Response

```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

---

## Why Redis + Lua?

Using Redis Lua scripting ensures **atomic execution**, preventing race conditions when multiple backend instances try to update token counts simultaneously.

This makes the rate limiter **consistent, scalable, and safe for distributed systems**.

---

## Future Improvements

- Rate limit response headers
- User/IP-based throttling
- Monitoring & metrics endpoint
- Sliding Window algorithm
- Dynamic configuration support
- Horizontal scaling optimizations
- API gateway integration

---

## Learning Outcomes

Through this project, I learned:

- Distributed system fundamentals
- Rate limiting strategies
- Redis data management
- Atomic operations using Lua scripts
- Middleware architecture in Express
- Docker-based deployment
- Production backend design patterns

---

## Author

**Ajay A**