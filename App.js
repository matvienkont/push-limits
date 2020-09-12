import React from "react";

import {
  StyleSheet,
  Button
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HabitScreen from "./src/Screens/HabitScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import initialiseNotifications from "./src/helpers/notifications/initialiseNotifications";
import scheduleNotifications from "./src/helpers/notifications/scheduleNotifications";

import PushNotification from "react-native-push-notification";
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator();

class App extends React.Component 
{
	constructor(props) {
	
		super(props);
		
		initialiseNotifications();

		this.state = 
		{
            counter: 0,
		}
    }

	counter = 0;
	getCounter = (childCounter) => {
		this.counter = childCounter;
	}

	UNSAFE_componentWillMount () 
	{
		PushNotification.cancelAllLocalNotifications();
		
		scheduleNotifications();
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
												backgroundColor: '#D9CEC1',
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
			<FlashMessage position="top" />	
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
