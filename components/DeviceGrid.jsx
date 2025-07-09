import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function DeviceGrid({
  devices,
  selectedRoom,
  temperatureUnit,
  onToggle,
  onChangeTemperature,
}) {
  const convertTemperatureInValue = (value) => {
    if (!value || !value.includes("°C")) return value;

    if (temperatureUnit === "F") {
      const celsius = parseInt(value.replace("°C", ""));
      const fahrenheit = Math.round((celsius * 9) / 5 + 32);
      return `${fahrenheit}°F`;
    }
    return value;
  };

  const filteredDevices = selectedRoom
    ? devices.filter((d) => d.room === selectedRoom)
    : devices;

  const title = selectedRoom ? `${selectedRoom} Devices` : "All Devices";

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.deviceCard,
        item.isOn ? styles.deviceOn : styles.deviceOff,
      ]}
    >
      <Text style={styles.deviceIcon}>{item.icon || "🔌"}</Text>
      <Text style={styles.deviceName}>{item.name}</Text>

      <View style={{ alignItems: "center", marginBottom: 10 }}>
        {/* <Text style={styles.deviceValue}>{item.value}</Text> */}

        {["Refrigerator", "Thermostat", "AC"].includes(item.name) &&
          item.isOn && (
            <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
              <TouchableOpacity
                onPress={() => onChangeTemperature(item.id, "down")}
                style={item.isOn ? styles.tempBtn : styles.tempBtnDisabled}
              >
                <Text style={styles.tempBtnText}>-</Text>
              </TouchableOpacity>
              {item.value && (
                <Text style={styles.deviceValue}>
                  {convertTemperatureInValue(item.value)}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => onChangeTemperature(item.id, "up")}
                style={item.isOn ? styles.tempBtn : styles.tempBtnDisabled}
              >
                <Text style={styles.tempBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
      <TouchableOpacity
        style={[styles.toggleButton, item.isOn ? styles.onBtn : styles.offBtn]}
        onPress={() => onToggle(item.id)}
      >
        <Text style={styles.toggleBtnText}>{item.isOn ? "ON" : "OFF"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {filteredDevices.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emoji}>🏠</Text>
          <Text style={styles.emptyText}>
            {selectedRoom
              ? `No devices in ${selectedRoom}`
              : "No devices found"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredDevices}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  deviceCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    marginHorizontal: 6,
    alignItems: "center",
  },
  deviceOn: {
    backgroundColor: "rgba(59,130,246,0.1)",
    borderColor: "rgba(96,165,250,0.7)",
  },
  deviceOff: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.2)",
  },
  deviceIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  deviceName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  deviceValue: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 10,
  },
  toggleButton: {
    width: "100%",
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  onBtn: {
    backgroundColor: "#3B82F6",
  },
  offBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  toggleBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
  },
  tempBtn: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tempBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tempBtnDisabled: {
    color: " rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
