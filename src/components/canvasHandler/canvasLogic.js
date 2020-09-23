import { dynamicSpiralParameters } from "../../helpers/spiralParameters";
import { Dimensions } from "react-native";
import React from "react";
import Canvas from "react-native-canvas";

export default class CanvasSpiral extends React.Component
{
    position = () => 
    {
        var colour = '';
        if(this.i < this.props.counter)
            colour = "#D99982"
                else if (this.i == this.props.counter || this.i == this.props.counter && this.i == 0)
                    colour = "#59524C"; 
                        else
                            colour = "#FFF"

        this.ctx.beginPath();
        this.ctx.moveTo(this.spiralParams.x_loc, this.spiralParams.y_loc);
        for (var n = 0; n < 10; n++) 
        {
            this.ctx.lineWidth = this.spiralParams.lineWidth;
            this.ctx.strokeStyle = colour;
            this.spiralParams.radius += 0.05;
            this.spiralParams.angle += ((Math.PI * 2) /53);
            
            this.spiralParams.x_loc = this.spiralParams.x_loc + this.spiralParams.radius * Math.cos(this.spiralParams.angle);
            this.spiralParams.y_loc = this.spiralParams.y_loc + this.spiralParams.radius * Math.sin(this.spiralParams.angle);
            this.ctx.lineTo(this.spiralParams.x_loc, this.spiralParams.y_loc);
            
        }
            this.ctx.stroke();
        this.spiralParams.x_loc = this.spiralParams.x_loc + this.spiralParams.radius * Math.cos(this.spiralParams.angle);
        this.spiralParams.y_loc = this.spiralParams.y_loc + this.spiralParams.radius * Math.sin(this.spiralParams.angle);
        this.i++;

        if(this.i > 21)
        {
            cancelAnimationFrame();
        } else 
        {
            requestAnimationFrame(()=>this.position());
        }
    }

    ctx = {};
    screenWidth = Dimensions.get('window').width;
    screenHeight = Dimensions.get('window').height;
    spiralParams = dynamicSpiralParameters(this.screenWidth, this.screenHeight)
    i = 0;

    handleCanvas = (canvas) => 
    {
        if (canvas !== null) 
        {
            this.ctx = canvas.getContext('2d');
                canvas.width  = this.screenWidth;
                canvas.height = this.screenHeight;

                this.position();
        }
        
    };

    render ()
    {
        return (
            <Canvas key={"habit"} ref={this.handleCanvas}/>
        );
    }
}