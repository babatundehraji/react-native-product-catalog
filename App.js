import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProductListing from './screens/ProductListing/Index';
import ProductDetail from './screens/productDetails/Index';
import Favorite from './screens/favourites/Index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import ProductContext from './context';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{
        title: "Product List"
      }} name="ProductListing" component={ProductListing} />
      <Tab.Screen options={{
        title: "Favorite"
      }} name="Favorite" component={Favorite} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <ProductContext>
      <View style={styles.container}>
        <StatusBar style='auto' />
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{
            headerStyle : {
              backgroundColor: "#fff"
            },
            contentStyle: {
              backgroundColor: "#220577dd"
            }
          }}
          >
            <Stack.Screen options={{
              headerShown: false
            }} name="BottomTabs" component={BottomTabs}></Stack.Screen>
            <Stack.Screen options={{
              title: "Product Details"
            }} name="ProductDetail" component={ProductDetail}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ProductContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
