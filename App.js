import React,{useEffect} from 'react'
import {Text} from 'react-native'
import {NavigationContainer, useNavigation} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatList from './screens/ChatList'
import Chat from './screens/Chat'
import Settings from './screens/Settings'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'
import { Provider } from 'react-native-paper';
import { auth } from './firebase';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator=()=>{
  const navi= useNavigation()
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(!user){
        navi.navigate('SignUp')
      }
    })
    
  },[])
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'ChatList') {
          iconName = focused
            ? 'chatbubbles-sharp'
            : 'chatbubbles-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4DAA9C',
      tabBarInactiveTintColor: 'gray',
    })}
    >
      <Tab.Screen name='ChatList' component={ChatList} options={{headerTitleAlign:'center'}}/>
      <Tab.Screen name='Settings' component={Settings} options={{headerTitleAlign:'center'}}/>
    </Tab.Navigator>
  )
}

const App=()=>{
  return(
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={TabNavigator} options={{headerShown:false,headerTitleAlign:'center'}}/>
          <Stack.Screen name='Chat' component={Chat} options={{headerTitleAlign:'center'}} />
          <Stack.Screen name='SignUp' component={SignUp} options={{presentation:'fullScreenModal',headerBackVisible:false,headerTitleAlign:'center'}}/>
          <Stack.Screen name='SignIn' component={SignIn} options={{presentation:'fullScreenModal',headerBackVisible:false,headerTitleAlign:'center'}}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  )
}

export default App;
