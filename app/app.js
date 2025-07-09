import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SignInForm } from "../components/SignInForm";
import { SmartHomeApp } from "../components/SmartHomeApp";
import { auth } from "../config/firebaseConfig";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {user ? (
        <SmartHomeApp />
      ) : (
        <ScrollView contentContainerStyle={styles.unauthWrapper}>
          <ImageBackground
            source={require("../assets/images/signInBg.jpg")}
            style={{ flex: 1, paddingTop: StatusBar.currentHeight }}
            resizeMode="cover"
          >
            <View style={styles.header}>
              <Text style={styles.headerText}>Smart Home</Text>
            </View>
            <View style={styles.main}>
              <View style={styles.contentBox}>
                <View style={styles.titleBox}>
                  <Text style={styles.mainTitle}>🏠 Smart Home</Text>
                  <Text style={styles.subTitle}>
                    Sign in to control your devices
                  </Text>
                </View>
                <SignInForm />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      )}
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  unauthWrapper: {
    flexGrow: 1,
    justifyContent: "flex-start",
    backgroundColor: "#1e3a8a",
  },
  header: {
    paddingTop: StatusBar.currentHeight,
    height: 64 + (StatusBar.currentHeight || 0),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  contentBox: {
    width: "100%",
    maxWidth: 400,
  },
  titleBox: {
    marginBottom: 24,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
});
