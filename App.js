import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/Login";
import PromptScreen from "./screens/Prompt";
import CameraScreen from "./screens/Prompt/camera";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./contexts/auth.context";

const Stack = createNativeStackNavigator();

function PublicStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: "white",
        headerTitleStyle: { color: Colors.primary800, fontSize: 16 },
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function PrivateStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary100 },
        headerTintColor: "white",
        headerTitleStyle: { color: Colors.primary800, fontSize: 16 },
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Hello :)" component={PromptScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <PrivateStack /> : <PublicStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
