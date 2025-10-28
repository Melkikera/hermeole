# Hermeole

Hermeole is a React Native mobile application that integrates with the OpenWeather and PRIM APIs. The application features a dashboard with various widgets, implements user authentication, and follows a clean architecture.

## Features

- **Weather Information**: Displays current weather data using the OpenWeather API.
- **PRIM Data**: Retrieves and displays data from the PRIM API.
- **User Authentication**: Allows users to register and log in to access personalized features.
- **Dashboard**: A central hub for viewing weather and PRIM data through customizable widgets.
- **Clean Architecture**: Organized code structure separating concerns for better maintainability.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hermeole.git
   ```
2. Navigate to the project directory:
   ```
   cd hermeole
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the application:
   ```
   npm start
   ```

## API Integration

- **OpenWeather API**: Used for fetching weather data based on user location.
- **PRIM API**: Used for retrieving relevant data for users.

## Folder Structure

```
Hermeole
├── src
│   ├── api
│   ├── components
│   ├── navigation
│   ├── screens
│   ├── services
│   ├── domain
│   ├── utils
│   ├── types
│   └── App.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.