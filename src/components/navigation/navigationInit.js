import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HabitScreen from "../../Screens/HabitScreen";
import HomeScreen from "../../Screens/HomeScreen";

const Stack = createStackNavigator();

export default class Navigation extends React.Component
{
    render ()
    { 
        return (
            <NavigationContainer>
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
                        { (props) => <HabitScreen {...props} getCounter={this.props.getCounter} /> }
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
                                }
                                }}>
                            {(props) => <HomeScreen {...props} />}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
        );
    }
}