import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from '../components/Auth/Login';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
    return (        
        <View style={styles.container}>
            <Login />
        </View>        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default LoginScreen;