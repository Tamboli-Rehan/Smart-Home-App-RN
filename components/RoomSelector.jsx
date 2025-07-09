import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function RoomSelector({
  rooms,
  selectedRoom,
  onRoomSelect,
  activeCounts,
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerText}>Rooms/Active devices</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        <TouchableOpacity
          onPress={() => onRoomSelect(null)}
          style={[
            styles.roomCard,
            selectedRoom === null && styles.selectedCard,
          ]}
        >
          <ImageBackground
            source={require("../assets/rooms/allrooms.jpg")}
            imageStyle={{ borderRadius: 16 }}
          >
            <View
              style={[styles.center, { backgroundColor: "rgba(0,0,0,0.4)" }]}
            >
              <View style={styles.center}>
                <Text style={styles.icon}>🏠</Text>
                <Text style={styles.roomName}>All Rooms</Text>
                <Text style={styles.chipText}>{activeCounts["All"] || 0}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {rooms.map((room) =>
          room.image ? (
            <TouchableOpacity
              key={room.id}
              onPress={() => onRoomSelect(room.name)}
              style={[
                styles.roomCard,
                selectedRoom === room.name && styles.selectedCard,
                { padding: 0, overflow: "hidden" },
              ]}
            >
              <ImageBackground
                source={room.image}
                style={{ flex: 1, justifyContent: "flex-end" }}
                imageStyle={{ borderRadius: 16 }}
              >
                <View
                  style={[
                    styles.center,
                    { backgroundColor: "rgba(0,0,0,0.4)", padding: 10 },
                  ]}
                >
                  <Text style={styles.icon}>{room.icon}</Text>
                  <Text style={styles.roomName}>{room.name}</Text>
                  <Text style={styles.chipText}>
                    {activeCounts[room.name] || 0}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={room.id}
              onPress={() => onRoomSelect(room.name)}
              style={[
                styles.roomCard,
                selectedRoom === room.name && styles.selectedCard,
              ]}
            >
              <View style={styles.center}>
                <Text style={styles.icon}>{room.icon}</Text>
                <Text style={styles.roomName}>{room.name}</Text>
                <Text style={styles.chipText}>
                  {activeCounts[room.name] || 0}
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  scroll: {
    flexDirection: "row",
  },
  roomCard: {
    minWidth: 120,
    padding: 16,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  selectedCard: {
    backgroundColor: "rgba(59,130,246,0.2)",
    borderColor: "#3b82f6",
    transform: [{ scale: 1 }],
  },
  center: {
    alignItems: "center",
  },
  icon: {
    fontSize: 28,
    marginBottom: 6,
  },
  roomName: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  chipText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});
