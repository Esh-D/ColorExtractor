import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Home = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', borderRadius: '20px', borderStyle: 'solid', borderWidth: '8px', borderColor: '#FFAF87', padding: '20px', backgroundColor: "#3C7A89"}}>
                <Text style={styles.heading1}>Welcome to the</Text>
                <Text style={styles.heading2}>Colour Syringe</Text>
            </View>
            <Icon name="eyedropper" size={140} color="#900" />
            <Button style={styles.button} icon="arrow-right" mode="contained" buttonColor="#3C7A89" onPress={() => {navigation.navigate('Image Selector')}}>
                Continue
            </Button>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ED6A5E',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    heading1: {
        fontSize: '20px',
        color: '#FFAF87',
    },
    heading2: {
        fontSize: '35px',
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        width: '200px',
    }
  });
  