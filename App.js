import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { store } from './src/store';
import CategoriesScreen from './src/screens/StackScreen/CategoriesScreen';
import RecipieInfoScreen from './src/screens/StackScreen/RecipieInfoScreen';
import RecipiesScreen from './src/screens/StackScreen/RecipiesScreen';
import HomeScreen from './src/screens/StackScreen/HomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabHome() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="firstTabPage" component={FirstTabScreen}/>
      <Tab.Screen name="secondTabPage" component={SecondTabScreen}/>
    </Tab.Navigator>
  )
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="TabStackScreen" component={TabHome} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Recipies" component={RecipiesScreen}/>
        <Stack.Screen name="Recipie" component={RecipieInfoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;