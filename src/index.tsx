import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createTheme,
  darkColors,
  lightColors,
  ThemeProvider,
} from '@rneui/themed';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabs } from './BottomTabs/BottomTabs';
import { useTranslation } from './hooks';
import { RootSiblingParent } from 'react-native-root-siblings';
import { routeScreenRegister } from './routes/stackRegister';
const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios,
    }),
  },
});
const Stack = createNativeStackNavigator();
export function App() {
  const { t } = useTranslation();
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                // headerTintColor: "white",
                headerShown: false,
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
              {routeScreenRegister
                .getRegisteredScreen()
                .map(({ routeName, component }) => {
                  return (
                    <Stack.Screen
                      key={routeName}
                      name={routeName}
                      component={component}
                      options={{
                        title: t(routeName),
                        headerShown: true,
                      }}
                    />
                  );
                })}
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}
