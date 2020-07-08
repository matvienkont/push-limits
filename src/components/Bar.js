import React, { Component } from 'react';
import {
    Dimensions,
    View, 
    StyleSheet,
    Text, 
    TouchableOpacity
} from "react-native"

import Canvas from "react-native-canvas";

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

    x_loc = Dimensions.get('window').width/2;
    y_loc = Dimensions.get('window').height/2;
    radius = 10;
    angle = 0;

handleCanvas = (canvas) => 
{
	if (canvas !== null) 
	{
			const ctx = canvas.getContext('2d');

				
			canvas.width  = Dimensions.get('window').width;
            canvas.height = Dimensions.get('window').height;

            var i = 0;
            for(i; i<21; i++)
            {
                var colour = '';
                if(i < this.props.progress)
                    colour = "#D99982"
                        else if ( i == this.props.progress || i == this.props.progress && i == 0)
                            colour = "#59524C"; 
                                else
                                    colour = "#FFF"
                    
                ctx.beginPath();
                ctx.moveTo(this.x_loc, this.y_loc);
                for (var n = 0; n < 10; n++) 
                {
                    ctx.lineWidth = 15;
                    ctx.strokeStyle = colour;
                    this.radius += 0.05;
                    this.angle += ((Math.PI * 2) / 53);
                    
                    this.x_loc = this.x_loc + this.radius * Math.cos(this.angle);
                    this.y_loc = this.y_loc + this.radius * Math.sin(this.angle);
                    ctx.lineTo(this.x_loc, this.y_loc);
                }
                    ctx.stroke();
                this.x_loc = this.x_loc + this.radius * Math.cos(this.angle);
                this.y_loc = this.y_loc + this.radius * Math.sin(this.angle);
            
            }
    }
    
};


borderMargin = () => 
{
    return { 
        position: "absolute",
        backgroundColor: "rgba(52, 52, 52, 0)",
        marginLeft: 20
    }
};

renderText = () =>
{
    this.setState((state) =>
        { return { spiral: '' }});  

    var margin = 0;
    
        var returnedCanvas = 
            <View style={this.borderMargin()} 
                    onLayout={(event) => { var {x, y, width, height} = event.nativeEvent.layout;}}>
                        <Canvas key={"habit"} ref={this.handleCanvas}/>
            </View>;
    
    this.setState((state) => { return { spiral: returnedCanvas }}, () => console.log(this.state.spiral));
    
}
    
componentDidMount()
{
    this.renderText();
}


data = () => {
    if(this.state.spiral)
        return this.state.spiral;
    else 
        return <Text>LOADING</Text>
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
    button: {
    }
});

export default Bar;