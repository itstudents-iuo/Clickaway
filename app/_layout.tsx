import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="LoginActivity" options={{ headerShown: true }} />
          <Stack.Screen name="DriverLoginActivity" options={{ headerShown: true }} />
          <Stack.Screen name="VendorLoginActivity" options={{ headerShown: false }} />
          <Stack.Screen name="vendors/index" options={{ headerShown: true }} />
          <Stack.Screen name="vendors/product" options={{ headerShown: true }} />
          <Stack.Screen name="vendors/transporter" options={{ headerShown: true }} />
          <Stack.Screen name="vendors/payment" options={{ headerShown: true }} />
          <Stack.Screen name="vendors/payment_webview" options={{ headerShown: true }} />


          <Stack.Screen name="drivers/index" options={{ headerShown: true }} />
          <Stack.Screen name="drivers/dashboard" options={{ headerShown: true }} />
          <Stack.Screen name="drivers/timeline" options={{ headerShown: true }} />
          <Stack.Screen name="drivers/withdraw-wallet" options={{ headerShown: true }} />

          <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
