import * as React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './NavigationService';
import MyShifts from '../screen/MyShifts';
import AvailableShifts from '../screen/AvailableShifts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import COLORS from '../utils/colors';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface IProps { }

const App: React.FC<IProps> = (props: IProps) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            if (route.name === 'MyShifts') {
            } else if (route.name === 'AvailableShifts') {
            }
          },
          tabBarLabelStyle: { fontSize: 17, bottom: 12, },
          tabBarStyle: { backgroundColor: COLORS.textColor4 }
        })}
      >
        <Tab.Screen name="MyShifts" component={MyShifts} options={{ headerShown: false, title: 'My Shifts' }} />
        <Tab.Screen name="AvailableShifts" component={AvailableShifts} options={{ headerShown: false, title: 'Available Shifts' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
