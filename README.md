# 🔌 Smart Home Control Panel

A modern and interactive Smart Home mobile application built using **React Native** and **Firebase**. This app allows users to control devices room-wise, view weather updates, and monitor energy usage in a clean, responsive UI.

---

## 📱 Features

### 🏠 Dashboard

- Dynamic greeting based on time of day (Good Morning, Good Evening)
- Displays current temperature from [OpenWeatherMap API](https://openweathermap.org/api)
- Mocked energy usage summary
- Visually appealing UI inspired by modern smart home apps

### 🛋️ Room Management

- Horizontally scrollable room selector
- Each card displays:
  - Room name
  - Active device count
  - Background image/icon

### 💡 Device Control

- Room-wise device grid
- Toggle switch to turn devices on/off
- Temperature control for AC/Refrigerator/Thermostat devices
- Smooth UI feedback and transitions

---

## 🛠️ Tech Stack

| Layer      | Tech Used                     |
| ---------- | ----------------------------- |
| Frontend   | React Native                  |
| Auth       | Firebase Authentication       |
| Database   | Firestore                     |
| State Mgmt | useState, Context API         |
| API        | OpenWeatherMap (Live Weather) |
| Styling    | StyleSheet, custom components |

---

## 📂 Project Structure

```bash
my-app/
│
├── assets/                # Images, fonts, splash icons
├── components/            # Reusable UI components
├── config/                # Firebase & API configs
├── screens/               # App screens (Dashboard, Rooms)
├── App.js                 # Entry point
├── README.md              # Project documentation
└── ...
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Smart-Home-App-RN.git
   cd Smart-Home-App-RN
   ```
   npm install
   npx expo start

NOTE: This app was developed solely for evaluation purposes and is not intended for production use.

Happy Coding 💫💫💫
