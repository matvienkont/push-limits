import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Button
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HabitScreen from './src/Screens/HabitScreen';
import HomeScreen from './src/Screens/HomeScreen';

const Stack = createStackNavigator();

class App extends Component 
{
	constructor(props) {
    super(props);
        this.state = {
            counter: 0,
        }
    }

	counter = 0;
	getCounter = (childCounter) => {
		this.counter = childCounter;
	}

	render () {
		return (
			<>
			<NavigationContainer>
				{/*<View style={styles.border}>
				<StatusBar backgroundColor="#D9CEC1"  barStyle="dark-content" />*/}
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Habit" options={{
										 	title: 'Habit',
											headerStyle: {
												backgroundColor: '#D9CEC1'
											},
											headerTitleAlign: "center",	
											headerTintColor: '#fff',
											headerStatusBarHeight: 0,
											headerTitleStyle: {
												fontWeight: 'bold',
												fontFamily: "monospace", 
												fontSize: 20
											}
											}}>
					{ (props) => <HabitScreen {...props} getCounter={this.getCounter.bind(this)} /> }
					</Stack.Screen> 
					<Stack.Screen name="Home" options={{
										 	title: 'Home',
											headerStyle: {
												backgroundColor: '#D9CEC1'
											},
											headerTitleAlign: "center",	
											headerTintColor: '#fff',
											headerStatusBarHeight: 0,
											headerTitleStyle: {
												fontWeight: 'bold',
												fontFamily: "monospace", 
												fontSize: 20
											},
									        headerRight: () => (
												<Button
												onPress={() => this.getInputState(true)}
												title="Info"
												color="#fff"
												/>
											)
											}}>
						{(props) => <HomeScreen {...props} />}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>	
			</>
		);
	}
  
};

const styles = StyleSheet.create({
	border: {
		flex:1,
		backgroundColor: "#D9CEC1",
	}
});

export default App;
