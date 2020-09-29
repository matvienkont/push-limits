import React from 'react';
import { View } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import CanvasSpiral from "../canvasHandler/canvasLogic";

export default class Bar extends React.Component 
{
    constructor(props) {
    super(props);
        this.state = {
            spiral: '', 
            counter: 0
        }
    }

    renderText = () =>
    {        
        var returnedCanvas = <CanvasSpiral counter={this.state.counter}/>;

        this.setState((state) => { return { spiral: returnedCanvas }});    
    }
    
    getHabitFromStorage = async () => 
    {
        var habit = await AsyncStorage.getItem(this.props.habitId);
        habit = JSON.parse(habit);
        this.setState({ counter: habit.progress }, () => this.renderText())
    }
    
    componentDidMount()
    {
        this.getHabitFromStorage();
    }
    
    renderBars = () => 
    {
        if(this.state.spiral)
            return this.state.spiral;
    }
 
    render() {
        return (
            <>
            <View>
                {this.renderBars()}
            </View>
            </>
        );
    }
}