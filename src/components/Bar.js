import React, { Component } from 'react';
import {
    Dimensions,
    View, 
    StyleSheet,
    Text, 
    TouchableOpacity
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import Canvas from "react-native-canvas";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { normalize } from "../helpers/normalize"

class Bar extends Component 
{
    constructor(props) {
    super(props);
        this.state = {
            spiral: '', 
            counter: 0
        }
    }

    propsCounter = this.props.progress;

    

    handleCanvas = (canvas) => 
    {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        

        var shiftFactor = 30;
        var radius = 9;
        var angle = 0;
        var lineWidth = 13;


        if(screenWidth < 361)
        {
            radius = 8;
            var lineWidth = 11;
        } else if (screenWidth < 380)
                {
                    radius = 8.5;
                    var lineWidth = 12;
                    shiftFactor = 33;
                } else if (screenWidth < 400)
                    {
                        radius = 9;
                        var lineWidth = 13;
                        shiftFactor = 37
                    } else 
                        {
                            radius = 10;
                            var lineWidth = 15;
                            shiftFactor = 40;
                        }

        var x_loc = (screenWidth+shiftFactor)/2;
        var y_loc = screenHeight/2;

        if (canvas !== null) 
        {
                const ctx = canvas.getContext('2d');

                    
                canvas.width  = screenWidth;
                canvas.height = screenHeight;

                var i = 0;
                for(i; i<21; i++)
                {
                    var colour = '';
                    if(i < this.state.counter)
                        colour = "#D99982"
                            else if ( i == this.state.counter || i == this.state.counter && i == 0)
                                colour = "#59524C"; 
                                    else
                                        colour = "#FFF"
                        
                    ctx.beginPath();
                    ctx.moveTo(x_loc, y_loc);
                    for (var n = 0; n < 10; n++) 
                    {
                        ctx.lineWidth = 11;
                        ctx.strokeStyle = colour;
                        radius += 0.05;
                        angle += ((Math.PI * 2) /53);
                        
                        x_loc = x_loc + radius * Math.cos(angle);
                        y_loc = y_loc + radius * Math.sin(angle);
                        ctx.lineTo(x_loc, y_loc);
                    }
                        ctx.stroke();
                    x_loc = x_loc + radius * Math.cos(angle);
                    y_loc = y_loc + radius * Math.sin(angle);
                
                }
        }
        
    };


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

        var margin = 0;
        
            var returnedCanvas = 
                <View style={this.borderMargin()} 
                        onLayout={(event) => { var {x, y, width, height} = event.nativeEvent.layout;}}>
                        <View style={styles.canvasWrapper} >
                            <Canvas key={"habit"} ref={this.handleCanvas}/>
                        </View>
                </View>;
        
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
        alignItems: "center"
    }
});

export default Bar;