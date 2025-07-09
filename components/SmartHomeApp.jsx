// Inside SmartHomeApp.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dashboard } from "./Dashboard";
import { DeviceGrid } from "./DeviceGrid";
import { RoomSelector } from "./RoomSelector";
import { SignOutButton } from "./ui/SIgnOutButton";

export function SmartHomeApp() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("C");

  const [devices, setDevices] = useState([
    {
      id: "1",
      name: "AC",
      icon: "❄️",
      room: "Living Room",
      isOn: false,
      value: "22°C",
    },
    {
      id: "2",
      name: "Thermostat",
      icon: "🌡️",
      room: "Living Room",
      isOn: true,
      value: "20°C",
    },
    {
      id: "3",
      name: "Light",
      icon: "💡",
      room: "Bedroom",
      isOn: true,
    },
    {
      id: "4",
      name: "Fan",
      icon: "🌀",
      room: "Living Room",
      isOn: false,
    },
    {
      id: "5",
      name: "Heater",
      icon: "🔥",
      room: "Bedroom",
      isOn: true,
    },
    {
      id: "6",
      name: "Security Camera",
      icon: "📷",
      room: "Bedroom",
      isOn: false,
    },
    {
      id: "7",
      name: "Smart Lock",
      icon: "🔒",
      room: "Living Room",
      isOn: true,
    },
    {
      id: "8",
      name: "Exhaust Fan",
      icon: "🌀",
      room: "Kitchen",
      isOn: false,
    },
    {
      id: "9",
      name: "Water Heater",
      icon: "🚿",
      room: "Bathroom",
      isOn: true,
    },
    {
      id: "10",
      name: "Light",
      icon: "💡",
      room: "Bathroom",
      isOn: false,
    },
    {
      id: "11",
      name: "Light",
      icon: "💡",
      room: "Garage",
      isOn: true,
    },
    {
      id: "12",
      name: "Fan",
      icon: "🌀",
      room: "Garage",
      isOn: false,
    },
    {
      id: "13",
      name: "Smart Lock",
      icon: "🔒",
      room: "Garage",
      isOn: true,
    },
    {
      id: "14",
      name: "Refrigerator",
      icon: "🧊",
      room: "Kitchen",
      isOn: true,
      value: "0°C",
    },
    {
      id: "15",
      name: "AC",
      icon: "❄️",
      room: "Bedroom",
      isOn: false,
      value: "20°C",
    },
    console.log("DevicesLength", devices.length),
  ]);

  useEffect(() => {
    const loadUnit = async () => {
      const saved = await AsyncStorage.getItem("temperatureUnit");
      if (saved === "F" || saved === "C") setTemperatureUnit(saved);
    };
    loadUnit();
  }, []);

  const toggleTemperatureUnit = async () => {
    const newUnit = temperatureUnit === "C" ? "F" : "C";
    setTemperatureUnit(newUnit);
    await AsyncStorage.setItem("temperatureUnit", newUnit);
  };

  const handleToggleDevice = (deviceId) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId ? { ...device, isOn: !device.isOn } : device
      )
    );
  };

  const handleChangeTemperature = (deviceId, direction) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) => {
        if (device.id === deviceId && device.value) {
          const isFahrenheit = temperatureUnit === "F";
          const current = parseInt(device.value);
          const newTemp = direction === "up" ? current + 1 : current - 1;
          return {
            ...device,
            value: `${newTemp}°${temperatureUnit}`,
          };
        }
        return device;
      })
    );
  };

  const activeDeviceCounts = devices.reduce((acc, device) => {
    if (device.isOn) {
      acc[device.room] = (acc[device.room] || 0) + 1;
      acc["All"] = (acc["All"] || 0) + 1;
    }
    return acc;
  }, {});

  const filteredDevices = selectedRoom
    ? devices.filter((device) => device.room === selectedRoom)
    : devices;

  const staticRooms = [
    {
      id: "1",
      name: "Living Room",
      icon: "🛋️",
      image: require("../assets/rooms/livingroom.jpg"),
    },
    {
      id: "2",
      name: "Bedroom",
      icon: "🛏️",
      image: require("../assets/rooms/bedroom.jpg"),
    },
    {
      id: "3",
      name: "Kitchen",
      icon: "🍽️",
      image: require("../assets/rooms/kitchen.jpg"),
    },
    {
      id: "4",
      name: "Bathroom",
      icon: "🚽",
      image: require("../assets/rooms/bathroom.jpg"),
    },
    {
      id: "5",
      name: "Garage",
      icon: "🚗",
      image: require("../assets/rooms/garage.jpg"),
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏠 Smart Home</Text>
        <View style={styles.headerControls}>
          <TouchableOpacity
            style={styles.unitBtn}
            onPress={toggleTemperatureUnit}
          >
            <Text style={styles.unitBtnText}>°{temperatureUnit}</Text>
          </TouchableOpacity>
          <SignOutButton />
        </View>
      </View>

      <View style={styles.content}>
        <Dashboard
          temperatureUnit={temperatureUnit}
          activeCounts={activeDeviceCounts}
          devices={devices}
        />
        <RoomSelector
          rooms={staticRooms}
          selectedRoom={selectedRoom}
          onRoomSelect={setSelectedRoom}
          activeCounts={activeDeviceCounts}
        />
        <DeviceGrid
          devices={filteredDevices}
          selectedRoom={selectedRoom}
          temperatureUnit={temperatureUnit}
          onToggle={handleToggleDevice}
          onChangeTemperature={handleChangeTemperature}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
  headerControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  unitBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  unitBtnText: {
    color: "#fff",
    fontWeight: "500",
  },
  content: {
    padding: 16,
    gap: 24,
  },
});
