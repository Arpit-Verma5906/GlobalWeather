# Global Weather

A simple web application that displays current weather information for any city worldwide. The project consists of a Node.js backend and a vanilla JavaScript frontend.

## Features

- Search for weather by city name
- Displays temperature, weather conditions, and icons
- Dynamic background changes based on weather
- Responsive and user-friendly UI

## Project Structure

```
Global-Weather/
│
├── backend/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   ├── config.js
│   └── assets/
│       ├── bg/
│       └── images/
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (for backend)
- An API key from [OpenWeatherMap](https://openweathermap.org/api) (or similar)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.default` to `.env` and set your weather API key and other environment variables in `.env`.
4. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Open index.html in your browser.
2. Ensure the backend server is running and accessible.

## Usage

- Enter a city name in the search bar and press enter or click the search icon.
- The app will display current weather details and update the background/image accordingly.

## Customization

- Add or replace background images in bg.
- Update weather icons in images.

## Notes

- The frontend communicates with the backend via HTTP requests. Ensure CORS is handled if accessing from different origins.
- For production, consider securing API keys and using environment variables.

## License

This project is for educational purposes.
