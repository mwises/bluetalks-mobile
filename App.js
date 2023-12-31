import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { AuthProvider } from './src/utils/authContext';
import MyStack from './src/navigation/stack';
import Toast from 'react-native-toast-message';

export default function App() {

  const [fontsLoaded] = useFonts({
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={'#0671E0'} />
        <MyStack />
      </NavigationContainer>
      <Toast />
    </AuthProvider>
  );
};

