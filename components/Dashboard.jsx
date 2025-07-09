import * as Location from "expo-location";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../config/firebaseConfig";

export function Dashboard({ temperatureUnit, activeCounts, devices }) {
  const [greeting, setGreeting] = useState("");
  const [weather, setWeather] = useState(null);
  const [userName, setUserName] = useState("");
  console.log("Devices and activecounts:------->", devices, activeCounts);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, []);
  console.log("UserName", userName);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "bb0b764f7e110d2504298f248ed60e5b";
      const fallbackCity = "London";

      const getWeatherByCoords = async (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const json = await res.json();
        console.log("Weather data:", json);
        console.log("Fetching weather data from:", url);
        return {
          temperature: json.main.temp,
          condition: json.weather[0].main,
        };
      };

      const getFallbackWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${fallbackCity}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        const json = await res.json();
        setWeather({
          temperature: json.main.temp,
          condition: json.weather[0].main,
        });
      };

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.warn("Location permission not granted");
          return getFallbackWeather();
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log("Current location:", latitude, longitude);
        const weatherData = await getWeatherByCoords(latitude, longitude);
        setWeather(weatherData);
      } catch (error) {
        console.error("Weather location error:", error);
        getFallbackWeather();
      }
    };

    fetchWeather();
  }, []);

  const convertTemperature = (temp) => {
    if (temperatureUnit === "F") return Math.round((temp * 9) / 5 + 32);
    return Math.round(temp);
  };

  function getWeatherEmoji(condition) {
    switch (condition) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
      case "Drizzle":
        return "🌧️";
      case "Thunderstorm":
        return "⛈️";
      case "Snow":
        return "❄️";
      case "Mist":
      case "Fog":
      case "Haze":
        return "🌫️";
      default:
        return "🌈";
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.centerText}>
        <Text style={styles.greeting}>
          {greeting} {userName} 💫
        </Text>
        <Text style={styles.subGreeting}>Welcome to your smart home</Text>
      </View>

      <View style={styles.cardsContainer}>
        <ImageBackground
          source={require("../assets/images/weatherBg.jpg")}
          style={{
            width: "100%",
            height: 200,
            justifyContent: "flex-end",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weather</Text>
            <Text style={styles.cardValue}>
              {weather
                ? `${convertTemperature(
                    weather.temperature
                  )}°${temperatureUnit}`
                : "--°"}
            </Text>

            <Text style={styles.cardSub}>
              {weather?.condition
                ? `${getWeatherEmoji(weather.condition)} ${weather.condition}`
                : "Loading..."}
            </Text>
          </View>
        </ImageBackground>

        <ImageBackground
          source={require("../assets/images/activeDevicesBg.jpg")}
          style={{
            width: "100%",
            height: 200,
            justifyContent: "flex-end",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Devices</Text>
            <Text style={styles.cardValue}>
              {activeCounts["All"] || 0} / {devices.length}
            </Text>
            <Text style={styles.cardSub}>Devices online</Text>
          </View>
        </ImageBackground>

        <ImageBackground
          source={require("../assets/images/energyUsageBg.jpg")}
          style={{
            width: "100%",
            height: 200,
            justifyContent: "flex-end",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Energy Usage</Text>
            {/* <Text style={styles.cardValue}>{energyUsage}%</Text> */}
            <Text style={styles.cardSub}>Of capacity</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20, paddingHorizontal: 16 },
  centerText: { alignItems: "center", marginBottom: 24 },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subGreeting: { fontSize: 14, color: "#ccc" },
  cardsContainer: { gap: 16 },
  card: {
    padding: 16,
    borderRadius: 12,
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  cardTitle: { fontSize: 14, color: "white", fontWeight: "bold" },
  cardValue: { fontSize: 24, fontWeight: "bold", color: "white" },
  cardSub: { fontSize: 12, color: "white", fontWeight: "bold" },
});
