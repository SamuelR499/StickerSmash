import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import RegisterUser from './src/screens/RegisterUser';
import UpdateUser from './src/screens/UpdateUser';
import ViewAllUser from './src/screens/ViewAllUser';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Registro de Usuários',
            headerStyle: {
              backgroundColor: '#e5272c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            },
            headerTitleAlign:'center'
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Cadastro de cliente',
            headerStyle: {
              backgroundColor: '#e5272c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            },
            headerTitleAlign:'center'
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: 'Atualizar Usuário',
            headerStyle: {
              backgroundColor: '#e5272c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            },
            headerTitleAlign:'center'
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: 'Visualizar Todos os Usuários',
            headerStyle: {
              backgroundColor: '#e5272c',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            },
            headerTitleAlign:'center'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;