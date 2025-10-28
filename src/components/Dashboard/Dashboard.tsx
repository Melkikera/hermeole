import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import WeatherWidget from './widgets/WeatherWidget';
import PrimWidget from './widgets/PrimWidget';
import * as SecureStore from 'expo-secure-store';

async function getValueFor(key : string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your name 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

const Dashboard = () => {     
    return (        
        <View style={styles.container}>
            <Text onPress={() => getValueFor('name')}>Welcome, (tap to see stored name)</Text>
            <WeatherWidget />
            <PrimWidget />
        </View>    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
});

export default Dashboard;