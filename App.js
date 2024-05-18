import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import RegisterUser from './src/screens/RegisterUser';
import UpdateUser from './src/screens/UpdateUser';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterUser} />
        <Stack.Screen name="Update" component={UpdateUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;