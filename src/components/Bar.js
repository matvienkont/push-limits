import React from 'react';
import {
    View, 
    StyleSheet,
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import CanvasSpiral from "./canvasHandler/canvasLogic2";

class Bar extends React.Component 
{
    constructor(props) {
    super(props);
        this.state = {
            spiral: '', 
            counter: 0
        }
    }

    borderMargin = () => 
    {
        return { 
            position: "absolute",
            backgroundColor: "rgba(52, 52, 52, 0)",
            width: "100%"
        }
    };

    renderText = () =>
    {        
            var returnedCanvas = 
                <View style={this.borderMargin()} 
                        onLayout={(event) => { var {x, y, width, height} = event.nativeEvent.layout;}}>
                        <View style={styles.canvasWrapper} >
                            <CanvasSpiral counter={this.state.counter}/>
                        </View>
                </View>
        
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
    
    data = () => 
    {
        if(this.state.spiral)
            return this.state.spiral;
    }
 
    render() {
        return (
            <>
            <View>
                {this.data()}
            </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
	border: {
        marginLeft: 60,
        position: "absolute",
		backgroundColor: "rgba(52, 52, 52, 0)",
		borderWidth: 5,
	},
    canvasWrapper: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Bar;