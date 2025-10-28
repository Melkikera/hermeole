import React, { use, useContext } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardScreen = () => {        
    return (                    
        <View style={styles.container}>            
            <Dashboard />
        </View>        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
});

export default DashboardScreen;