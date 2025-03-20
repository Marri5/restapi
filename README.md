# Data API

A RESTful API for storing and retrieving data based on date and user information. The API is designed to be scalable and follows best practices for data management and security.

## System Requirements

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Project Structure

```
.
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   └── app.js         # Main application file
├── tests/             # Test files
├── docs/             # Documentation
│   ├── architecture/  # System architecture diagrams
│   └── api/          # API documentation
├── .env.example      # Example environment variables
├── .gitignore        # Git ignore file
└── package.json      # Project dependencies
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/data-api
EMAIL_PATTERN=@afk.no
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values
4. Start the server:
   ```bash
   npm run dev
   ```

## API Documentation

Detailed API documentation can be found in the `/docs/api` directory.

## Testing

Run tests using:
```bash
npm test
```

## License

[MIT License](LICENSE)