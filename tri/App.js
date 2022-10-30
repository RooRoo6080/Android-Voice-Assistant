import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import { Provider, MD3LightTheme as DefaultTheme } from "react-native-paper";
import Bot from "./pages/Bot";

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: "#ffffff",
      secondary: "#137000",
      background: "#121212",
    },
  };

  return (
    // <View style={{ backgroundColor: "#121212" }}>
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: false
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Bot" component={Bot} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
