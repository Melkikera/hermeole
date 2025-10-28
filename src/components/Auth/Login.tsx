import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { loginUser } from '../../services/authService';
import { useNavigation } from '@react-navigation/native';

const Login = () => {    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [key, onChangeKey] = useState('');
    const [value, onChangeValue] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const handleLogin = async () => {
        try {
            await loginUser(email, password);                        
            console.log("Logged in user:", email.split('@')[0]);            
            navigation.navigate('Dashboard' as never);            
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (  
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />            
            <Button title="Login" onPress={() => {
                handleLogin();
                onChangeKey('Your key here');
                onChangeValue('Your value here');
                }} />
            <Button title="Register" onPress={() => navigation.navigate('Register' as never)}  />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    error: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default Login;