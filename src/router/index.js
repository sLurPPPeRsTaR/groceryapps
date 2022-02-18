import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, Splash} from '../Pages';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator
      initialRouteName="Pages_Splash"
      // initialRouteName="Pages_Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Pages_Home" component={Home} />
      <Stack.Screen name="Pages_Login" component={Login} />
      <Stack.Screen name="Pages_Splash" component={Splash} />
    </Stack.Navigator>
  );
}
