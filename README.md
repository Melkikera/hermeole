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

## Run On Android (Expo)

### Prerequisites

- Android Studio installed (SDK, platform tools, and emulator).
- An Android emulator running, or a physical Android device connected with USB debugging enabled.

### Build And Run

From the project root, run:

```
npx expo run:android
```

This command builds the native Android app, installs it on the selected device/emulator, and starts Metro.

### Troubleshooting

- `INSTALL_FAILED_INSUFFICIENT_STORAGE`: your emulator/device is out of space.
   - Free space on the emulator, or wipe emulator user data and start it again.
   - Then rerun:

```
npx expo run:android
```

- `No Android connected device found` or emulator not detected:
   - Start an emulator in Android Studio (`Device Manager` -> `Play` on an AVD).
   - Confirm ADB sees a device:

```
adb devices
```

   - If no emulator exists yet, list/create one from Android Studio (Device Manager), then boot it.
   - If ADB is stuck, restart it:

```
adb kill-server
adb start-server
adb devices
```

   - Once a device appears, rerun:

```
npx expo run:android
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