import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from '../hooks';
import { routes as route } from '../routes';
import { TabBarIcon } from './TabBarIcon';
const Tab = createBottomTabNavigator();
export function BottomTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={t(route.welcome.name)}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={route.welcome.name}
        component={route.welcome.component}
        options={{
          title: t(route.welcome.name),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? 'tablet-landscape' : 'tablet-landscape-outline'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={t(route.home.name)}
        component={route.home.component}
        options={{
          title: t(route.home.name),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} />
          ),
        }}
      />
      <Tab.Screen
        name={t(route.settings.name)}
        component={route.settings.component}
        options={{
          title: t(route.settings.name),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
