import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


class Home extends Component 
{
    constructor(props)
    {
        super(props);
    }

    render () 
    {
        return 
        (
            <View> 
                <Text>Home components is working</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});

export default Home;