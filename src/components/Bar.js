import React from 'react';
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
import { dynamicSpiralParameters } from "../helpers/spiralParameters"

class Bar extends React.Component 
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
  
        const spiralParams = dynamicSpiralParameters(screenWidth, screenHeight)

        if (canvas !== null) 
        {
                const ctx = canvas.getContext('2d');

                canvas.width  = screenWidth;
                canvas.height = screenHeight;

                /*ctx.fillStyle = "blue";
                ctx.fillRect(0, 0, canvas.width, canvas.height);*/

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
                    ctx.moveTo(spiralParams.x_loc, spiralParams.y_loc);
                    for (var n = 0; n < 10; n++) 
                    {
                        ctx.lineWidth = spiralParams.lineWidth;
                        ctx.strokeStyle = colour;
                        spiralParams.radius += 0.05;
                        spiralParams.angle += ((Math.PI * 2) /53);
                        
                        spiralParams.x_loc = spiralParams.x_loc + spiralParams.radius * Math.cos(spiralParams.angle);
                        spiralParams.y_loc = spiralParams.y_loc + spiralParams.radius * Math.sin(spiralParams.angle);
                        ctx.lineTo(spiralParams.x_loc, spiralParams.y_loc);
                    }
                        ctx.stroke();
                    spiralParams.x_loc = spiralParams.x_loc + spiralParams.radius * Math.cos(spiralParams.angle);
                    spiralParams.y_loc = spiralParams.y_loc + spiralParams.radius * Math.sin(spiralParams.angle);
                
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