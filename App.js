import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FONTS } from './constants/fonts';
import { useCallback } from 'react';
import { Login, Signup, Welcome, Home, Quiz, Questions, Crossword, CrosswordTheme, Hangman, WordGuess } from './screens';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [
    fontsLoaded
  ]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='Welcome'
          >
            <Stack.Screen name='Welcome' component={Welcome}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Signup' component={Signup}/>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name="CrosswordTheme" component={CrosswordTheme} />
            <Stack.Screen name="Crossword" component={Crossword} />
            <Stack.Screen name="Hangman" component={Hangman} />
            <Stack.Screen name="WordGuess" component={WordGuess} />
            <Stack.Screen name='Quiz' component={Quiz}/>
            <Stack.Screen name='Questions' component={Questions}/>
          </Stack.Navigator>
        </NavigationContainer>

      </SafeAreaProvider>
    </Provider>
  );
}