import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { auth, db } from "../config/firebaseConfig";

export const SignInForm = () => {
  const [step, setStep] = useState("signIn"); // or "signUp"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Only used in signUp
  const [loading, setLoading] = useState(false);

  const toggleStep = () =>
    setStep((prev) => (prev === "signIn" ? "signUp" : "signIn"));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (step === "signIn") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        Toast.show({ type: "success", text1: "Signed in successfully!" });
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
        const user = userCredential.user;
        Toast.show({ type: "success", text1: "Account created successfully!" });
        await setDoc(
          doc(db, "users", user.uid), // Store user data in Firestore
          {
            name: name.trim(),
            email: email.trim(),
            createdAt: new Date().toISOString(),
          }
        );
        console.log("User registered and data saved!");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Authentication Error",
        text2: error.message,
      });
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {step === "signIn" ? "Sign In" : "Sign Up"}
      </Text>

      {step === "signUp" && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#aaa"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <Button
        title={
          loading
            ? step === "signIn"
              ? "Signing In..."
              : "Signing Up..."
            : step === "signIn"
            ? "Sign In"
            : "Sign Up"
        }
        onPress={handleSubmit}
        disabled={loading}
      />

      <TouchableOpacity onPress={toggleStep} style={styles.toggle}>
        <Text style={styles.toggleText}>
          {step === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff10",
    borderColor: "#ffffff20",
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    backdropFilter: "blur(10px)",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#fff",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  toggle: {
    marginTop: 12,
    alignItems: "center",
  },
  toggleText: {
    color: "#ccc",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
